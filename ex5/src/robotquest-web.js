'use strict';
import { turn, move } from './robotquest-features.js';


let turns = 0;
let maxLineIndex = 3;
let maxColumnIndex = 3;
let nbOfMoves = 0;
let headArrow = "↑";
let newBoard = "";
function main() {
    let robot ={
        position:{
            line:0,
            column:0
        },
        head : "up"
    }
    newBoard = document.getElementById("board-inner").innerHTML;
    // attach events to your elements/buttons
    document.getElementById("turn-left-button").addEventListener("click", function(){turn_left(robot);});
    document.getElementById("turn-right-button").addEventListener("click", function(){turn_right(robot);});
    document.getElementById("move-button").addEventListener("click", function(){ move_robot(robot); });
    document.getElementById("restart-game").addEventListener("click", function(){restart_game(robot)});
    // Initialize your global variables (robot, nbOfMoves, etc...)


}

function move_robot(robot) {

    let lastRobot = JSON.parse(JSON.stringify(robot));
    //console.log(lastRobot);
    // call the move function from robotquest-features (already imported 4U)
    nbOfMoves = move(robot, maxLineIndex, maxColumnIndex, nbOfMoves);
    let nextCell = document.getElementById("l"+robot.position.line+"c"+robot.position.column).innerText;
    //console.log(robot);
        document.getElementById("l" + robot.position.line + "c" + robot.position.column).innerHTML = "R" + headArrow;
        document.getElementById("output1").innerHTML = "Moves : " + nbOfMoves;

        switch (nextCell.trim()) {
            case "F" :
                document.getElementById("result").innerHTML = "Robot have reached flag! Successfully";
                document.getElementById("result").style.display = "inline-block";
                document.getElementById("restart-game").style.display = "inline-block";
                document.getElementById("restart-game").innerHTML = "New Game";
                disable_btn();
                break;
            case "W":
                document.getElementById("result").innerHTML = "Oop! Robot have reached to water";
                document.getElementById("result").style.display = "inline-block";
                document.getElementById("restart-game").style.display = "inline-block";
                document.getElementById("restart-game").innerHTML = "Restart Game";
                disable_btn();
                break;
            case "T":

                document.getElementById("result").style.display = "inline-block";
                document.getElementById("result").style.color = "yellow";
                document.getElementById("result").innerHTML = "Robot have reached Tree";
                document.getElementById("l"+robot.position.line+"c"+robot.position.column).classList.add("shake");

                setTimeout(function () {
                    document.getElementById("l"+robot.position.line+"c"+robot.position.column).innerHTML = nextCell;
                    document.getElementById("l"+robot.position.line+"c"+robot.position.column).classList.remove("shake");
                    removeStep(robot);
                    document.getElementById("result").style.display = "none";
                    document.getElementById("result").style.color = "White";

                }, 1500);


                //console.log(robot);
                break;

        }

}

function removeStep(robot){
    switch (robot.head) {
        case "up":
            robot.position.line -=1;
            break;
        case "down":
            robot.position.line +=1;
            break;
        case "left":
            robot.position.column +=1;
            break;
        case "right":
            robot.position.column -=1;
            break;
    }
    nbOfMoves -=1;
    document.getElementById("output1").innerHTML = "Moves : " + nbOfMoves;
}

function turn_left(robot) {
    console.log("Turn left");
    // you can call this function directly from robotquest-features.js (see import at top of file):
    turns = turn(robot, 'turn-left', turns);
    turn_head(robot);
    document.getElementById("output2").innerHTML = "Turns : "+ turns;
}


function turn_right(robot) {
    console.log("Turn right");
    // you can call this function directly from robotquest-features.js (see import at top of file):
     turns = turn(robot, 'turn-right', turns);
    turn_head(robot);
    document.getElementById("output2").innerHTML = "Turns : "+ turns;
}

function restart_game(robot){
    document.getElementById("board-inner").innerHTML = newBoard;
    document.getElementById("result").style.display = "none";
    document.getElementById("restart-game").style.display = "none";

    headArrow = "↑";
    robot.head="up";
    robot.position.column = 0;
    robot.position.line = 0;
    nbOfMoves = 0;
    turns = 0;
    enable_btn();

    document.getElementById("output1").innerHTML = "Moves : " + nbOfMoves;
    document.getElementById("output2").innerHTML = "Turns : " + turns;
}

function disable_btn(){
    document.getElementById("turn-left-button").disabled = true;
    document.getElementById("turn-right-button").disabled = true;
    document.getElementById("move-button").disabled = true;
}

function enable_btn(){
    document.getElementById("turn-left-button").disabled = false;
    document.getElementById("turn-right-button").disabled = false;
    document.getElementById("move-button").disabled = false;
}

function turn_head(robot){
    switch (robot.head) {
        case "up":
            document.getElementById("l"+robot.position.line +"c"+ robot.position.column).innerHTML ="R↑";
            headArrow = "↑";
            break;
        case "down":
            document.getElementById("l"+robot.position.line +"c"+ robot.position.column).innerHTML ="R↓";
            headArrow = "↓";
            break;
        case "left":
            document.getElementById("l"+robot.position.line +"c"+ robot.position.column).innerHTML ="R←";
            headArrow = "←";
            break;
        case "right":
            document.getElementById("l"+robot.position.line +"c"+ robot.position.column).innerHTML ="R→";
            headArrow = "→";
            break;
    }
}

// Calling main on load
window.onload = main;
