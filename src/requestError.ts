export class RequestError extends Error {
  public readonly statusCode: number;
  public readonly response: string;

  constructor(statusText: string, statusCode: number, response: any) {
    super(`${statusCode} ${JSON.stringify(response)}`);
    this.response = JSON.stringify(response);
    this.statusCode = statusCode;
    this.name = statusText;
  }
}
