// https://adventofcode.com/2020/day/3

import path from 'path';

import { readFileLines } from '@util/file';

export const navigate = (map: string[], xSlope: number, ySlope: number): number => {
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

export default async (): Promise<number[]> => {
    const map = await readFileLines(path.resolve(__dirname, 'input'));
    const r1d1 = navigate(map, 1, 1);
    const r3d1 = navigate(map, 3, 1);
    const r5d1 = navigate(map, 5, 1);
    const r7d1 = navigate(map, 7, 1);
    const r1d2 = navigate(map, 1, 2);

    const answerPart2 = r1d1 * r3d1 * r5d1 * r7d1 * r1d2;
    return [r3d1, answerPart2];
};
