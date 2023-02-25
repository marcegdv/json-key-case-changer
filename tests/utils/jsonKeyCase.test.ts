import { camelCase, pascalCase, snakeCase } from "change-case";
import { convert, isObject } from "../../src/utils/jsonKeyCase";

describe('jsonKeyCase functions test:', () => {

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
            expect(isObject(obj)).toBeFalsy();
        });
        test('isObject with an array return false', () => {
            const obj = [1, 2, 3];
            expect(isObject(obj as unknown as Object)).toBeFalsy();
        });
        test('isObject with empty object, return true', () => {
            expect(isObject({} as unknown as Object)).toBeTruthy();
        });
        test('isObject with an object return true', () => {
            const obj = { id: 1 };
            expect(isObject(obj)).toBeTruthy();
        });
        test('isObject with a Date return false', () => {
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

        test('with an value and any strategy, return the value', () => {
            const newDate: Date = new Date;
            expect(convert(false, camelCase)).toEqual(false);
            expect(convert(123, snakeCase)).toEqual(123);
            expect(convert('abc', pascalCase)).toEqual('abc');
            expect(convert(newDate, camelCase)).toEqual(newDate);
            expect(convert(null, snakeCase)).toEqual(null);
        });
        test('with a list of values and any startegy, return list of values', () => {
            const newDate: Date = new Date;
            expect(convert([false, true], camelCase)).toEqual([false, true]);
            expect(convert([1, 2, 3], snakeCase)).toEqual([1, 2, 3]);
            expect(convert(['abc', '123'], pascalCase)).toEqual(['abc', '123']);
            expect(convert([newDate, newDate], camelCase)).toEqual([newDate, newDate]);
            expect(convert([null, null], camelCase)).toEqual([null, null]);
        });
        test('with an empty list/object and any strategy, return the empty list/object', () => {
            expect(convert([], camelCase)).toEqual([]);
            expect(convert([], snakeCase)).toEqual([]);
            expect(convert({}, camelCase)).toEqual({});
            expect(convert({}, snakeCase)).toEqual({});
        });
        test('with an object in camelCase and snake_case strategy, return same object in snake_case', () => {
            const newDate: Date = new Date()
            const origin: any = {
                id: 3,
                firstName: 'John',
                lastName: 'Doe',
                userAliasesList: [
                    'jd', 'Johny'
                ],
                location: {
                    fullAddress: 'Fake street 123', city: 'LA', number: null,
                    extraInfo: null,
                    timeStamp: newDate,
                },
            };
            const expected: any = {
                id: 3,
                first_name: 'John',
                last_name: 'Doe',
                user_aliases_list: [
                    'jd', 'Johny'
                ],
                location: {
                    full_address: 'Fake street 123', city: 'LA', number: null,
                    extra_info: null,
                    time_stamp: newDate,
                },
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