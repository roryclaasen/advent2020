const adventArgs = process.argv.slice(2);
if (adventArgs.length !== 2) {
    console.error('You may only pass in the year and the day of the month');
    process.exit(1);
}

const validate = (arg: string, errMessage: string, lowerBound: number, upperBound?: number) => {
    const num = +arg;
    if (isNaN(num) || num < lowerBound || (!!upperBound && num > upperBound)) {
        console.error(errMessage);
        process.exit(1);
    }
    return num;
};

const year = validate(adventArgs[0], 'Year must be a number greater than or equal to 2020', 2020);
const day = validate(adventArgs[1], 'Day must be a number between 1 and 25', 1, 25);

const file = `${year}/day${day}`;
const importFile = import(file) as Promise<{ default: () => Promise<unknown[]> }>;
importFile
    .then(async (f) => await f.default())
    .then((answers) => {
        console.log(`Year ${year} Day ${day}`);
        answers.forEach((a, i) => {
            console.log(`Answer part ${i + 1}: ${a}`);
        });
    })
    .catch((err) => {
        if (err.code === 'MODULE_NOT_FOUND') {
            console.error('No answer exists for this day');
        } else {
            console.error(err);
        }
        process.exit(1);
    });
