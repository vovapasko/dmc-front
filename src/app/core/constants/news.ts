import { Methods } from '@models/instances/method';

export const newsFields = {
  attachments: 'attachments',
  title: 'title',
  contractors: 'contractors',
  content: 'content'
};

export const newsFieldsHandler = {
  attachments(attachments) {
    const links = attachments.filter(attachment => !(attachment instanceof File)).map((attachment, index) => `\n Файл ${index + 1} - <p><a href="${attachment.file}"/></p>\n`);
    const files = attachments.filter(attachment => attachment instanceof File).map((attachment, index) => `\n Файл ${index + 1} - <p>${attachment.name}</p> \n`);
    return [...links, ...files];
  },
  title(value) {
    return `\n<h1>${value}</h1>\n`;
  },
  content(value) {
    return `\n<p>${value}</p>\n`;
  },
  contractors(contractors, format) {
    if (!contractors) {
      return '';
    }
    // tslint:disable-next-line:max-line-length
    return contractors.map(contractor => `\n— ${contractor.editorName} ${contractor.postformatlistSet.find(el => el.postFormat === format).onePostPrice}\n`);
  }
};

export const burstSteps = { [Methods.direct]: 2, [Methods.bayer]: 1, [Methods.topSecret]: 1 }