var buttonColours = ["blue", "green", "red", "yellow"]; // The colours used in the game for boxes.
var gamePattern = []; //Empty array to store the game pattern which will be randomly generated in nextSequence function.
var userClickedPattern = []; //EMpty array to store the pattern in which the user clicked the buttons

var randomNumber; // To get a random number to pass it as index to select a colour from the defined buttonColour array.
var randomChoosenColour; //Based on the number generated in randomNumber, the colours will be selected from buttonColour array.

var audio; // To add music to each time you press the button

var started = false; //Setting this to keep track of the game. To check whether it is started or not.

var level = 0; // To set the level of the game as it proceeds.

//To detect the first key press in keyboard
$(document).keydown(function () {
  if (!started) {
    $("#info-title").text("Level " + level); //To update the h2 to value of Level
    nextSequence();
    started = true; //Set the started to true once the keyboard key has been pressed for the first time.
  }
});

//Function to perform an event when any of the button is clicked

//To know when any of the buttons are clicked
$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id"); //To get the id of the button that was clicked
  userClickedPattern.push(userChoosenColour); //To put the user choosen colours in an array.
  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1); //Call the function by passing the index of the last choosen answer by user.
});

function checkAnswer(currentLevel) {
  //If user and game pattern matches, then log success and call nextSequnce after certain seconds so that we can move on to new sequence.
  //  If the user's most recent answer is not right, then log as wrong.

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong"); //When the user gets the answer wrong, we'll play alarm sound to notify the user.

    //Once the answer is wrong, need to alarm the user through some visual change for which we apply this class to generate an effect.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //To change the heading to game over
    $("#info-title").text("Game Over, Press any key to restart the game");
    restartGame();
  }
}

//Function for the sequnce of the game.
function nextSequence() {
  userClickedPattern = []; //Need to empty the array once the sequence has been completed.
  level++; //Increment the level everytime this function is called.

  $("#info-title").text("Level " + level); //To update the h2 to value of Level
  // To generate random number between 0 and 3 as we have defined only 4 colours.
  // If we define more numbers, we can use length function to get the size and generate number instead of giving manually.
  randomNumber = Math.floor(Math.random() * 4);

  randomChoosenColour = buttonColours[randomNumber]; //To get the colour randomly from the buttonColours array using the randomNumber as index.
  gamePattern.push(randomChoosenColour); //Putting the chosen colours in the empty array created (gamePattern)

  // To animate the button that is being pressed using the id of the choosen colour.
  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //To play the audio with respect to the button that was clicked
  playSound(randomChoosenColour);
}

//Function to play the sound of the button that was clicked
function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//To add the shadow effect when the button is clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  //To remove the function once it was animated(after 100 milliseconds in this case), so that the button will go back to normal.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Reset the level, gamepattern and started to start the game again once the user gets the answer wrong.

function restartGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
