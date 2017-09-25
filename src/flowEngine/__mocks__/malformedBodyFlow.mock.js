/**
 * Malformed body flow
 * 0 -> 1 -> fail
 */
export const malformedBodyFlow = {
    0: {
        id: 0,
        true_id: 1,
        false_id: null,
        body: `return !!obj;`
    },
    1: {
        id: 1,
        true_id: 2,
        false_id: 0,
        body: `return obj.a.a;`
    }
};
