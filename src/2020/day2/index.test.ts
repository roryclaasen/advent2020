import { expect } from 'chai';
import path from 'path';

import { readFileLines } from '@util/file';

import { formatLine, PasswordPolicy, validatePart1, validatePart2 } from './';

describe('2020', () => {
    describe('Day 2', () => {
        let passwords: PasswordPolicy[];

        beforeEach(async () => {
            passwords = (await readFileLines(path.resolve(__dirname, 'testinput'))).map(formatLine);
        });

        it('Part 1', () => {
            const result = passwords.filter(validatePart1).length;
            expect(result).to.be.equal(2);
        });

        it('Part 2', () => {
            const result = passwords.filter(validatePart2).length;
            expect(result).to.be.equal(1);
        });
    });
});
