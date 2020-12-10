// https://adventofcode.com/2020/day/2

import path from 'path';

import { readFileLines } from '@util/file';

export type PasswordPolicy = {
    line: string;
    start: number;
    end: number;
    letter: string;
    password: string;
};

export const formatLine = (line: string): PasswordPolicy => {
    const result = line.match(/^(\d+)-(\d+) (\w): (.+)$/);
    if (!result) throw new Error(`Invalid input '${line}'`);
    return {
        line: result[0],
        start: +result[1],
        end: +result[2],
        letter: result[3],
        password: result[4]
    };
};

export const validatePart1 = ({ start, end, letter, password }: PasswordPolicy): boolean => {
    const count = password.match(new RegExp(letter, 'g'))?.length ?? -1;
    return count >= start && count <= end;
};

export const validatePart2 = ({ start, end, letter, password }: PasswordPolicy): boolean => {
    const validChar1 = password.charAt(start - 1) === letter;
    const validChar2 = password.charAt(end - 1) === letter;
    return (validChar1 && !validChar2) || (!validChar1 && validChar2);
};

export default async (): Promise<number[]> => {
    const passwords = (await readFileLines(path.resolve(__dirname, 'input'))).map(formatLine);
    const part1 = passwords.filter(validatePart1).length;
    const part2 = passwords.filter(validatePart2).length;

    return [part1, part2];
};
