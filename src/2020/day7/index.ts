// https://adventofcode.com/2020/day/7
import path from 'path';

import { readFileLines } from '@util/file';
import { sum } from '@util/math';

type BagChildren = {
    bag: string;
    count: number;
};

export type BagMap = Map<string, BagChildren[]>;

export const parseFile = (lines: string[]): BagMap => {
    type BagRule = {
        bag: string;
        children: BagChildren[];
    };

    const makeRule = (line: string): BagRule => {
        const parts = line.split(' bags contain ', 2);
        const bag = parts[0];
        const match = parts[1].match(/((\d+) ((?: |\w)+)(?= bags?))/g);
        if (!match) return { bag, children: [] as BagChildren[] };
        const children = match
            .map((str) => str.match(/^(\d+) ((?: |\w)+)$/))
            .map((bagMatch) => {
                if (!bagMatch) throw new Error('Invalid format');
                return {
                    bag: bagMatch[2],
                    count: +bagMatch[1]
                };
            });
        return { bag, children };
    };

    const map = new Map<string, BagChildren[]>();
    lines.map(makeRule).forEach((rule) => rule && map.set(rule.bag, rule.children));
    return map;
};

export const countAllThatCanContain = (bag: string, rules: BagMap): number => {
    const doesContain = new Map<string, boolean>();

    const canContain = (search: string) => {
        if (doesContain.has(search)) {
            return doesContain.get(search);
        }

        const children = rules.get(search);
        if (!children) {
            doesContain.set(search, false);
            return false;
        }

        if (children.filter((rule) => bag === rule.bag).length > 0) {
            doesContain.set(search, true);
            return true;
        }

        let childrenContain = false;
        children.forEach((child) => {
            if (canContain(child.bag)) childrenContain = true;
        });

        doesContain.set(search, childrenContain);
        return childrenContain;
    };

    return Array.from(rules.keys()).filter(canContain).length;
};

export const countAllBagsThatFit = (bag: string, rules: BagMap): number => {
    const countAllBags = (search: string): number => {
        const searchBag = rules.get(search);
        if (!searchBag || searchBag.length === 0) return 0;
        return sum(searchBag.map((child) => (countAllBags(child.bag) + 1) * child.count));
    };

    return countAllBags(bag);
};

export default async (): Promise<number[]> => {
    const rules = parseFile(await readFileLines(path.resolve(__dirname, 'input')));
    const part1 = countAllThatCanContain('shiny gold', rules);
    const part2 = countAllBagsThatFit('shiny gold', rules);
    return [part1, part2];
};
