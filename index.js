// Imports readline and allows us to do input in and out
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// ! run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

let hasRanOnce = false; //handy lil way of breaking out for the single time items (welcome/choosemax/secretnum/)
// let highNum = 100;
let minNum = 1; //set min num DUH
//let secretNumber = 80;

async function start() {
  if (!hasRanOnce) {
    // using this for stuff we only want to appear first time (hello intro/set max/set secret)
    console.log("Welcome to number picker!");
    console.log(
      "Let's play a game where you (human) make up a number and I (computer) try to guess it."
    );

    let pickHighNum = await ask(`\nPlease choose a max number: `); //asks the user to input the highest number

    highNum = Math.floor(parseInt(pickHighNum)); //makes user input a whole number

    if (isNaN(highNum)) {
      //If we get garbage default is set to 100
      highNum = 100; //set to 100
      console.log(".... ok how about we just use 100 as the max"); //tells em
    }

    console.log(`\nNow we choose from ${minNum} to ${highNum} `); //sets the range

    secretNumber = await ask("Pick a secret number: "); //input for secret num
    secretNumber = Math.floor(parseInt(secretNumber)); //makes user input a whole num

    console.log("Secret number is " + secretNumber); //confirms back to user secret num
    console.log("Ok lets get started...");

    hasRanOnce = true; //right click format really helps checking for errors. I like my tight code better tho...
  }

  const guessOne = Math.floor((highNum - minNum) / 2) + minNum; //!GOLDEN
  console.log(`First guess is ${guessOne}`); //tells em the first guess
  if (guessOne === secretNumber) { //this part loops and if it matches we get a victory message and exit
    console.log(`Hooray, compy guessed ${secretNumber}`);
    return;
  } else if (guessOne >= minNum) { //if compy does not guess correct we enter the logic
    //console.log(`It's bigger than ${minNum} so we can continue`);

    let compyGuessHighOrLow = await ask(
      `[H]igher or [L]ower than ${guessOne}? `
    );

    if (compyGuessHighOrLow.toLowerCase() === "l") { //.toLowerCase() is better than ||
      highNum = Math.floor(parseInt(guessOne));
      console.log(`new high num is ${highNum}`);
    } else if (compyGuessHighOrLow.toLowerCase() === "h") {
      minNum = Math.floor(parseInt(guessOne));
      console.log(`new low num is ${minNum}`);
    }

    start();
  } 
}

start().then((v) => console.log(v)); //This right here was buried in asyncAwait OMG

// Stops the start function from running
// process.exit();
