'use strict';
var width = 500;
var height = 500;
var c = document.querySelector('.snakeCanvas');
var ctx = c.getContext("2d");
c.setAttribute("width", width);
c.setAttribute("height", height);

var snake = {
  x: 0,
  y: 0,
  headSize: 35,

  draw: function() {
    ctx.fillRect(this.x, this.y, this.headSize, this.headSize);
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
  }
};

var mapping = {
  39:'right',
  37:'left',
  38:'up',
  40:'down'
}

function keyListener(e){
  var x = e.keyCode;
  console.log(x);
  console.log(mapping[x]);
  return currentKey = mapping[x];
}

var currentKey = '';

function border(x, y){
  console.log(x, + ' ' + y);
  if(x > width){
     x = 0
  }
  if(x < 0){
    console.log('restart');
     x = width
     console.log(x);
  }
  if(y > height){
     y = 0
  }
  if(y < 0){
     y = height
  }
}

function controll(){
  ctx.clearRect(0, 0, width, height);
  border(snake.x, snake.y);
  snake.move(currentKey, 1);
  snake.draw();
}

window.addEventListener('keydown', keyListener);
setInterval(controll, 20);
