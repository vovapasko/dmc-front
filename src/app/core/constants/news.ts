import { Methods } from '@models/instances/method';
import numbers from '@constants/numbers';

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
  },
  text(value, replacer): string {
    return value.replace(/^.+?<img/g, replacer).replace('> src=', '> <img src=');
  }
};

export const template = `<h1></h1><p></p>`;

export const h1 = `<h1>`;
export const p = `<h1>`;

export const newsFieldsHandler = {
  attachments(attachments: Array<File>): Array<string> {
    // @ts-ignore
    const links = attachments.filter(attachment => !(attachment instanceof File)).map((attachment, index) => `\n Файл ${index + 1} - <p><a href="${attachment.file}"/></p>\n`);
    const files = attachments.filter(attachment => attachment instanceof File).map((attachment, index) => `\n Файл ${index + 1} - <p>${attachment.name}</p> \n`);
    return [...links, ...files];
  },
  text(value: string): string {
    return value;
  },
  image(image: string | ArrayBuffer): string {
    return `<img src=${image}>`;
  },
  title(value: string): string {
    return `\n<h1>${value}</h1>\n`;
  },
  content(value: string): string {
    return `\n<p>${value}</p>\n`;
  }
};

export const burstSteps = {
  [Methods.direct]: numbers.two,
  [Methods.bayer]: numbers.one,
  [Methods.topSecret]: numbers.one
};
