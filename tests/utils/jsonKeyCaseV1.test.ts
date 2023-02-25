/*
 * Usando test.each para reducir el tamaño del código y
 * testear los mismos casos que en el archivo original.
*/
import { camelCase, pascalCase, snakeCase } from "change-case";
import { convert, isObject } from "../../src/utils/jsonKeyCase";

const newDate: Date = new Date;

const dataTest: any[] = [
    { name: 'boolean', input: false, output: false },
    { name: 'number', input: 123, output: false },
    { name: 'string', input: 'abc', output: false },
    { name: 'empty Array', input: [], output: false },
    { name: 'Array', input: [1, 2, 3], output: false },
    { name: 'empty Object', input: {}, output: false },
    { name: 'Object', input: { id: 1 }, output: false },
    { name: 'Date', input: newDate, output: false },
    { name: 'null', input: null, output: false },
    { name: 'undefined', input: undefined, output: false },
];

describe('jsonKeyCase functions test:', () => {

    describe('isObject() tests:', () => {
        const isObjectDataTest = [...dataTest];
        isObjectDataTest[5] = { ...dataTest[5] }; isObjectDataTest[5].output = true;
        isObjectDataTest[6] = { ...dataTest[6] }; isObjectDataTest[6].output = true;
        test.each(isObjectDataTest)('isObject($name) = $output', ({ input, output }) => {
            expect(isObject(input)).toEqual(output);
        });
    });

    describe('convert() tests:', () => {
        const convertDataTest: any[] = [
            { name: 'false', input: false, strategy: camelCase, output: false },
            { name: '123', input: 123, strategy: snakeCase, output: 123 },
            { name: 'abc', input: 'abc', strategy: pascalCase, output: 'abc' },
            { name: 'Date', input: newDate, strategy: camelCase, output: newDate },
            { name: 'null', input: null, strategy: camelCase, output: null },
            { name: 'empty Array', input: [], strategy: camelCase, output: [] },
            { name: 'empty Array', input: [], strategy: snakeCase, output: [] },
            { name: 'empty Object', input: {}, strategy: camelCase, output: {} },
            { name: 'empty Object', input: {}, strategy: snakeCase, output: {} },
            {
                name: 'camelCase object',
                input: {
                    id: 3,
                    firstName: 'John',
                    lastName: 'Doe',
                    userAliasesList: ['jd', 'Johny'],
                    location: {
                        fullAddress: 'Fake street 123', city: 'LA', number: null,
                        extraInfo: null,
                        timeStamp: newDate,
                    },
                },
                strategy: snakeCase,
                output: {
                    id: 3,
                    first_name: 'John',
                    last_name: 'Doe',
                    user_aliases_list: ['jd', 'Johny'],
                    location: {
                        full_address: 'Fake street 123', city: 'LA', number: null,
                        extra_info: null,
                        time_stamp: newDate,
                    },
                }
            },
            {
                name: 'snakeCase List',
                input: [
                    { id: 123, user_name: 'simpleuser', user_password: 'unhackable_password' },
                    { id: 234, user_name: 'otherUser', user_password: '12tres' },
                ],
                strategy: camelCase,
                output: [
                    { id: 123, userName: 'simpleuser', userPassword: 'unhackable_password' },
                    { id: 234, userName: 'otherUser', userPassword: '12tres' },
                ]
            }
        ];
        test.each(convertDataTest)('convert($name, $strategy) = $output', ({ input, strategy, output }) => {
            expect(convert(input, strategy)).toEqual(output);
        });
    });

});