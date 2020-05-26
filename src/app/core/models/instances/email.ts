export interface Email {
  id?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  email: string;
  template: string;
  signature: string;
}
//"id": 1,
//             "date_created": "2020-05-25T10:05:55.423734Z",
//             "date_updated": "2020-05-25T10:08:45.077604Z",
//             "email": "mail@mail.com",
//             "template": "my templat e",
//             "signature": "my signatu re"