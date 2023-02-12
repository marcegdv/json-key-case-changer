export const isScalar = (value: boolean | number | string): boolean => {
    const isBoolean: boolean = typeof value === 'boolean';
    const isNumber: boolean = typeof value === 'number';
    const isString: boolean = typeof value === 'string';

    return isBoolean || isNumber || isString;
};

export const isObject = (object: any): boolean => {
    const isObject: boolean = typeof object === 'object';
    const isNull: boolean = object === null;
    const isList: boolean = object instanceof Array;
    const isDate: boolean = object instanceof Date;

    return isObject && !isNull && !isList && !isDate;
};

export const isList = (list: any): boolean => list instanceof Array;

export const convert = (input: any, strategy: Function): any => {
    let converted: any = null;
    if (isList(input)) {
        converted = input.map((item: any) => convert(item, strategy));
    } else if (isObject(input)) {
        converted = {};
        Object.keys(input).forEach(
            (key: string) => {
                const value: any = input[key];
                const newKey: string = strategy(key);
                if (isList(value) || isObject(value)) {
                    converted[newKey] = convert(value, strategy);
                } else if (isScalar(value) || value === null) {
                    converted[newKey] = value;
                };
            }
        );
    } else {
        return input;
    };
    return converted;
};

export const jstr = (obj: any): any => JSON.stringify(obj, undefined, 4);