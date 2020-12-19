export const splitBlankLines = (content: string): string[] => content.split(/(\r?\n){2}/).filter((line) => !/^\r?\n$/.test(line));

export const splitBlankLinesSingleLine = (content: string): string[] => splitBlankLines(content).map((data) => data.replace(/\r?\n/g, ' '));
