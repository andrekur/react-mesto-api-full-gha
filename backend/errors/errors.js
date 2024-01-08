const { HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_CONFLICT, HTTP_STATUS_FORBIDDEN } = require('http2').constants;


class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED
  }
}

class ConflictReqiestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT
  }
}

class ForbiddenRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ConflictReqiestError = ConflictReqiestError;
module.exports.ForbiddenRequestError = ForbiddenRequestError;