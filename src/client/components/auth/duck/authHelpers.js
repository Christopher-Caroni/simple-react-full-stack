export function transformHttpError(err) {
    const {
        response: { data } = {
            data: { msg: 'Unknown error' },
        },
    } = err;
    return data;
}
