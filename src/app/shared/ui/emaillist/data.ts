const emailList = [
  {
    icon: 'mdi mdi-inbox',
    label: 'Inbox',
    text: 'danger',
    id: 'INBOX',
    name: 'INBOX',
    type: 'system'
  },
  {
    icon: 'mdi mdi-star',
    label: 'Starred',
    id: 'STARRED',
    name: 'STARRED',
    type: 'system'
  },
  {
    icon: 'mdi mdi-file-document-box',
    label: 'Draft',
    text: 'info',
    id: 'DRAFT',
    name: 'DRAFT',
    type: 'system'
  },
  {
    icon: 'mdi mdi-send ',
    label: 'Sent Mail',
    id: 'SENT',
    name: 'SENT',
    type: 'system'
  },
  {
    icon: 'mdi mdi-delete',
    label: 'Trash',
    id: 'TRASH',
    name: 'TRASH',
    messageListVisibility: 'hide',
    labelListVisibility: 'labelHide',
    type: 'system'
  },
];
export { emailList };

