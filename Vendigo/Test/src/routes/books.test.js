const server = require('../../index')
const expect = require('chai').expect
const books = require('../data/books.json')
const GreatExpectations = (
  Object
    .keys(books)
    .map(b => Object.assign({ uid: b }, books[b]))
    .find(b => b.title === 'Great expectations')
)

describe('/books', () => {
  it('should return books', () => {
    return server.inject({ method: 'GET', url: '/books' })
      .then(response => {
        expect(JSON.parse(response.payload)).to.deep.equal(
          Object.keys(books).map(b => Object.assign({ uid: b }, books[b]))
        )
      })
  })

  it('should return specific book if uid provided', () => {
    return (
      server
        .inject({ method: 'GET', url: '/books?search=OL24364628M' })
        .then(response => {
          expect(JSON.parse(response.payload)).to.deep.equal([GreatExpectations])
        })
    )
  })

  it('should return specific book if title provided', () => {
    return (
      server
        .inject({ method: 'GET', url: '/books?search=Great expectations' })
        .then(response => {
          expect(JSON.parse(response.payload)).to.deep.equal([GreatExpectations])
        })
    )
  })

  it('should return specific book if author provided', () => {
    return (
      server
        .inject({ method: 'GET', url: '/books?search=Dicke' })
        .then(response => {
          const books = JSON.parse(response.payload)
          expect(books.length).to.deep.equal(2)
          expect(books.map(b => b.title)).to.deep.equal([
            'Great expectations',
            'The adventures of Oliver Twist'
          ])
        })
    )
  })

  it('should return error if title provide but book not found', () => {
    return (
      server
        .inject({ method: 'GET', url: '/books?search=foo' })
        .then(response => {
          expect(JSON.parse(response.payload)).to.deep.equal({ error: 'book not found' })
        })
    )
  })
})
