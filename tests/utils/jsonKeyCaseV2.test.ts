/*
 * Lo mismo que los test del archivo V1, pero estrayendo los datos a un archivo separado.
*/
import { convert, isList, isObject } from "../../src/utils/jsonKeyCase";
import { dataTest, convertDataTest } from './jsonKeyCaseV2DataSource';

describe('jsonKeyCase functions test:', () => {
    describe('isList() tests:', () => {
        const isListDataTest = [...dataTest];
        isListDataTest[3] = { ...dataTest[3] }; isListDataTest[3].output = true;
        isListDataTest[4] = { ...dataTest[4] }; isListDataTest[4].output = true;
        test.each(isListDataTest)('isList($name) = $output', ({ input, output }) => {
            expect(isList(input)).toEqual(output);
        });
    });

    describe('isObject() tests:', () => {
        const isObjectDataTest = [...dataTest];
        isObjectDataTest[5] = { ...dataTest[5] }; isObjectDataTest[5].output = true;
        isObjectDataTest[6] = { ...dataTest[6] }; isObjectDataTest[6].output = true;
        test.each(isObjectDataTest)('isObject($name) = $output', ({ input, output }) => {
            expect(isObject(input)).toEqual(output);
        });
    });

    describe('convert() tests:', () => {
        test.each(convertDataTest)('convert($name, $strategy) = $output', ({ input, strategy, output }) => {
            expect(convert(input, strategy)).toEqual(output);
        });
    });
});