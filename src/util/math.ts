export const product = (array: number[]): number => {
    let result = array[0];
    array.slice(1).forEach((num) => (result *= num));
    return result;
};

export const sum = (array: number[]): number => {
    let result = array[0];
    array.slice(1).forEach((num) => (result += num));
    return result;
};
