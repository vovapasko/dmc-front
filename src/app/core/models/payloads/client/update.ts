export interface UpdateClientPayload {
  id: number;
  data: {
    ip: string;
    port: number;
    expire: string;
    login: string;
    password: string;
  };
}
