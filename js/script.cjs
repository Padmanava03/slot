const prompt = require('prompt-sync')();    // helps to take user input

// 1. How much minimum amount can a user deposit in the slot machine
// 2. How many number of lines the user want to bet on
// 3. How much the user is betting on the slot machine
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings or take their money based on the result
// 7. Ask the user if they want to play again

// Mechanism of the slot machine
const ROWS = 3;
const COLS = 3;

// Symbol_Name : Symbol_Count
const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
};

// Symbol_Name : Symbol_Value
const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2,
}

// Taking the inputs from the user
const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = Number(depositAmount);
        
        // why I didn't use parseFloat() or parseInt()?
        // 1. Because Number() is more strict than parseFloat() and parseInt()
        // 2. Number() will return NaN if the string contains any non-numeric character
        // 3. parseFloat() and parseInt() will return a number if the string contains any numeric character

        // console.log(numberDepositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount...Try again");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const numberOfLines  = prompt("Enter the number of lines (1-3) you want to bet on: ");
        const totalLines = Number(numberOfLines);

        if(isNaN(totalLines) || totalLines < 1 || totalLines > 3){
            console.log("Invalid number of line/s...Try again");
        }else{
            return totalLines;
        }
    }
}
const getBet = (balance, numberOfLines) => {
    while(true){
        const betAmount = prompt("Enter the amount you want to bet: ");
        const numberBet = Number(betAmount);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/numberOfLines){
            console.log(`Bet amount shouldn't be greater than ${balance/numberOfLines}...Try again`);
        }else{
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];

    // populating the symbols array with the appropriate counts
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];

    // filling each reel column with random symbols
    for(let i=0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols] // copying the symbols array
        for(let j=0; j<ROWS; j++){
            // Select a random index from the reelSymbols array
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);

            // Add the symbol at the random index to the current reel
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);

            // Remove the symbol from the reelSymbols array to avoid duplicates
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
spin();



// end

// snake_case
// camelCase