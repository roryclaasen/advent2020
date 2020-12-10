// https://adventofcode.com/2020/day/2

import path from 'path';

import answer from '@util/answer';
import { readFileLines } from '@util/file';

type PasswordPolicy = {
    line: string;
    start: number;
    end: number;
    letter: string;
    password: string;
};

const formatLine = (line: string): PasswordPolicy => {
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

const validatePart1 = ({ start, end, letter, password }: PasswordPolicy) => {
    const count = password.match(new RegExp(letter, 'g'))?.length ?? -1;
    return count >= start && count <= end;
};

const validatePart2 = ({ start, end, letter, password }: PasswordPolicy) => {
    const validChar1 = password.charAt(start - 1) === letter;
    const validChar2 = password.charAt(end - 1) === letter;
    return (validChar1 && !validChar2) || (!validChar1 && validChar2);
};

const main = async () => {
    const passwords = (await readFileLines(path.resolve(__dirname, 'input'))).map(formatLine);
    const part1 = passwords.filter(validatePart1).length;
    const part2 = passwords.filter(validatePart2).length;

    return [part1, part2];
};

answer(main);
