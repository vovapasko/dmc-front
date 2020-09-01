export const mockContractors = [
  {
    id: 27,
    editor_name: 'test',
    contact_person: 'test',
    phone_number: '380992314525',
    email: 'sanddadadrez.spartanell@gmail.com',
    news_amount: 0,
    arranged_news: 111,
    one_post_price: 111,
    date_created: '2020-04-08T10:55:54.907289Z',
    date_updated: '2020-04-08T10:55:54.907314Z',
  },
  {
    id: 28,
    editor_name: 'test2',
    contact_person: 'test',
    phone_number: '380992314525',
    email: 'sanddadadrez.spartanell@gmail.com',
    news_amount: 0,
    arranged_news: 1111,
    one_post_price: 1111,
    date_created: '2020-04-12T16:08:06.704212Z',
    date_updated: '2020-04-12T16:08:06.704262Z',
  },
];

export const mockContractor = {
  id: 27,
  editorName: 'test',
  contactPerson: 'test',
  phoneNumber: '380992314525',
  email: 'sanddadadrez.spartanell@gmail.com',
  newsAmount: 0,
  arrangedNews: 111,
  onePostPrice: 111,
  dateCreated: '2020-04-08T10:55:54.907289Z',
  dateUpdated: '2020-04-08T10:55:54.907314Z',
  postformatlistSet: [
    {
      id: 1,
      date_created: '2020-08-18T12:54:52.981520Z',
      date_updated: '2020-08-21T11:24:45.195179Z',
      post_format: 'article',
      news_amount: 0,
      arranged_news: 100,
      one_post_price: 100,
      contractor: 1
    },
    {
      id: 2,
      date_created: '2020-08-18T12:54:52.981614Z',
      date_updated: '2020-08-18T12:54:52.981631Z',
      post_format: 'blog',
      news_amount: 0,
      arranged_news: 0,
      one_post_price: 0,
      contractor: 1
    },
    {
      id: 3,
      date_created: '2020-08-18T12:54:52.981663Z',
      date_updated: '2020-08-18T12:54:52.981678Z',
      post_format: 'news',
      news_amount: 0,
      arranged_news: 0,
      one_post_price: 0,
      contractor: 1
    }
  ]
};

export const mockCreate = {
  data: {
    editorName: 'string',
    contactPerson: 'string',
    phoneNumber: 'string',
    email: 'string',
    newsAmount: 1,
    arrangedNews: 1,
    onePostPrice: 1,
  },
};

export const mockUpdate = {
  id: 1,
  data: {
    editorName: 'string',
    contactPerson: 'string',
    phoneNumber: 'string',
    email: 'string',
    newsAmount: 1,
    arrangedNews: 1,
    onePostPrice: 1,
  },
};

export const mockDelete = {
  id: 1,
};
