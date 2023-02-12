/*
 * Lo mismo que los test del archivo V1, pero estrayendo los datos a un archivo separado.
*/
import { convert, isList, isObject, isValue } from "../../src/utils/jsonKeyCase";
import { dataTest, convertDataTest } from './jsonKeyCaseV2DataSource';

describe('jsonKeyCase functions test:', () => {
    describe('isValue() tests:', () => {
        const isScalarDataTest = [...dataTest];
        isScalarDataTest[0] = { ...dataTest[0] }; isScalarDataTest[0].output = true;
        isScalarDataTest[1] = { ...dataTest[1] }; isScalarDataTest[1].output = true;
        isScalarDataTest[2] = { ...dataTest[2] }; isScalarDataTest[2].output = true;
        isScalarDataTest[7] = { ...dataTest[7] }; isScalarDataTest[7].output = true;
        isScalarDataTest[8] = { ...dataTest[8] }; isScalarDataTest[8].output = true;
        test.each(isScalarDataTest)('isValue($name) = $output', ({ input, output }) => {
            expect(isValue(input)).toEqual(output);
        });
    });

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