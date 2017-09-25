import {execute} from "../index";
import {straightFlow} from "../__mocks__/straightFlow.mock";
import {circularFlow} from "../__mocks__/circluarFlow.mock";
import {ERROR_TYPES} from "../flowEngine/errorTypes";
import {malformedBodyFlow} from "../__mocks__/malformedBodyFlow.mock";

describe("execute function", () => {
    test("correct rule set should pass with done: true", () => {
        expect(execute(straightFlow, 0)).toEqual({done: true});
        expect(execute(straightFlow, 1)).toEqual({done: true});
        expect(execute(straightFlow, 2)).toEqual({done: true});
    });

    test("circulars shoud be detected", () => {
        const result = execute(circularFlow, 1);

        expect(result.error).toBe(true);
        expect(result.rule).toBe(circularFlow[1]);
        expect(result.type).toBe(ERROR_TYPES.CIRCULAR);
    });

    test("initial flow id should be correct", () => {
        const result = execute(circularFlow, 3);

        expect(result.error).toBe(true);
        expect(result.rule).toBe(undefined);
        expect(result.type).toBe(ERROR_TYPES.RULE_SET);
    });

    test("malformed rule sets should be found", () => {
        const result = execute(malformedBodyFlow, 0);

        expect(result.error).toBe(true);
        expect(result.rule).toBe(malformedBodyFlow[1]);
        expect(result.type).toBe(ERROR_TYPES.RULE_SET);
    });
});
