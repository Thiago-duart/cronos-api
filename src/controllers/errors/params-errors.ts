export class ParamError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "Param Error";
  }
}
