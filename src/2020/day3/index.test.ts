import { expect } from 'chai';
import path from 'path';

import { readFileLines } from '@util/file';

import { navigate } from './';

describe('2020', () => {
    describe('Day 3', () => {
        let map: string[];

        beforeEach(async () => {
            map = await readFileLines(path.resolve(__dirname, 'testinput'));
        });

        it('Part 1', () => {
            const result = navigate(map, 3, 1);
            expect(result).to.be.equal(7);
        });

        it('Part 2', () => {
            const r1d1 = navigate(map, 1, 1);
            const r3d1 = navigate(map, 3, 1);
            const r5d1 = navigate(map, 5, 1);
            const r7d1 = navigate(map, 7, 1);
            const r1d2 = navigate(map, 1, 2);

            const result = r1d1 * r3d1 * r5d1 * r7d1 * r1d2;
            expect(result).to.be.equal(336);
        });
    });
});
