var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
//Starting game when key is down
$(document).on("click", function() {

  if (start == false) {
    nextSequence();
    start = true;
    $("#level-title").text("Level " + level);
  }
})

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  console.log("Tablica komputera: " + gamePattern)

}

//Click on button
$(".btn").on("click", function() {
  //console.log($(this).attr("id"));
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("Tablica gracza: " + userClickedPattern);
})

//Sounds of buttons
function playSound(name) {
  var startingAudio = new Audio("sounds/" + name + ".mp3");
  startingAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}
//Main game
function checkAnswer(currentLevel) {
  //console.log(currentLevel);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //console.log("Taka sama ostatnia wartość tablicy.");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      //console.log("Takie same długości tablicy.");
    }
  } else {
    var endingAudio = new Audio("sounds/wrong.mp3");
    endingAudio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    startOver();
  }
}
//Restart
function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);

}
