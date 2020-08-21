export const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const setAuthClasses = () => {
  const classes = ['authentication-bg', 'authentication-bg-pattern'];
  classes.forEach((cls) => {
    document.body.classList.add(cls);
  });
};

export const isArray = (a) => {
  return Array.isArray(a);
};

export const isObject = (o) => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const keysToCase = (o, func) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[func(k)] = keysToCase(o[k], func);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCase(i, func);
    });
  }

  return o;
};

export const setValues = (target, obj) => {
  const fields = Object.keys(target);
  fields.forEach((field) =>
    target[field].setValue(obj[field.replace('update', '').replace(/^\w/, (c) => c.toLowerCase())])
  );
};

export const setProjectValues = (common, editor, project, getSafeHtml) => {
  Object.keys(common).forEach((key) => common[key].setValue(project[key]));
  editor.text.setValue(getSafeHtml(project.content.text).changingThisBreaksApplicationSecurity);
};

export const collectDataFromForm = (f, defaultFields) => {
  const fields = Object.keys(f);
  // collects all values [{}, {}, {}]
  const values = fields.map((field) => ({ [field]: f[field].value }));
  if (defaultFields) {
    values.push(...defaultFields);
  }
  return values.reduce((a, n) => ({ ...a, ...n }), {});
};

export const getColorByPercentage = (value, arg) => {
  const percentage = ((value / arg) * 100).toFixed(3);
  const colors = { red: '#B80F0A', yellow: '#DAA520', blue: '#00B4AB', green: '#7CFC00' };
  if (+percentage > 0 && +percentage < 51) {
    return colors.green;
  } else if (+percentage > 51 && +percentage < 71) {
    return colors.blue;
  } else if (+percentage > 71 && +percentage < 89) {
    return colors.yellow;
  } else if (+percentage > 90 && +percentage < 100) {
    return colors.red;
  } else {
    return '';
  }
}
