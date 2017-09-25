/**
 * Straight flow
 * 0 -> 1 -> 2 -> end
 */
export const straightFlow = {
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
        true_id: null,
        false_id: null,
        body: `return obj;`
    }
};
