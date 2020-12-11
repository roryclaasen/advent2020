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

export const isNumBetween = (value: string, floor: number, ceil?: number): [valid: boolean, num: number] => {
    const num = +value;
    const valid = !isNaN(num) && num >= floor && (!ceil || num <= ceil);
    return [valid, num];
};
