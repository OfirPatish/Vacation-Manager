export class ClientError {
  public statusCode: number;
  public errorMessage: string;

  public constructor(statusCode: number, errorMessage: string) {
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}

// General Errors
export class NotFoundError extends ClientError {
  constructor(route: string) {
    super(404, `Route ${route} was not found`);
  }
}

// User Errors
export class UserAlreadyExists extends ClientError {
  constructor() {
    super(400, "User already exists");
  }
}

export class UserNotFound extends ClientError {
  constructor() {
    super(400, "User not found");
  }
}

export class UserNotLogged extends ClientError {
  constructor() {
    super(401, "User not authorized, please login.");
  }
}

export class InvalidPasswordError extends ClientError {
  constructor() {
    super(400, "Invalid password");
  }
}

// Vacation Errors
export class VacationAlreadyExists extends ClientError {
  constructor() {
    super(400, "Vacation with the same destination and dates already exists");
  }
}

export class VacationNotFound extends ClientError {
  constructor() {
    super(404, "Vacation not found");
  }
}

// Video Errors
export class VideoNotFound extends ClientError {
  constructor() {
    super(404, "Video ID was not found.");
  }
}
