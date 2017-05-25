'use strict';
var canvas = document.querySelector('.snakeCanvas');
var check = document.querySelector('input[type=checkbox]');
var BLOCK = 15;
var SPEED = 150;
canvas.width = window.innerWidth - (window.innerWidth % BLOCK + BLOCK * 2);
canvas.height = window.innerHeight - (window.innerHeight % BLOCK + BLOCK * 2);
var contex = canvas.getContext("2d");

function Snake(x, y, keys) {
  this.x = x;
  this.y = y;
  this.keys = keys;
  this.dx = 1;
  this.dy = 0;
  this.body = [[]];
  this.isEat = function(point) {
    return this.x === point[0] && this.y === point[1]
  };
  this.grow = function() {
    this.body.push([this.x, this.y]);
  };
  this.setBody = function() {
    this.body.unshift([this.x, this.y]);
    this.body.pop();
  };
  this.draw = function() {
    this.x += this.dx * BLOCK;
    this.y += this.dy * BLOCK;
    this.setBody()
    for(var i = 0; i < this.body.length; i++){
      contex.fillRect(this.body[i][0], this.body[i][1], BLOCK, BLOCK);
    }
  };
  this.isDead = function() {
    for(var i = 1; i < this.body.length; i++) {
      if(this.isEat(this.body[i])) {
        return true;
      }
    }
    return false;
  };
  this.reset = function() {
    this.body = [[]];
    this.dx = 1;
    this.dy = 0;
  };
  this.control = function(e, keys){
    this.move(keys[e.keyCode])
  };
  this.move = function(direction) {
    if(direction === 'right') {
      if(this.dx === -1) return;
      this.dx = 1;
      this.dy = 0;
    }
    else if (direction === 'left') {
      if(this.dx === 1) return;
      this.dx = -1;
      this.dy = 0;
    }
    else if (direction === 'down') {
      if(this.dy === -1) return;
      this.dx = 0;
      this.dy = 1;
    }
    else if (direction === 'up') {
      if(this.dy === 1) return;
      this.dx = 0;
      this.dy = -1;
    }
  };
  window.addEventListener('keydown', function(e){this.control(e, this.keys)}.bind(this));
}

function Board(snakes) {
  this.snakes = snakes;
  this.food = [];
  this.clear = function() {
   contex.clearRect(0, 0, canvas.width, canvas.height);
 }
 this.border = function() {
  for(var i = 0; i < this.snakes.length; i++){
    if(this.snakes[i].x > canvas.width - BLOCK){
      this.snakes[i].x = 0;
    }
    if(this.snakes[i].x < 0){
      this.snakes[i].x = canvas.width;
    }
    if(this.snakes[i].y > canvas.height - BLOCK){
      this.snakes[i].y = 0;
    }
    if(this.snakes[i].y < 0){
      this.snakes[i].y = canvas.height;
    }
  }
 };
 this.setFood = function() {
     var x = Math.floor((Math.random() * canvas.width) / BLOCK) * BLOCK;
     var y = Math.floor((Math.random() * canvas.height) / BLOCK) * BLOCK;
     this.food = [x, y]
 };

 this.draw = function() {
   for(var i = 0; i < this.snakes.length; i++){
     this.snakes[i].draw();
     if(this.snakes[i].isDead()) {
       this.snakes[i].reset();
     }
     if(this.snakes[i].isEat(this.food)){
       this.snakes[i].grow();
       this.setFood();
     }
   }
   contex.fillRect(this.food[0], this.food[1], BLOCK, BLOCK);
 };
}

var keys1 = {
  39:'right',
  37:'left',
  38:'up',
  40:'down'
};

var keys2= {
  68:'right',
  65:'left',
  87:'up',
  83:'down'
}

var mySnake1 = new Snake(0, 0, keys1);
var mySnake2 = new Snake(BLOCK, BLOCK, keys2);

var mySnakes2 = [mySnake1, mySnake2];
var mySnakes1 = [mySnake1]

var myBoard = mySnakes2;

// function setBoard(){
//   console.log(check.checked);
//   if(check.checked){
//     myBoard = new Board(mySnakes2);
//   }
//   else{
//     myBoard = new Board(mySnakes1);
//   }
// }

// setBoard();
myBoard.setFood();

function gameLoop(){
  myBoard.clear();
  myBoard.border();
  myBoard.draw();
}

setInterval(function(){gameLoop()}, SPEED);
