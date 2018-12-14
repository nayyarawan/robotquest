'use strict';
import { turn, move } from './robotquest-features.js';


let turns = 0;
let maxLineIndex = 3;
let maxColumnIndex = 3;
let nbOfMoves = 0;
let headArrow = "↑";
function main() {
    let robot ={
        position:{
            line:0,
            column:0
        },
        head : "up"
    }
    console.log("Starting now!");

    // attach events to your elements/buttons
    document.getElementById("turn-left-button").addEventListener("click", function(){turn_left(robot);});
    document.getElementById("turn-right-button").addEventListener("click", function(){turn_right(robot);});
    document.getElementById("move-button").addEventListener("click", function(){ move_robot(robot); });
    // Initialize your global variables (robot, nbOfMoves, etc...)


}

function move_robot(robot) {

    console.log(robot);
    // call the move function from robotquest-features (already imported 4U)
    move(robot, maxLineIndex, maxColumnIndex, nbOfMoves);
    document.getElementById("l"+robot.position.line+"c"+robot.position.column).innerHTML="R"+headArrow;

}

function turn_left(robot) {
    console.log("Turn left");
    // you can call this function directly from robotquest-features.js (see import at top of file):
    turn(robot, 'turn-left', turns);
    turn_head(robot);
}


function turn_right(robot) {
    console.log("Turn right");
    // you can call this function directly from robotquest-features.js (see import at top of file):
    turn(robot, 'turn-right', turns);
    turn_head(robot);
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
