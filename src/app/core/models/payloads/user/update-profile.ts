export interface UpdateProfilePayload {
  data: {
    firstName: string;
    lastName: string;
    avatar: File | null;
  };
  id: number;
}
