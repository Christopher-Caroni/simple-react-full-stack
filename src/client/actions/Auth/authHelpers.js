export function transformHttpError(err) {
    const {
        response: { data: { msg } } = { data: { msg: 'Unknown error' } },
    } = err;
    return {
        msg,
    };
}
