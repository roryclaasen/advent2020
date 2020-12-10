// https://adventofcode.com/2020/day/3

import fs from 'fs/promises';
import path from 'path';

const readInput = async () => {
    const inputFile = path.resolve(__dirname, 'input');
    const input = await fs.readFile(inputFile);
    return input.toString();
};

const navigate = (map: string[], xSlope: number, ySlope: number) => {
    const height = map.length;
    const width = map[0].length;
    let x = 0;
    let y = 0;
    let treeCount = 0;
    let bottom = false;

    do {
        x += xSlope;
        y += ySlope;
        if (x >= width) x -= width;
        if (y >= height) bottom = true;
        else {
            const char = map[y].charAt(x);
            if (char === '#') treeCount++;
        }
    } while (!bottom);
    return treeCount;
};

const main = async () => {
    const map = (await readInput()).split(/\r?\n/);
    const r1d1 = navigate(map, 1, 1);
    const r3d1 = navigate(map, 3, 1);
    const r5d1 = navigate(map, 5, 1);
    const r7d1 = navigate(map, 7, 1);
    const r1d2 = navigate(map, 1, 2);

    const answerPart2 = r1d1 * r3d1 * r5d1 * r7d1 * r1d2;
    return `Answer part 1: ${r3d1}\nAnswer part 2: ${answerPart2}`;
};

main().then(console.log).catch(console.error);
