
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown",function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        log_my("BEGINNING OF CYCLE: ")
        nextSequence();
    }
});

$(".btn").on("click", function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    log_my("ANSWER: ");
    checkAnswer();
});

function nextSequence() {
    cleaner(userClickedPattern);
    level ++;
    let randomChosenColor = buttonColors[randomizer()];
    playSound(randomChosenColor);
    buttonAnimation(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#level-title").text("Level " + level);
    log_my("NEXT SEQUENCE: ")
}

function checkAnswer() {
    if (level === userClickedPattern.length) {
        if (gamePattern.toString() === userClickedPattern.toString()) {
            $("h1").text("Correct");
            setTimeout(function () {
                nextSequence();
            },500);

        } else {
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            new Audio("sounds\\wrong.mp3").play();
            startOver();
        }
    }
}















function log_my (name){
    console.log(name + level);
    console.log(name + gamePattern);
    console.log(name + userClickedPattern);

}

//Randomizer
function randomizer (){
    return Math.floor(Math.random() * 4) ;
}

//Start Over
function startOver(){
    cleaner(gamePattern);
    level = 0;
    started = false;
}

// array cleaner
function cleaner(name){
  while (name.length > 0){
      name.pop();
  }
}

// Sound function
function playSound(name){
    new Audio("sounds\\"+ name +".mp3").play();
}

// button animation
function buttonAnimation (name){
    let x = $("#" +name);
    x.fadeOut("slow");
    x.fadeIn("slow");
}

//Animation on  click
function animatePress(currentColor) {
    let i = $("#" + currentColor)
    i.addClass("pressed");
    setTimeout(function () {
        i.removeClass("pressed");
    }, 100);

}