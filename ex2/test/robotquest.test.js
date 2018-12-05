const featuresToTest = require('../src/robotquest-features');
var robot = {
    position:{
        line: 0,
        column: 0
    },
    head: "up"
}; // Global robot variable

test('robot should have its head turned to the right when head is up and direction is right', () => {
    let nbOfTurn = featuresToTest.turn(robot, 'turn-right', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe('right');
});

test('robot should have its head turned to the left when head is up and direction is left', () => {
    let nbOfTurn = featuresToTest.turn(robot, 'turn-left', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("left");
});

test('robot should have its head turned to the left when head is down and direction is right', () =>{
    robot.head = "down";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-right', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("left");
});

test('robot should have its head turned to the right when head is down and direction is left', () =>{
    robot.head = "down";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-left', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("right");
});

test('robot should have its head turned to the down when head is right and direction is right', () =>{
    robot.head = "right";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-right', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("down");
});

test('robot should have its head turned to the up when head is right and direction is left', () =>{
    robot.head = "right";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-left', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("up");
});

test('robot should have its head turned to the up when head is left and direction is right', () =>{
    robot.head = "left";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-right', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("up");
});

test('robot should have its head turned to the down when head is left and direction is left', () =>{
    robot.head = "left";
    let nbOfTurn = featuresToTest.turn(robot, 'turn-left', 0);
    expect(nbOfTurn).toBe(1);
    expect(robot.head).toBe("down");
});
// TODO: write some more tests on turn()

test('robot should move 1 step up when head is up', () => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    let nbOfMoveAlreadyDone = 0;
    let robot = {
        position: {
            line: 2,
            column: 2
        },
        head: 'up'
    };

    let nbOfMove = featuresToTest.move(robot, maxLineIndex, maxColumnIndex, nbOfMoveAlreadyDone);
    expect(nbOfMove).toBe(1);
    expect(robot.position.column).toBe(2);
    expect(robot.position.line).toBe(3);
});

test('robot should move 1 step down when head is down', () => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    let nbOfMoveAlreadyDone = 0;
    let robot = {
        position: {
            line: 2,
            column: 2
        },
        head: 'down'
    };

    let nbOfMove = featuresToTest.move(robot, maxLineIndex, maxColumnIndex, nbOfMoveAlreadyDone);
    expect(nbOfMove).toBe(1);
    expect(robot.position.column).toBe(2);
    expect(robot.position.line).toBe(1);
});

test('robot should move 1 step right when head is right', () => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    let nbOfMoveAlreadyDone = 0;
    let robot = {
        position: {
            line: 2,
            column: 2
        },
        head: 'right'
    };

    let nbOfMove = featuresToTest.move(robot, maxLineIndex, maxColumnIndex, nbOfMoveAlreadyDone);
    expect(nbOfMove).toBe(1);
    expect(robot.position.column).toBe(3);
    expect(robot.position.line).toBe(2);
});

test('robot should move 1 step left when head is left', () => {
    let maxLineIndex = 3; // 4 lines
    let maxColumnIndex = 3; // 4 columns
    let nbOfMoveAlreadyDone = 0;
    let robot = {
        position: {
            line: 2,
            column: 2
        },
        head: 'left'
    };

    let nbOfMove = featuresToTest.move(robot, maxLineIndex, maxColumnIndex, nbOfMoveAlreadyDone);
    expect(nbOfMove).toBe(1);
    expect(robot.position.column).toBe(1);
    expect(robot.position.line).toBe(2);
});

// TODO: write some more tests on move()

test('robot reaches the flag when its position meets `F` on the board', () => {
    let board = [
        ['.', 'F'] // only one line to this board
    ];
    let winningRobot = {
        position: {
            line: 0,
            column: 1
        },
        head: 'right'
    };

    let anotherRobot = {
        position: {
            line: 0,
            column: 0
        },
        head: 'right'
    };


    expect(featuresToTest.checkIfFlagReached(winningRobot, board)).toBe(true);
    expect(featuresToTest.checkIfFlagReached(anotherRobot, board)).toBe(false);

});

// TODO: write some more tests on checkIfFlagReached

