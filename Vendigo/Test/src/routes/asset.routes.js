'use strict'

module.exports = [
  {
    method: 'GET',
    path: '/css/{param*}',
    handler: {
      directory: {
        path: 'src/assets/css',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: 'src/assets/js',
        listing: true
      }
    }
  }
]
