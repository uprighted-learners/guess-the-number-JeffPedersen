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

//? Hello control flow

/* 
math test run
50 max
1 min
50 / 2 
25 
25 check if it's above min (1), so that's true
write answer, set min based on feedback (higher or lower)
25 / 2 
12
check if above min (1), so that's true
write answer, set min based on feedback
3 / 2 == 1, // check to see if guess is above or equal 
close maybe
*/

/* 
math test run
min + max / 2
50 max
1 min
50 /2 = 25
ask if correct, higher or lower
higher 25 + 50 / 2 = 37
ask if correct, higher or lower 
higher 37+50 / 2 42.5
this kind of works I guess, way better than take high num and half it
*/

/* 
math test run
min + max / 2
50 max
1 min
50 /2 = 25
ask if correct, higher or lower
lower 1 + 25 /2 = 13 
ask if correct, higher or lower 
lower 1+13 = 14 /2 = 7
8
4 
2
1
no no no no
*/

/* 
math test
max-min x2
50 max
1 min
1-50=49/2=24
ask if correct, higher or lower
lower - reassign lower
24-1=23x2
no no no
*/

let hasRanOnce = false; //handy lil way of breaking out for the single time items (welcome/choosemax/secretnum/)
// let highNum = 100;
let minNum = 1; //set min num DUH
//let secretNumber = 80;

//!Study these tuesday
// https://developer.mozilla.org/en-US/docs/Glossary/Scope
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals

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
//! In hindsight choosing to be different and going this route was so PAINFUL
  // let numMath = Math.floor((minNum + highNum) / 2); This was a hot garbage of an idea
  // let guessOne = Math.floor(parseInt((highNum + minNum) / 2)); // ALSO TERRIBLE
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
      //console.log("set new max"); //! comment out
      //set max based on new max
      highNum = Math.floor(parseInt(guessOne));
      console.log(`new high num is ${highNum}`);
    } else if (compyGuessHighOrLow.toLowerCase() === "h") {
      //console.log("set new min"); //! comment out
      //set min based on new min
      minNum = Math.floor(parseInt(guessOne));
      console.log(`new low num is ${minNum}`);
    }

    start();
  } 
}

/* 

let compyGuessOne = await ask(`I guess ${guessOne}, did I get it right the first time? [Y] or [N]`)
        if (compyGuessOne === "Y" || compyGuessOne === "y") {
            console.log("Horay!");
            process.exit();
            
            */

// start();

// if (compyGuessOne === "N" || compyGuessOne == "n") {
//     let compyGuessTwo = await ask(`[H]igher or [L]ower than ${numMath}`);
//     if (compyGuessTwo === "l" || compyGuessTwo === "L") {
//         let numMath = Math.floor((minNum + highNum) / 2);
//         console.log(`Ok is it ${numMath} ?`);
//     }
// }

start().then((v) => console.log(v)); //This right here was buried in asyncAwait OMG

// Stops the start function from running
// process.exit();
