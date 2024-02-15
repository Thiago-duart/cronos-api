export class ServerError extends Error {
  constructor(error: string) {
    super("there was an internal error");
    this.name = "server error";
    this.stack = error;
  }
}
