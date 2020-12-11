import { expect } from 'chai';
import path from 'path';

import { readFile } from '@util/file';

import { parseFile, Passport, validatePart1, validatePart2 } from './';

describe('2020', () => {
    describe('Day 4', () => {
        let passports: Passport[];

        it('Part 1', async () => {
            passports = parseFile(await readFile(path.resolve(__dirname, 'testinput')));

            const results = passports.filter((p) => validatePart1(p)).length;
            expect(results).to.be.equal(2);
        });

        describe('Part 2', () => {
            it('Valid', async () => {
                passports = parseFile(await readFile(path.resolve(__dirname, 'testinput2valid')));

                const results = passports.filter((p) => validatePart2(p)).length;
                expect(results).to.be.equal(4);
            });

            it('Invalid', async () => {
                passports = parseFile(await readFile(path.resolve(__dirname, 'testinput2invalid')));

                const results = passports.filter((p) => validatePart2(p)).length;
                expect(results).to.be.equal(0);
            });
        });
    });
});
