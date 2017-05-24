'use strict';
var canvas = document.querySelector('.snakeCanvas');
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
  this.isEat = function(food){
    console.log("food " + food[0] +" "+ food[1]);
    console.log("snake" + this.x +" "+ this.y);

    return this.x === food[0] && this.y === food[1]
  };
  this.grow = function(){
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
    console.log(this.x);
    for(var i =0; i < this.body.length; i++){
      contex.fillRect(this.body[i][0], this.body[i][1], BLOCK, BLOCK);
    }
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

function Board(snake) {
  this.snake = snake;
  this.food = [];
  this.clear = function() {
   contex.clearRect(0, 0, canvas.width, canvas.height);
 }
 this.border = function(x, y) {
   if(x > canvas.width - BLOCK){
     this.snake.x = 0 - BLOCK;
   }
   if(x < 0){
     this.snake.x = canvas.width;
   }
   if(y > canvas.height - BLOCK){
     this.snake.y = 0 - BLOCK;
   }
   if(y < 0){
     this.snake.y = canvas.height;
   }
 };
 this.setFood = function() {
     var x = Math.floor((Math.random() * canvas.width) / BLOCK) * BLOCK;
     var y = Math.floor((Math.random() * canvas.height) / BLOCK) * BLOCK;
     this.food = [x, y]
 };
 this.draw = function() {
   if(this.snake.isEat(this.food)){
     console.log('reset');
     this.snake.grow();
     this.setFood();
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

var mySnake = new Snake(0, 0, keys1);
var myBoard = new Board(mySnake);

myBoard.setFood();

function gameLoop(){
  myBoard.clear();
  myBoard.border(mySnake.x, mySnake.y)
  mySnake.draw();
  myBoard.draw();
}


setInterval(function(){gameLoop()}, SPEED);
