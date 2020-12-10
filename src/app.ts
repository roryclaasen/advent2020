const adventArgs = process.argv.slice(2);
if (adventArgs.length !== 2) {
    console.error('You must only pass in the year and the day of the month');
    process.exit(1);
}
const year = +adventArgs[0];
const day = +adventArgs[1];

if (isNaN(year) || isNaN(day)) {
    console.error('Year and day of the month must be numbers');
    process.exit(1);
}

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
        console.error(err);
        process.exit(1);
    });
