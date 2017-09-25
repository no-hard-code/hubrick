import {logger} from "../logger";

describe("logger", () => {
    test("logger should have success, warning and error methods", () => {
        const testLoggerFunc = (func) => {
            expect(typeof func).toBe('function');
            expect(() => func('asd')).not.toThrow();
        };

        testLoggerFunc(logger.success);
        testLoggerFunc(logger.warning);
        testLoggerFunc(logger.error);
    });
});
