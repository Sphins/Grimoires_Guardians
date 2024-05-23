'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Setting up the origin to true means, the origin will be matched
  | dynamically based upon the `origin` header sent by the client.
  |
  | You can also define multiple origins as an array.
  |
  */
  origin: true,

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  |
  | Comma separated HTTP methods to be allowed.
  |
  */
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  |
  | Comma separated list of headers to be allowed. The default headers
  | allowed are `Content-Type`, `Authorization`, `X-Requested-With`.
  |
  */
  headers: true,

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | Comma separated list of headers to be exposed to the client.
  |
  */
  exposeHeaders: false,

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Setting credentials to true will allow cookies to be sent with requests
  | from the client. However, origins must be explicitly set.
  |
  */
  credentials: true,

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Number of seconds the browser should cache the CORS response.
  |
  */
  maxAge: 90
}
