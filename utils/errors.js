export class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    console.log(this);

    this.status = status;
    this.name = "HttpError";
  }
}
