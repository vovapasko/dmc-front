export const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export const setAuthClasses = () => {
    const classes = ['authentication-bg', 'authentication-bg-pattern'];
    classes.forEach(
        cls => {
            document.body.classList.add(cls);
        }
    );
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

        Object.keys(o)
            .forEach((k) => {
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
    fields.forEach(
        field => target[field].setValue(obj[field.replace('update', '').replace(/^\w/, c => c.toLowerCase())])
    );
};

