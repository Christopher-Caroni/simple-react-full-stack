export function transformHttpError(err) {
    console.dir(err);
    const {
        response: { data: { msg } } = {
            data: { msg: 'Unknown error' },
        },
    } = err;
    const errMsg = msg || 'Unknown error';
    return { msg: errMsg };
}
