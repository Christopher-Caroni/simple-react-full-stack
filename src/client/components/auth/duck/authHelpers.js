export function transformHttpError(err) {
    console.dir(err);
    const {
        response: { data = { msg: 'Unknown error' } },
    } = err;
    return { ...data };
}
