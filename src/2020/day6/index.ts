// https://adventofcode.com/2020/day/6

import path from 'path';

import { readFile } from '@util/file';
import { sum } from '@util/math';
import { splitBlankLines } from '@util/string';

const makeUnique = (content: string) => {
    const arr: string[] = [];
    for (let i = 0; i < content.length; i++) {
        const ch = content[i];
        if (!arr.includes(ch)) arr.push(ch);
    }
    return arr.join('');
};

const containsSame = (group: string[]) => {
    const obj: Map<string, number> = new Map();
    const setOrIncrement = (char: string) => {
        const value = obj.get(char) ?? 0;
        obj.set(char, value + 1);
    };

    group.forEach((str) => {
        for (let i = 0; i < str.length; i++) {
            setOrIncrement(str.charAt(i));
        }
    });

    const arr: string[] = [];
    obj.forEach((length, char) => {
        if (length === group.length) {
            if (!arr.includes(char)) arr.push(char);
        }
    });

    return arr.join('');
};

export const parseFile = (file: string): string[] => splitBlankLines(file).map((line) => line.replace(/ /g, ''));

const countYesAnswers = (forms: string[]) => {
    const answers = forms.map(makeUnique).map((str) => str.length);
    return sum(answers);
};

const countSameAnswers = (file: string[]) => {
    const lines = file.map((str) => str.split(/\r?\n/g));
    return sum(
        lines
            .map(containsSame)
            .filter((str) => str.length > 0)
            .map((str) => str.length)
    );
};

export default async (): Promise<number[]> => {
    const lines = parseFile(await readFile(path.resolve(__dirname, 'input')));
    const part1 = countYesAnswers(lines.map((data) => data.replace(/\r?\n/g, ' ')));
    const part2 = countSameAnswers(lines);
    return [part1, part2];
};
