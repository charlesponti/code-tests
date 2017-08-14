const books = require('../data/books.json')

module.exports = {
  method: 'GET',
  path: '/books',
  handler: function (request, reply) {
    const search = request.query.search
    const arrayOfBooks = Object.keys(books).map(r => Object.assign({ uid: r }, books[r]))

    if (search) {
      const book = arrayOfBooks.filter(book => (
        // Check uid
        new RegExp(search, 'ig').test(book.uid) ||
        // Check title
        new RegExp(search, 'ig').test(book.title) ||
        // Check author
        new RegExp(search, 'ig').test(book.authors.map(a => a.name).join(' '))
      ))

      if (book.length) {
        return reply(book)
      } else {
        return reply({ error: 'book not found' }).code(400)
      }
    }

    return reply(Object.keys(books).map(r => Object.assign({ uid: r }, books[r])))
  }
}
