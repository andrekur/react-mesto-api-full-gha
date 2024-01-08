const { HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_CONFLICT, HTTP_STATUS_FORBIDDEN, HTTP_STATUS_NOT_FOUND } = require('http2').constants;


class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ConflictError = ConflictError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NotFoundError = NotFoundError;