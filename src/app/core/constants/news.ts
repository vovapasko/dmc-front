export const newsFields = {
  attachments: 'attachments',
  title: 'title',
  contractors: '',
  content: ''
};

export const newsFieldsHandler = {
  attachments(files) {
    return files.map((file, index) => `Файл ${index + 1} - <b>${file.name}</b> \n`);
  },
  title(value) {
    return `<h1>${value}</h1>`;
  },
  content(value) {
    return `<p>${value}</p>`;
  },
  contractors(contractors, format) {
    if (!contractors) {
      return '';
    }
    // tslint:disable-next-line:max-line-length
    return contractors.map(contractor => `— ${contractor.editorName} ${contractor.postformatlistSet.find(el => el.postFormat === format).onePostPrice}`);
  }
};

export const burstSteps = { [this.methods.direct]: 2, [this.methods.bayer]: 1, [this.methods.topSecret]: 1 }