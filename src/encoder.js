export function encode(game) {
    let rowStrings = [];

    for (let row of game) {
        let rowString = row.join('');

        rowStrings.push(parseInt(rowString, 5).toString(36));
    }

    return `${game[0].length}-${rowStrings.join('-')}`;
}

export function decode(str) {
    let rowStrings = str.split('-');
    let width = rowStrings.shift();

    return rowStrings.map((s) =>
        parseInt(s, 36)
        .toString(5)
        .padStart(width)
        .split('')
        .map((c) => Number(c)))
}
