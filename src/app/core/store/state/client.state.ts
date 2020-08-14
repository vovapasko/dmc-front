import { Client } from '@models/instances/client';

export interface IClientState {
  clients: Client[];
  selectedClient: Client;
}

export const initialClientState: IClientState = {
  clients: [],
  selectedClient: null,
};
