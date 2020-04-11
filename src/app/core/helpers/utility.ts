export const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export const setAuthClasses = () => {
    const add = document.body.classList.add;
    ['authentication-bg', 'authentication-bg-pattern'].forEach(cls => add(cls));
};

export const isArray = (a) => {
    return Array.isArray(a);
};

export const isObject = (o) => {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const keysToCamel = (o) => {
    if (isObject(o)) {
        const n = {};

        Object.keys(o)
            .forEach((k) => {
                n[toCamel(k)] = keysToCamel(o[k]);
            });

        return n;
    } else if (isArray(o)) {
        return o.map((i) => {
            return keysToCamel(i);
        });
    }

    return o;
};

export const setValues = (target, obj) => {
    const fields = Object.keys(target);
    fields.forEach(
        field => target[field].setValue(obj[field.replace('update', '').replace(/^\w/, c => c.toLowerCase())])
    );
};

