import { main, jstr } from "../src/app";

describe('jstr tests:', () => {

    test('with a scalar, return a string', () => {
        expect(jstr(false)).toEqual('false');
        expect(jstr(123)).toEqual('123');
        expect(jstr('abc')).toEqual("\"abc\"");
    });

    test('with a list, return a string', () => {
        expect(jstr([1, 2, 3])).toEqual("[\n    1,\n    2,\n    3\n]");
    });

    test('with a object, return a string', () => {
        expect(jstr({ id: 1 })).toEqual("{\n    \"id\": 1\n}");
    });

    test('app.ts test:', () => {

        let ok: boolean = false;
        let exitCode: number = NaN;
        try {
            exitCode = main();
            ok = true;
        } catch (error) {
            console.log('Best test ever fail? o.O');
        };
        expect(ok).toEqual(true);
        expect(exitCode).toEqual(0);
        console.log('Best test ever was successful!');

    });

});