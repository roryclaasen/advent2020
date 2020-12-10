import { expect } from 'chai';
import path from 'path';

import { readFileLines } from '@util/file';

import { productEntriesThatSum } from './';

describe('2020', () => {
    describe('Day 1', () => {
        let target: number;
        let numbers: number[];

        beforeEach(async () => {
            target = 2020;
            numbers = (await readFileLines(path.resolve(__dirname, 'testinput'))).map((num) => +num);
        });

        it('Part 1', () => {
            const result = productEntriesThatSum(target, 2, numbers);
            expect(result).to.be.equal(514579);
        });

        it('Part 2', () => {
            const result = productEntriesThatSum(target, 3, numbers);
            expect(result).to.be.equal(241861950);
        });
    });
});
