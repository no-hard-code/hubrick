export const logger = {
    success(message) {
        console.log('\x1b[32m%s\x1b[0m', message);
    },
    warning(message) {
        console.log('\x1b[33m%s\x1b[0m', message);
    },
    error(message) {
        console.log('\x1b[31m%s\x1b[0m', message);
    }
};
