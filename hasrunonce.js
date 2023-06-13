  
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
    
    secretNumber = await ask("Pick a secret number "); //input for secret num
    secretNumber = Math.floor(parseInt(secretNumber)); //makes user input a whole num
    
    console.log("Secret number is " + secretNumber); //confirms back to user secret num
    console.log("Ok lets get started...");
    
    hasRanOnce = true;
    }