'use strict';

var canvas = document.querySelector('.snakeCanvas');
var check = document.querySelector('input[type=checkbox]');
var start = document.querySelector('.start');
var BLOCK = 15;
var SPEED = 80;
canvas.width = window.innerWidth - (window.innerWidth % BLOCK + BLOCK * 2);
canvas.height = window.innerHeight - (window.innerHeight % BLOCK + BLOCK * 2);
var contex = canvas.getContext("2d");
var isRun = false;
