// DOC: https://futurestud.io/tutorials/node-js-create-your-custom-error
class CustomError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default CustomError;
