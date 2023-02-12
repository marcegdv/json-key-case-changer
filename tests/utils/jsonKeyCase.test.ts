import { camelCase, pascalCase, snakeCase } from "change-case";
import { convert, isList, isObject, isValue } from "../../src/utils/jsonKeyCase";

describe('jsonKeyCase functions test:', () => {

    describe('isValue tests:', () => {

        test('isValue with a boolean return true', () => {
            expect(isValue(false)).toBeTruthy();
        });
        test('isValue with a number return true', () => {
            expect(isValue(123)).toBeTruthy();
        });
        test('isValue with a string return true', () => {
            expect(isValue('abc')).toBeTruthy();
        });
        test('isValue with an empty array return false', () => {
            const obj: any[] = [];
            expect(isValue(obj as unknown as number)).toBeFalsy();
        });
        test('isValue with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isValue(obj as unknown as number)).toBeFalsy();
        });
        test('isValue with an empty object return false', () => {
            const obj = {};
            expect(isValue(obj as unknown as boolean)).toBeFalsy();
        });
        test('isValue with an object return false', () => {
            const obj = { id: 1 };
            expect(isValue(obj as unknown as boolean)).toBeFalsy();
        });
        test('isValue with a Date return true', () => {
            const obj = new Date;
            expect(isValue(obj)).toBeTruthy();
        });
        test('isValue with null return true', () => {
            const obj = null;
            expect(isValue(obj)).toBeTruthy();
        });
        test('isValue with undefined return false', () => {
            const obj = undefined;
            expect(isValue(obj as unknown as boolean)).toBeFalsy();
        });

    });

    describe('isList tests:', () => {

        test('isList with a boolean return false', () => {
            expect(isList(false as unknown as Array<boolean>)).toBeFalsy();
        });
        test('isList with a number return false', () => {
            expect(isList(123 as unknown as Array<number>)).toBeFalsy();
        });
        test('isList with a string return false', () => {
            expect(isList('abc' as unknown as Array<string>)).toBeFalsy();
        });
        test('isList with an empty array return true', () => {
            const obj: any[] = [];
            expect(isList(obj)).toBeTruthy();
        });
        test('isList with an array return true', () => {
            const obj = [1, 2, 3];
            expect(isList(obj)).toBeTruthy();
        });
        test('isList with an empty object return false', () => {
            const obj = {};
            expect(isList(obj as unknown as Array<Object>)).toBeFalsy();
        });
        test('isList with an object return false', () => {
            const obj = { id: 1 };
            expect(isList(obj as unknown as Array<Object>)).toBeFalsy();
        });
        test('isList with a Date return false', () => {
            const obj = new Date;
            expect(isList(obj as unknown as Array<Date>)).toBeFalsy();
        });
        test('isList with null return false', () => {
            const obj = null;
            expect(isList(obj as unknown as Array<null>)).toBeFalsy();
        });
        test('isList with undefined return false', () => {
            const obj = undefined;
            expect(isList(obj as unknown as Array<undefined>)).toBeFalsy();
        });

    });

    describe('isObject tests:', () => {

        test('isObject with a boolean return false', () => {
            expect(isObject(false as unknown as Object)).toBeFalsy();
        });
        test('isObject with a number return false', () => {
            expect(isObject(123 as unknown as Object)).toBeFalsy();
        });
        test('isObject with a string return false', () => {
            expect(isObject('abc' as unknown as Object)).toBeFalsy();
        });
        test('isObject with an empty array return false', () => {
            const obj: any[] = [];
            expect(isObject([obj] as unknown as Object)).toBeFalsy();
        });
        test('isObject with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isObject(obj as unknown as Object)).toBeFalsy();
        });
        test('isObject with empty object, return true', () => {
            const obj = {};
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with an object return true', () => {
            const obj = { id: 1 };
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with an array return false', () => {
            const obj = new Date;
            expect(isObject(obj as unknown as Object)).toBeFalsy();
        });
        test('isObject with null return false', () => {
            const obj = null;
            expect(isObject(obj as unknown as Object)).toBeFalsy();
        });
        test('isObject with undefined return false', () => {
            const obj = undefined;
            expect(isObject(obj as unknown as Object)).toBeFalsy();
        });

    });

    describe('convert tests:', () => {

        test('with a value and any strategy, return the value', () => {
            const date: Date = new Date;
            expect(convert(false, camelCase)).toEqual(false);
            expect(convert(123, snakeCase)).toEqual(123);
            expect(convert('abc', pascalCase)).toEqual('abc');
            expect(convert(date, pascalCase)).toEqual(date);
            expect(convert(null, camelCase)).toEqual(null);
        });
        test('with a list of values and any startegy, return list of values', () => {
            const date: Date = new Date;
            expect(convert([false, true], camelCase)).toEqual([false, true]);
            expect(convert([1, 2, 3], snakeCase)).toEqual([1, 2, 3]);
            expect(convert(['abc', '123'], pascalCase)).toEqual(['abc', '123']);
            expect(convert([date, date], pascalCase)).toEqual([date, date]);
            expect(convert([null, null], camelCase)).toEqual([null, null]);
        });
        test('with an empty list/object and any strategy, return the empty list', () => {
            expect(convert([], camelCase)).toEqual([]);
            expect(convert([], snakeCase)).toEqual([]);
            expect(convert({}, camelCase)).toEqual({});
            expect(convert({}, snakeCase)).toEqual({});
        });
        test('with an object in camelCase and snake_case strategy, return same object in snake_case', () => {
            const origin: any = {
                id: 3,
                firstName: 'John',
                lastName: 'Doe',
                userAliasesList: ['jd', 'Johny'],
                location: { fullAddress: 'Fake street 123', city: 'LA', number: null },
                extraInfo: null,
                timeStamp: new Date,
            };
            const expected: any = {
                id: 3,
                first_name: 'John',
                last_name: 'Doe',
                user_aliases_list: ['jd', 'Johny'],
                location: { full_address: 'Fake street 123', city: 'LA', number: null },
                extra_info: null,
                time_stamp: new Date,
            };
            expect(convert(origin, snakeCase)).toStrictEqual(expected);
        });
        test('with a list of objects in snake_case and camelCase strategy, return same list in camelCase', () => {
            const origin: any = [
                {
                    id: 123,
                    user_name: 'simpleuser',
                    user_password: 'unhackable_password',
                },
                {
                    id: 234,
                    user_name: 'otherUser',
                    user_password: '12tres',
                },
            ];
            const expected: any = [
                {
                    id: 123,
                    userName: 'simpleuser',
                    userPassword: 'unhackable_password',
                },
                {
                    id: 234,
                    userName: 'otherUser',
                    userPassword: '12tres',
                },
            ];
            expect(convert(origin, camelCase)).toStrictEqual(expected);
        });

    });

});