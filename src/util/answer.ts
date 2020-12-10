export default (promise: () => Promise<unknown[]> | Promise<unknown[]>): void => {
    const promiseResult = typeof promise === 'function' ? promise() : promise;
    promiseResult
        .then((answers) => {
            answers.forEach((a, i) => {
                console.log(`Answer part ${i + 1}: ${a}`);
            });
        })
        .catch(console.error);
};
