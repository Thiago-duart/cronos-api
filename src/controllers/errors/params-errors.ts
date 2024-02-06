export class ParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Param Error";
  }
}
