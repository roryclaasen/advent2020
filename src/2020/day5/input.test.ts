import { expect } from 'chai';
import path from 'path';

import { readFileLines } from '@util/file';

import { BordingPass, findMaximumSeat, parseLine } from './';

describe('2020', () => {
    describe('Day 5', () => {
        let passes: BordingPass[];

        beforeEach(async () => {
            passes = (await readFileLines(path.resolve(__dirname, 'testinput'))).map(parseLine);
        });

        describe('Parse Logic', () => {
            const values = [
                { input: 'FBFBBFFRLR', row: 44, col: 5, id: 357 },
                { input: 'BFFFBBFRRR', row: 70, col: 7, id: 567 },
                { input: 'FFFBBBFRRR', row: 14, col: 7, id: 119 },
                { input: 'BBFFBBFRLL', row: 102, col: 4, id: 820 }
            ];

            values.forEach((test) => {
                it(`should parse '${test.input}' correctly`, () => {
                    const result = parseLine(test.input);
                    expect(result.row).to.be.equal(test.row);
                    expect(result.column).to.be.equal(test.col);
                    expect(result.seatId).to.be.equal(test.id);
                });
            });
        });

        it('Part 1', () => {
            const result = findMaximumSeat(passes);
            expect(result).to.be.equal(820);
        });

        // it('Part 2', () => { });
    });
});
