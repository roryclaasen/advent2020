// https://adventofcode.com/2020/day/1

import path from 'path';

import { readFileLines } from '@util/file';
import { product, sum } from '@util/math';

export const productEntriesThatSum = (target: number, noEntries: number, entries: number[]): number => {
    let found = false;

    const findResult = (startIndex: number, current: number[]): number[] => {
        const level = current.length;
        for (let i = startIndex; i < entries.length; i++) {
            if (found) break;
            current[level] = entries[i];

            if (level + 1 === noEntries) {
                found = sum(current) === target;
                if (found) break;
            } else {
                current = findResult(i + 1, current);
            }
        }

        if (!found) current.pop();
        return current;
    };

    const result = findResult(0, []);

    if (!found) throw new Error(`Could not find ${noEntries} numbers that summed ${target}`);
    return product(result);
};

export default async (): Promise<number[]> => {
    const target = 2020;

    const numbers = (await readFileLines(path.resolve(__dirname, 'input'))).map((num) => +num);
    const answerPart1 = productEntriesThatSum(target, 2, numbers);
    const answerPart2 = productEntriesThatSum(target, 3, numbers);
    return [answerPart1, answerPart2];
};
