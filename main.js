var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start
var SCROLL_SPEED = 7;
var prev_tile_num = 0;

$(document).ready( function() {
	init_game();
});


function init_game() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	canvas.width = 840;
	canvas.height = 400;

	ground_init_tiles();
	GameScrolling();
}

	
function GameScrolling() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	GAME_POSITION += SCROLL_SPEED;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#FCFFE0";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();
	context.translate(-GAME_POSITION, 0);

	ground_tiles_update();

	// draw
	ground_tiles_draw(context, canvas);
	context.restore();
	requestAnimationFrame(GameScrolling);
}



