import { AbstractControl, Form } from '@angular/forms';
import { Project } from '@models/instances/project';
import { matchColor, percentage } from '@constants/formula';
import { Payloads } from '@models/payloads/payload';
import { EmailEntity } from '@models/instances/email';
import { FROM } from '@constants/titles';

export const toCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, (element: string) => {
    return element
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

export function getSender(email: EmailEntity): string | null {
  return email.payload.headers.find(header => header.name === FROM).value;
}

export const setAuthClasses = (): void => {
  const classes = ['authentication-bg', 'authentication-bg-pattern'];
  classes.forEach((element) => {
    document.body.classList.add(element);
  });
};

export const isArray = (array: any): boolean => {
  return Array.isArray(array);
};

export const isObject = (object: any): boolean => {
  return object === Object(object) && !isArray(object) && typeof object !== 'function';
};

export const keysToCase = (object: object | Array<any>, func): object | Array<any> => {
  if (isObject(object)) {
    const newObject = {};

    Object.keys(object).forEach((key: string) => {
      newObject[func(key)] = keysToCase(object[key], func);
    });

    return newObject;
  } else if (isArray(object)) {
    // @ts-ignore
    return object.map((i) => {
      return keysToCase(i, func);
    });
  }

  return object;
};

export const setValues = (target: { [key: string]: AbstractControl }, obj: any): void => {
  const fields = Object.keys(target);
  fields.forEach((field) =>
    target[field]
      .setValue(
        obj[field
          .replace('update', '')
          .replace(/^\w/, (c) => c.toLowerCase())
          ]
      )
  );
};

// tslint:disable-next-line:max-line-length
export const setProjectValues = (common: { [key: string]: AbstractControl }, editor: { [key: string]: AbstractControl }, project: Project, getSafeHtml) => {
  Object.keys(common).forEach((key) => common[key].setValue(project[key]));
  editor.text.setValue(getSafeHtml(project.content.text).changingThisBreaksApplicationSecurity);
};

// tslint:disable-next-line:max-line-length
export const collectDataFromForm = (formControls: { [key: string]: AbstractControl }, defaultFields: Array<object>): { [key: string]: any } => {
  const fields = Object.keys(formControls);
  // collects all values [{}, {}, {}]
  const values = fields.map((field) => ({ [field]: formControls[field].value }));
  if (defaultFields) {
    values.push(...defaultFields);
  }
  return values.reduce((a, n) => ({ ...a, ...n }), {});
};

export const getColorByPercentage = (value: number, arg: number): string => {
  const percent = percentage(value, arg);
  return matchColor(percent);
};

export const objectToFormData = (obj: object, form: FormData, namespace: string): Payloads => {

  const fd = form || new FormData();
  let formKey = null;

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {

      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursive.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

        objectToFormData(obj[property], fd, property);

      } else {

        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }

    }
  }

  // @ts-ignore
  return fd;

};

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data): Payloads {
  const formData = new FormData();

  buildFormData(formData, data, null);
  // @ts-ignore
  return formData;
}

export const blobToUint8Array = (b) => {
  const uri = URL.createObjectURL(b);
  const xhr = new XMLHttpRequest();
  let i;
  let ui8;

  xhr.open('GET', uri, false);
  xhr.send();

  URL.revokeObjectURL(uri);

  ui8 = new Uint8Array(xhr.response.length);

  for (i = 0; i < xhr.response.length; ++i) {
    ui8[i] = xhr.response.charCodeAt(i);
  }

  return ui8;
};

export const fileToBase64 = (file: File): string => {

  return '';
};

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export async function convertFileToBase64(file) {
  file.base64 = await toBase64(file);
  return file;
}

