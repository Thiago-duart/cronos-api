export class ServerError extends Error {
  constructor(error: string) {
    super("Ouve um erro interno");
    this.name = "server error";
    this.stack = error;
  }
}
