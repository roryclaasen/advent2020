import { promises as fs } from 'fs';

export const readFile = async (
    path: string | Buffer | URL | fs.FileHandle,
    options?: {
        encoding?: null | undefined;
        flag?: string | number | undefined;
    }
): Promise<string> => {
    const input = await fs.readFile(path, options);
    return input.toString();
};

export const readFileLines = async (
    path: string | Buffer | URL | fs.FileHandle,
    options?: {
        encoding?: null | undefined;
        flag?: string | number | undefined;
    }
): Promise<string[]> => {
    const input = await readFile(path, options);
    return input.split(/\r?\n/);
};
