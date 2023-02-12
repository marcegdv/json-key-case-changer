export const isObject = (object: any): boolean => {
    const isObject: boolean = typeof object === 'object';
    const isNull: boolean = object === null;
    const isList: boolean = object instanceof Array;
    const isDate: boolean = object instanceof Date;

    return isObject && !isNull && !isList && !isDate;
};

export const isList = (list: any): boolean => list instanceof Array;

export const convert = (input: any, strategy: Function): any => {
    if (isList(input)) {
        return input.map((item: any) => convert(item, strategy));
    } else if (isObject(input)) {
        let converted: any = {};
        Object.keys(input).forEach(
            (key: string) => {
                const value: any = input[key];
                const newKey: string = strategy(key);
                converted[newKey] = convert(value, strategy);
            }
        );
        return converted;
    } else {
        return input;
    };
};