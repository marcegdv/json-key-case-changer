import { main } from "../src/app";

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