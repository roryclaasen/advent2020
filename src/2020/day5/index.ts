// https://adventofcode.com/2020/day/5

import path from 'path';

import { readFileLines } from '@util/file';

export type BordingPass = {
    row: number;
    column: number;
    seatId: number;
};

export const parseLine = (line: string): BordingPass => {
    const findSplit = (input: string, min: number, max: number, down: 'F' | 'L', up: 'B' | 'R'): number => {
        if (input.length === 0 || min === max) return min;
        const char = input.charAt(0);
        const offset = Math.ceil((max - min) / 2);
        if (char === down) return findSplit(input.substr(1), min, max - offset, down, up);
        if (char === up) return findSplit(input.substr(1), min + offset, max, down, up);
        throw new Error(`Invalid Logic '${line}' '${input}'`);
    };

    const result = line.match(/^([BF]{7})([RL]{3})$/);
    if (!result) throw new Error(`Invalid input '${line}'`);

    const row = findSplit(result[1], 0, 127, 'F', 'B');
    const column = findSplit(result[2], 0, 7, 'L', 'R');
    const seatId = row * 8 + column;
    return { row, column, seatId };
};

export const findMaximumSeat = (passes: BordingPass[]): number => passes.sort((a, b) => b.seatId - a.seatId)[0].seatId;

export const findMissingSeat = (passes: BordingPass[]): number => {
    const ids = passes.map((p) => p.seatId);
    for (let r = 0; r < 127; r++) {
        for (let c = 0; c < 7; c++) {
            const id = r * 7 + c;
            if (!ids.includes(id)) {
                if (ids.includes(id - 1) && ids.includes(id + 1)) return id;
            }
        }
    }
    throw new Error('Could not find id');
};

export default async (): Promise<number[]> => {
    const boardingPasses = (await readFileLines(path.resolve(__dirname, 'input'))).map(parseLine);
    const part1 = findMaximumSeat(boardingPasses);
    const part2 = findMissingSeat(boardingPasses);
    return [part1, part2];
};
