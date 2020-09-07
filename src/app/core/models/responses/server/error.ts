export interface ServerError {
  status: number;
  error: {
    message: string;
  };
}
