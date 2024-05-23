export const rollDice = (command) => {
    const match = command.match(/(\d*)d(\d+)([ad])?/);
    if (!match) {
        return { result: 'Invalid command', rolls: [], total: 0 };
    }

    const [, numDice, numSides, modifier] = match;
    const numberOfDice = numDice ? parseInt(numDice, 10) : 1;
    const sides = parseInt(numSides, 10);
    let rolls = [];

    for (let i = 0; i < (modifier ? 2 : numberOfDice); i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    let total;
    if (modifier === 'a') {
        total = Math.max(...rolls);
    } else if (modifier === 'd') {
        total = Math.min(...rolls);
    } else {
        total = rolls.reduce((acc, val) => acc + val, 0);
    }

    return { result: `Roll: ${rolls.join(', ')}`, rolls, total };
};
