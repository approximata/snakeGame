'use strict';

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
 this.start = function() {
   for(var i = 0; i < this.snakes.length; i++) {
     this.snakes[i].start();
   }
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
