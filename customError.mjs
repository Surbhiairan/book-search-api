class CustomError extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
      super(404, message);
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
      super(400, message);
    }
  }
  
  class InternalServerError extends CustomError {
    constructor(message = 'Internal server error') {
      super(500, message);
    }
  }
  
  export { CustomError, NotFoundError, BadRequestError, InternalServerError };
  