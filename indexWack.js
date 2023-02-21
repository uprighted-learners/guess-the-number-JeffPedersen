// Imports readline and allows us to do input in and out
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// ! run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

//? Pseudocode still not fluent and smooth , I need more practice
//? Also took me way too long to figure out node index.js

start(); // Async start function being invoked
async function start() { // The function that starts the whole game
    console.log("\n-------------------------");
    console.log("Welcome to number picker!");
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
    console.log("-------------------------");
    let minNum = 1; //set min num DUH
    let pickHighNum = await ask(`\nPlease choose a max number : `);  //asks the user to input the highest number
    let highNum = Math.floor(parseInt(pickHighNum)); //makes user input a whole number
        if (isNaN(highNum)){ //If we get garbage default is set to 100
            highNum = 100 //set to 100
            console.log(".... ok how about we just use 100 as the max") //tells em 
        }   
        console.log(`\nNow we choose from ${minNum} to ${highNum} `); //sets the range
    let secretNumber = await ask("Pick a secret number "); //input for secret num
    secretNumber = Math.floor(parseInt(secretNumber)); //makes user input a whole num
    console.log('Secret number is ' + secretNumber); //confirms back to user secret num
    console.log("Ok lets get started...")
    let numMath = Math.floor((minNum + highNum) / 2);

    guessingGame()
    async function guessingGame() {
        let compyGuessOne = await ask(`I guess ${numMath}, did I get it right the first time? [Y] or [N]`)
        if (compyGuessOne === "Y" || compyGuessOne === "y") {
            console.log("Horay!");
            process.exit();
        }
        //! ---------------------------------------------------------------------------------------------
        //! everything past here is a big WTF
        //! How do I adjust the range of possible numbers with my neat numMath item?
        //! How do I handle Higher or Lower loops?
        
        if (compyGuessOne === "N" || compyGuessOne === "n") {
            let compyGuessTwo = await ask(`[H]igher or [L]ower than ${numMath}`);
            if (compyGuessTwo === "H" || compyGuessTwo === "h") {
                let minNum = numMath;
                console.log(`Ok, let me choose from ${minNum} to ${highNum}`)
                    let numMath = Math.floor((minNum + highNum) / 2);
                    HigherOrLower()
                    async function HigherOrLower() {
                        let HigherOrLower = await ask(`[H]igher or [L]ower than ${numMath}`)
                        if (HigherOrLower === "H" || HigherOrLower === "h") {
                            console.log("Moving on up");
                        }
                    }
            }
        }
    }

    if (compyGuessOne === "N" || compyGuessOne == "n") {
        let numMath = highNum
        let compyGuessTwo = await ask(`[H]igher or [L]ower than ${numMath}`);
        if (compyGuessTwo === "l" || compyGuessTwo === "L") {
            let numMath = Math.floor((minNum + highNum) / 2);
            console.log(`Ok is it ${numMath} ?`);
        }
    }

}
























// Stops the start function from running
// process.exit();
