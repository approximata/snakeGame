'use strict';

var keys1 = {
  39:'right',
  37:'left',
  38:'up',
  40:'down'
};

var keys2 = {
  68:'right',
  65:'left',
  87:'up',
  83:'down'
}

var mySnake1 = new Snake(0, 0, keys1);
var mySnake2 = new Snake(BLOCK, BLOCK, keys2);

var mySnakes2 = [mySnake1, mySnake2];
var mySnakes1 = [mySnake1];

var myBoard;

function setBoard() {
  if (check.checked) {
    myBoard = new Board(mySnakes2);
  }
  else {
    myBoard = new Board(mySnakes1);
  }
};

function gameLoop(run) {
  if(run) {
    myBoard.clear();
    myBoard.border();
    myBoard.draw();
  }
};

function initiateGame() {
  setBoard();
  myBoard.setFood();
  myBoard.start();
  isRun = true;
};

start.addEventListener('click', function(){ initiateGame() });
setInterval(function(){ gameLoop(isRun) }, SPEED);
