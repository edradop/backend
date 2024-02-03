type GlobalResponseError = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  method: string;
  code: string;
  errorKey: string;
};

export { GlobalResponseError };
