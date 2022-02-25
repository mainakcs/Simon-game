
var countA_press = 0;
var started = false;
$(document).keypress(function(event){
        if (event.key == "a" && countA_press == 0){
        countA_press++;
        random();
        }
    });

var arrSys = [];
var level = 1;


//System Input

function random(){
    $("h1").text("Level "+level);
    var ran = Math.floor(Math.random()*4+1);
    pressButton(ran);
}


function pressButton(colorNo){

    switch(colorNo){
        
        case 1:
            arrSys.push("red");
            colorSound("red");
            break;
        
        case 2:
            arrSys.push("green");
            colorSound("green");
            break; 
        
        case 3:
            arrSys.push("blue");
            colorSound("blue");
            break;
            
        case 4:
            arrSys.push("yellow");
            colorSound("yellow");
            break; 

        default: console.log(colorNo);
    }

}

function colorSound(color){
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
    colorStyle(color);
}

function colorStyle(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}
  

// User Input

var arrUser = [];
var pressedTimes = 0;

$(".btn").click(function() {     

    var userChosenColour = $(this).attr("id");
    arrUser.push(userChosenColour);              
    colorSound(userChosenColour);
    pressedTimes++;
    check(pressedTimes);

});

// $("#red").click(function(){
//     arrUser.push("red");
//     colorSound("red");
//     pressedTimes++;
//     check(pressedTimes);
    
// });

// $("#green").click(function(){
//     arrUser.push("green");
//     colorSound("green");
//     pressedTimes++;
//     check(pressedTimes);
// });

// $("#blue").click(function(){
//     arrUser.push("blue");
//     colorSound("blue");
//     pressedTimes++;
//     check(pressedTimes);
// });

// $("#yellow").click(function(){
//     arrUser.push("yellow");
//     colorSound("yellow");
//     pressedTimes++;
//     check(pressedTimes);
// });


function check(times){
    if(arrUser[times -1] === arrSys[times -1]){
        nextIn();
    }
    else {    // You lost, back to level 1
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        level = 1;
        arrSys = [];
        arrUser = [];
        var count_press = 0;
        $("h1").text("Game over, press any key to restart");
        $(document).keypress(function(){
            if (count_press == 0){
                count_press++;
                setTimeout(function(){
                    random();
                },1000);
            }
        });
    }
}


function nextIn(){  // You are going to next level
    if(pressedTimes == arrSys.length){
        level++;
        arrUser = [];
        pressedTimes = 0;
        setTimeout(function(){
            random();
        },500);
    }
}
