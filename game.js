var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];

var started=false;
var level=0;


$(document).keypress(function(){

  if(!started)
{

  $("#level-title").text("Level "+level);
  nextSequence();
  started=true;
}
});


$(".btn").click( function(){
  var userChosenColors=$(this).attr("id");
  userClickedPattern.push(userChosenColors);

  playSound(userChosenColors);
  animatePress(userChosenColors);


  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){nextSequence()},1000);
      }
  }
  else {

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);


      startOver();
  }

}


function playSound(name){

  var audio= new Audio("sounds/"+ name +".mp3");
  audio.play();
}


function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").text("Level"+level);

  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);



  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
