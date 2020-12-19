// https://adventofcode.com/2020/day/4

import path from 'path';

import { readFile } from '@util/file';
import { isNumBetween } from '@util/math';
import { splitBlankLinesSingleLine } from '@util/string';

export type Passport = {
    byr: string | undefined;
    iyr: string | undefined;
    eyr: string | undefined;
    hgt: string | undefined;
    hcl: string | undefined;
    ecl: string | undefined;
    pid: string | undefined;
    cid: string | undefined;
};

const parseLine = (line: string): Passport => {
    const matchPart = (token: string): string | undefined => {
        const match = line.match(new RegExp(`(?<=${token}:)(#?(\\w|\\d)+)`));
        if (!match) return undefined;
        return match[0];
    };

    return {
        byr: matchPart('byr'),
        iyr: matchPart('iyr'),
        eyr: matchPart('eyr'),
        hgt: matchPart('hgt'),
        hcl: matchPart('hcl'),
        ecl: matchPart('ecl'),
        pid: matchPart('pid'),
        cid: matchPart('cid')
    };
};

export const validatePart1 = (passport: Passport): boolean => {
    let valid = true;
    for (const [key, value] of Object.entries(passport)) {
        if (!valid) break;
        if (key === 'cid') continue;
        if (!value || value.length === 0) valid = false;
    }
    return valid;
};

export const validatePart2 = (passport: Passport): boolean => {
    let valid = true;
    const len = (value: string, length: number) => value.length === length;
    const validateToken = (token: keyof Passport, value: string) => {
        switch (token) {
            case 'byr':
                return len(value, 4) && isNumBetween(value, 1920, 2002)[0];
            case 'iyr':
                return len(value, 4) && isNumBetween(value, 2010, 2020)[0];
            case 'eyr':
                return len(value, 4) && isNumBetween(value, 2020, 2030)[0];
            case 'hgt': {
                if (value.endsWith('cm')) return isNumBetween(value.replace('cm', ''), 150, 193)[0];
                if (value.endsWith('in')) return isNumBetween(value.replace('in', ''), 59, 76)[0];
                return false;
            }
            case 'hcl':
                return /^#[0-9a-f]{6}$/.test(value);
            case 'ecl':
                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
            case 'pid':
                return /^\d{9}$/.test(value);
        }
        return true;
    };

    for (const [key, value] of Object.entries(passport)) {
        if (!valid) break;
        if (key === 'cid') continue;
        if (!value || value.length === 0) valid = false;
        else valid = validateToken(key as keyof Passport, value);
    }
    return valid;
};

export const parseFile = (file: string): Passport[] => splitBlankLinesSingleLine(file).map(parseLine);

export default async (): Promise<number[]> => {
    const passports = parseFile(await readFile(path.resolve(__dirname, 'input')));
    const part1 = passports.filter((p) => validatePart1(p)).length;
    const part2 = passports.filter((p) => validatePart2(p)).length;
    return [part1, part2];
};
