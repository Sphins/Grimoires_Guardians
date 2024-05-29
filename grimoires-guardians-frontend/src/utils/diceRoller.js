export const rollDice = (command) => {
    // Mise à jour de la regex pour inclure la partie additionnelle
    const match = command.match(/(\d*)d(\d+)([ad])?(?:\s*\+\s*(\d+))?/);
    if (!match) {
        return { result: 'Invalid command', rolls: [], total: 0 };
    }

    const [, numDice, numSides, modifier, additional] = match;
    const numberOfDice = numDice ? parseInt(numDice, 10) : 1;
    const sides = parseInt(numSides, 10);
    const additionalValue = additional ? parseInt(additional, 10) : 0;
    let rolls = [];

    for (let i = 0; i < (modifier ? 2 : numberOfDice); i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    let total;
    if (modifier === 'a') {
        total = Math.max(...rolls) + additionalValue;
    } else if (modifier === 'd') {
        total = Math.min(...rolls) + additionalValue;
    } else {
        total = rolls.reduce((acc, val) => acc + val, 0) + additionalValue;
    }

    let details = `Roll: ${rolls.join(', ')}`;
    if (additionalValue) {
        details += ` + ${additionalValue}`;
    }

    return {
        result: `${details} = ${total}`,
        rolls,
        total
    };
};