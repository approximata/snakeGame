'use strict';

var canvas = document.querySelector('.snakeCanvas');

var BLOCK = 15;

var snake = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 0,
  size: 1,
  body: [[]],

  isEat: function(){
    return this.x === food.x && this.y === food.y
  },

  grow: function(){
    if(this.isEat()){
      this.size += 1;
      this.body.push([this.x, this.y]);
      food.setFood();
    }
  },
  isDead: function(){

  },
  setBody: function(){
    this.body.unshift([this.x, this.y]);
    this.body.pop();
  },
  draw: function() {
    this.x += this.dx * BLOCK;
    this.y += this.dy * BLOCK;
    this.setBody()
    for(var i =0; i < this.size; i++){
      board.contex.fillRect(this.body[i][0], this.body[i][1], BLOCK, BLOCK);
    }
  },
  move: function(direction) {
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
  },
};

var food = {
  x: 0,
  y: 0,
  setFood: function() {
    this.x = Math.floor((Math.random() * board.pixWidth) / BLOCK) * BLOCK;
    this.y = Math.floor((Math.random() * board.pixHeight) / BLOCK) * BLOCK;
  },
  draw: function() {
    board.contex.fillRect(this.x, this.y, BLOCK, BLOCK);
    console.log(this.x + ' ' + this.y);
  }
};

var board = {
  pixWidth: window.innerWidth - (window.innerWidth % BLOCK + BLOCK * 2),
  pixHeight: window.innerHeight - (window.innerHeight % BLOCK + BLOCK * 2),
  snake: snake,
  food: food,
  canvas: canvas,
  contex: this.canvas.getContext("2d"),
  setCanvas: function() {
    this.canvas.setAttribute("width", this.pixWidth);
    this.canvas.setAttribute("height", this.pixHeight);
  },
  clear: function() {
    this.contex.clearRect(0, 0, this.pixWidth, this.pixHeight);
  },
  border: function(x, y){
    if(x > this.pixWidth - BLOCK){
      snake.x = 0;
    }
    if(x < 0){
      snake.x = this.pixWidth;
    }
    if(y > this.pixHeight - BLOCK){
      snake.y = 0;
    }
    if(y < 0){
      snake.y = this.pixHeight;
    }
  }
};

var control = {
  currentKey:'',
  mapping: {
    39:'right',
    37:'left',
    38:'up',
    40:'down'
  },
  keyTranslator: function(e){
    var key = e.keyCode;
    control.currentKey = control.mapping[key]
  },
  main: function(){
    board.clear();
    board.border(snake.x, snake.y);
    board.snake.move(control.currentKey);
    board.snake.draw();
    board.food.draw();
    board.snake.grow();
  }
};

board.setCanvas();
food.setFood()
window.addEventListener('keydown', control.keyTranslator);
setInterval(control.main, 150);
