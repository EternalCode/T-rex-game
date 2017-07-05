var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start -> also player's position
var SCROLL_SPEED = 7;
var prev_tile_num = 0;

var trex;

$(document).ready( function() {
	init_game();
});


function init_game() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	canvas.width = 840;
	canvas.height = 400;

	ground_init_tiles();
	clouds_init();
	trex = new Player();

	document.body.addEventListener("keydown", ekey_down);
	document.body.addEventListener("keyup", ekey_up);
	
	GameScrolling();
}

	
function GameScrolling() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	GAME_POSITION += SCROLL_SPEED;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#FFF4D8";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();
	context.translate(-GAME_POSITION, 0);
	//context.globalCompositeOperation='destination-over';
	// update
	ground_tiles_update();
	clouds_update();
	trex.update();

	// draw
	ground_tiles_draw(context, canvas);
	clouds_draw(context);
	trex.draw(context);
	

	context.restore();
	requestAnimationFrame(GameScrolling);
}




/*
context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

img	Source image object	Sprite sheet
sx	Source x	Frame index times frame width
sy	Source y	0
sw	Source width	Frame width
sh	Source height	Frame height
dx	Destination x	0
dy	Destination y	0
dw	Destination width	Frame width
dh	Destination height	Frame height


*/