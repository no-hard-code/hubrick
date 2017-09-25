import {printHelloWorld} from "../index";

describe("index", () => {
    test("function printHelloWorld is a function", () => {
        expect(typeof printHelloWorld).toBe('function');
    });
});
