// https://adventofcode.com/2020/day/1

import fs from 'fs/promises';
import path from 'path';

const readInput = async () => {
    const inputFile = path.resolve(__dirname, 'input');
    const input = await fs.readFile(inputFile);
    return input.toString();
};

const findEntriesThatSum = (sum: number, entries: number[]) => {
    let found = false;
    let result: number[] = [0, 0];

    for (let i = 0; i < entries.length; i++) {
        if (found) break;
        const first = entries[i];

        for (let j = i + 1; j < entries.length; j++) {
            const second = entries[j];

            if (first + second === sum) {
                result = [first, second];
                found = true;
                break;
            }
        }
    }

    return result;
};

async function main() {
    const numbers = (await readInput()).split('\n').map((num) => +num);
    const answer = findEntriesThatSum(2020, numbers);
    return answer[0] * answer[1];
}

main()
    .then((result) => console.log(`Answer: ${result}`))
    .catch(console.error);
