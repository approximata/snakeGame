'use strict';

var board = {
  width: 500,
  height: 500,
}

var c = document.querySelector('.snakeCanvas');
var ctx = c.getContext("2d");
c.setAttribute("width", board.width);
c.setAttribute("height", board.height);

var snake = {
  x: 0,
  y: 0,
  headSize: 35,

  draw: function() {
    ctx.fillRect(this.x, this.y, this.headSize, this.headSize);
  },

  setX: function(x) {
    return this.x = x
  },

  setY: function(y) {
    return this.y = y
  },

  move: function(direction, speed) {
    if(direction == 'right') {
      this.x += 1 * speed;
    }
    else if (direction == 'left') {
      this.x -= 1 * speed;
    }
    else if (direction == 'down') {
      this.y += 1 * speed;
    }
    else if (direction == 'up') {
      this.y -= 1 * speed;
    }
  },

  borderHandling: function(x, y){
    if(x > board.width){
      this.x = 0;
    }
    if(x < 0){
      this.x = board.width
    }
    if(y > board.height){
      this.y = 0;
    }
    if(y < 0){
      this.y = board.height;
    }
  }
};

var control = {
  currentKey:'z',
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
    ctx.clearRect(0, 0, board.width, board.height);
    snake.borderHandling(snake.x, snake.y);
    snake.move(control.currentKey, 1);
    snake.draw();
  }
}

window.addEventListener('keydown', control.keyTranslator);
setInterval(control.main, 20);
