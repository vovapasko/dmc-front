import { Methods } from '@models/instances/method';

export const newsFields = {
  title: 'title',
  content: 'content'
};

export const newsFieldReplacer = {
  title(value, replacer): string {
    return value.replace(/<h1>(.*?)<\/h1>/g, replacer);
  },
  content(value, replacer): string {
    return value.replace(/<p>(.*?)<\/p>/g, replacer);
  }
};

export const template = `
<h1></h1>
<p></p>
`;

export const h1 = `<h1>`;
export const p = `<h1>`;

export const newsFieldsHandler = {
  attachments(attachments) {
    const links = attachments.filter(attachment => !(attachment instanceof File)).map((attachment, index) => `\n Файл ${index + 1} - <p><a href="${attachment.file}"/></p>\n`);
    const files = attachments.filter(attachment => attachment instanceof File).map((attachment, index) => `\n Файл ${index + 1} - <p>${attachment.name}</p> \n`);
    return [...links, ...files];
  },
  image(image) {
    return `<img src=${image}>`;
  },
  title(value) {
    return `\n<h1>${value}</h1>\n`;
  },
  content(value) {
    return `\n<p>${value}</p>\n`;
  }
};

export const burstSteps = { [Methods.direct]: 2, [Methods.bayer]: 1, [Methods.topSecret]: 1 };
