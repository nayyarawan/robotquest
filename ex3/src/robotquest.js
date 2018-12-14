'use strict';
let features = require('./robotquest-features');
var prompt = require("prompt-sync")();


// This code is inspired from https://github.com/HackYourFuture/RobotApp

const R = features.SYMBOLS.robot;
const T = features.SYMBOLS.tree;
const F = features.SYMBOLS.flag;
const W = features.SYMBOLS.water;

const PLAY_BOARD = [
    [T,   T,    '.',   F],
    [T,   '.',  '.', '.'],
    ['.', '.',  '.', '.'],
    [R,   '.',  '.',   W]
];



//const STEPS_TO_FLAG = [ 'move', 'move', 'move', 'move', 'move', 'move'];
//const STEPS_TO_FLAG = ["turn-right", 'move',"turn-left","move","turn-right", 'move', 'move', "move" ];

let ROBOT_START_STATE = {
    position: {
        line: 0,
        column: 0
    },
    head: 'up'
};

let moves = 0;
let turns = 0;
let isTriedOutOfBorder = false;

function main() {
    let maxLineIndex = PLAY_BOARD.length - 1;
    let maxColumnIndex = PLAY_BOARD[0].length - 1;
    let board = PLAY_BOARD.reverse(); // we play upside down, so the robot starts (0,0) in the bottom left

    let currentRobot = features.cloneRobot(ROBOT_START_STATE);
    let isFlagReached = false;
    let isWaterReached = false;
    let isTreeReached = false;

    renderBoard(board, isFlagReached);

    while(!isFlagReached){
            let lastBoard = JSON.parse(JSON.stringify(board));

            //Object.freeze(lastBoard);
            let val = prompt(">> ");
            let step = val;
            let previousRobotState = features.cloneRobot(currentRobot);
            let hasMoved = applyStep(currentRobot, step, maxLineIndex, maxColumnIndex);
            isFlagReached = features.checkIfFlagReached(currentRobot, board);
            isWaterReached = features.checkIfWaterReached(currentRobot, board);
            isTreeReached = features.checkIfTreeReached(currentRobot, board);

            features.updateBoard(board, previousRobotState, currentRobot);
            if(hasMoved) {
                renderBoard(board, isFlagReached);

            }
            if (isWaterReached) {
                console.log("oops Game Over ! You reach to Water");

                break;
            }
            if (isTreeReached) {
                board = JSON.parse(JSON.stringify(lastBoard));
                renderBoard(board, isFlagReached);
                removeStep(currentRobot, maxLineIndex, maxColumnIndex);
                let msg = "you reached tree. Try again!";
                console.log(msg);

            }

    }
}


function renderBoard(board, flagReached) {
    console.clear();
    console.log('\n ' + moves + ':');

    for (let row = board.length - 1; row >= 0; row--) {
        const cells = board[row];
        let line = '';

        for (let col = 0; col < cells.length; col++) {
            line += ' ' + cells[col] + ' ';
        }
        console.log(line);
    }

    if (flagReached) {
        console.log(`Bravo! Flag reached in ${moves} moves and ${turns} turns`);
    }

    sleep(1000);
}


function applyStep(robot, step, maxLineIndex, maxColumnIndex) {


    if (step === 'turn-right' || step === 'turn-left') {
        turns = features.turn(robot, step, turns);
        return true;
    }
    /*console.log(maxLineIndex);
    console.log(robot.position.line);*/
    if(robot.position.line != maxLineIndex || robot.position.column != maxColumnIndex) {
        moves = features.move(robot, maxLineIndex, maxColumnIndex, moves);
        return true;
    }else if (robot.head !== "up" ) {
        //console.log(robot.head);
        moves = features.move(robot, maxLineIndex, maxColumnIndex, moves);
        return true;
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

}

function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay) { /* Do nothing while waiting */}
}


/*
  Main method
 */

{
    // This is where the program starts.

    main();
}
