import buildOptions from "..";

describe('Testing', () => {

    test('testing works', async () => {
        const options = buildOptions({})
        expect(options.skip).toBe(0);
        expect(options.take).toBe(25);
        expect(options.where).toStrictEqual({});
    });
});
