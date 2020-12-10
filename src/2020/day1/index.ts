// https://adventofcode.com/2020/day/1

import fs from 'fs/promises';
import path from 'path';

const readInput = async () => {
    const inputFile = path.resolve(__dirname, 'input');
    const input = await fs.readFile(inputFile);
    return input.toString();
};

const product = (array: number[]) => {
    let result = array[0];
    array.slice(1).forEach((num) => (result *= num));
    return result;
};

const sumArray = (array: number[]) => {
    let result = array[0];
    array.slice(1).forEach((num) => (result += num));
    return result;
};

const findEntriesThatSum = (target: number, noEntries: number, entries: number[]) => {
    let found = false;

    const findResult = (startIndex: number, current: number[]): number[] => {
        const level = current.length;
        for (let i = startIndex; i < entries.length; i++) {
            if (found) break;
            current[level] = entries[i];

            if (level + 1 === noEntries) {
                found = sumArray(current) === target;
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
    return result;
};

const main = async () => {
    const target = 2020;

    const numbers = (await readInput()).split(/\r?\n/).map((num) => +num);
    const answerPart1 = product(findEntriesThatSum(target, 2, numbers));
    const answerPart2 = product(findEntriesThatSum(target, 3, numbers));
    return `Answer part 1: ${answerPart1}\nAnswer part 2: ${answerPart2}`;
};

main().then(console.log).catch(console.error);
