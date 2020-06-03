export interface Method {
  id: number;
  method: string;
}

export enum Methods {
  topSecret = 'top secret',
  bayer = 'bayer',
  direct = 'direct'
}