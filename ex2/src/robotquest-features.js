module.exports =
    {turn, move, updateBoard, checkIfFlagReached, cloneRobot};

const SYMBOLS = {
    robot: setReverse('R'),
    tree: colorInGreen('T'),
    flag: colorInYellow('F'),
    water: setBlueBg('w')

}
module.exports.SYMBOLS = SYMBOLS;

const trailIndicators = {
    left: setBright('←'),
    right: setBright('→'),
    up: setBright('↑'),
    down: setBright('↓')
};


function turn(robot, step, turns) {
    // To turn robot head according given value
    switch (robot.head) {
        case('up'):
            robot.head = step == "turn-right" ? "right" : "left";
            turns += 1;
            break;
        case("down"):
            robot.head = step == "turn-right" ? "left" : "right";
            turns += 1;
            break;
        case("right"):
            robot.head = step == "turn-right" ? "down" : "up";
            turns += 1;
            break;
        case("left"):
            robot.head = step == "turn-right" ? "up" : "down";
            turns += 1;
            break;
    }
    console.log("Robot head = " + robot.head);
    console.log(turns);
    return turns;

}

function move(robot, maxLineIndex, maxColumnIndex, nbOfMoves) {
    switch(robot.head){
        case("up"):
            robot.position.line++;
            nbOfMoves++;
            break;
        case("down"):
            robot.position.line--;
            nbOfMoves++;
            break;
        case("right"):
            robot.position.column++;
            nbOfMoves++;
            break;
        case("left"):
            robot.position.column--;
            nbOfMoves++;
            break;

    }
    console.log("Robot is on line "+ robot.position.line + " And on column "+ robot.position.column );
    return nbOfMoves;
}

function updateBoard(board, previousRobotState, currentRobotState) {
    return;
}

function checkIfFlagReached(robot, board) {
    return false;
}

// utils
function cloneRobot(robot) {
    let newRobot = {};
    newRobot.position = {};
    newRobot.position.line = robot.position.line;
    newRobot.position.column = robot.position.column;
    newRobot.head = robot.head;
    return newRobot;
}


// presentation utils
function colorInGreen(char) {
    return `\x1b[32m${char}\x1b[0m`;
}

function colorInYellow(char) {
    return `\x1b[33m${char}\x1b[0m`;
}

function setBlueBg(char) {
    return `\x1b[44m${char}\x1b[0m`;
}

function setReverse(char) {
    return `\x1b[7m${char}\x1b[0m`;
}

function setBright(char) {
    return `\x1b[1m${char}\x1b[0m`;
}
