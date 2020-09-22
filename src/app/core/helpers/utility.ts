import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NewsWaves } from '@models/instances/news-waves';
import { NewsProject } from '@models/instances/news-project';
import { News } from '@models/instances/news';
import { Project } from '@models/instances/project';
import { blue, green, red, yellow } from '@constants/colors';
import { matchColor, percentage } from '@constants/formula';
import { Contractor } from '@models/instances/contractor';

export const toCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, (element: string) => {
    return element
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

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
