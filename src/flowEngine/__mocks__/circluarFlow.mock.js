/**
 * Circular flow
 * 0 -> 1 -> 2 -> 0 -> ...
 */
export const circularFlow = {
    0: {
        id: 0,
        true_id: 1,
        false_id: 2,
        body: `return !!obj;`
    },
    1: {
        id: 1,
        true_id: 2,
        false_id: 2,
        body: `return !obj;`
    },
    2: {
        id: 2,
        true_id: 0,
        false_id: 0,
        body: `return !obj;`
    }
};
