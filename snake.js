'use strict';


function Snake(x, y, keys) {
  this.x = x;
  this.y = y;
  this.keys = keys;
  this.dx = 0;
  this.dy = 0;
  this.body = [[]];
  this.start = function() {
    this.dx = 1;
    this.dy = 0;
  };
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
