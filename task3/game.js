const crypto = require('crypto');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const options = process.argv.slice(2);
function examination() {
    if (options.length < 3 || options.length % 2 === 0) {
        console.log("You must provide an odd number options (at least 3).");
        console.log("Usage: node game.js option1 option2 option3...");
        process.exit(1);
    }
    for (let i = 0; i < options.length-1; i++) {
        if (options[i] === options[i + 1]) {
            console.log("You must provide different arguments");
            process.exit(1);
        }
    }
}

function showMenu() {
    console.log("Options:");
    options.forEach((option, index) => {
        console.log(`${index + 1} - ${option}`);
    });
    console.log("h - Help");
    console.log("0 - Exit");
}

const key = crypto.randomBytes(32).toString('hex');

class generateHMAC {
    static generateHMAC(message, key) {
        const hmac = crypto.createHmac('sha3-256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

class determineWinner{
    static determineWinner(userOption, computerOption, options) {
        const index = options.indexOf(userOption);
        const halfLength = options.length / 2;
        const winningOptions = options.slice(index + 1, index + halfLength + 1);
        const losingOptions = options.slice(index - halfLength, index);
        if (winningOptions.includes(computerOption)) {
            return "You win!";
        } else if (losingOptions.includes(computerOption)) {
            return "You lose!";
        } else {
            return "It's a Draw!";
        }
    }
}

class GameTable {
    constructor(options) {
        this.options = options;
    }

    generateTable() {
        const table = [];
        const rowHeader = ['v User \\ PC >'];
        for (let option of this.options) {
            rowHeader.push(option);
        }
        table.push(rowHeader);
        for (let option1 of this.options) {
            const row = [option1];
            for (let option2 of this.options) {
                row.push(determineWinner.determineWinner(option1, option2, this.options));
            }
            table.push(row);
        }
        return table;
    }
}

class getUserChoice {
    static getUserChoice() {
        const computerOption = options[Math.floor(Math.random() * options.length)];
        const hmac = generateHMAC.generateHMAC(computerOption, key);
        console.log("HMAC:", hmac);
        readline.question("Your choice: ", (userChoice) => {
            if (userChoice === '0') {
                console.log("Goodbye!");
                readline.close();
                return;
            }
            if (userChoice === 'h') {
                const gameTable = new GameTable(options);
                const table = gameTable.generateTable();
                console.table(table);
                showMenu();
                getUserChoice.getUserChoice();
                return;
            }
            const userOption = options[userChoice - 1];
            if (!userOption) {
                console.log("Invalid choice. Please choose again.");
                showMenu();
                getUserChoice.getUserChoice(); 
                return;
            }
            const winner = determineWinner.determineWinner(userOption, computerOption, options);
            console.log(winner);
            console.log("Computer's choice:", computerOption);
            console.log("HMAC key:", key);
            readline.close();
        });
    }     
}

examination();
showMenu();
getUserChoice.getUserChoice();

