export class ApiError extends Error {
  readonly statusCode: number;
  readonly detail?: unknown;

  constructor(message: string, statusCode = 500, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.detail = detail;
  }
}
