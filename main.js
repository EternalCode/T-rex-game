var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start -> also player's position
var SCROLL_SPEED = 7;
var prev_tile_num = 0;

var trex;
var game_over = false;

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
	obstacles_init();
	trex = new Player();

	document.body.addEventListener("keydown", ekey_down);
	document.body.addEventListener("keydown", game_restart);
	document.body.addEventListener("keyup", ekey_up);

	game_scrolling();
}

	
function game_scrolling() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	GAME_POSITION += SCROLL_SPEED;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#FFF4D8";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();
	context.translate(-GAME_POSITION, 0);
	// update
	ground_tiles_update();
	clouds_update();
	trex.update();
	game_over = obstacles_update();

	// draw
	ground_tiles_draw(context, canvas);
	clouds_draw(context);
	obstacles_draw(context);
	trex.draw(context);

	context.restore();
	if (game_over) {
		// text score draw
		context.fillStyle = "#545659";
		context.font = "50px Roboto Mono";
		var font_len = context.measureText("Game Over!").width
		context.fillText("Game Over!", canvas.width/2 - (font_len / 2), 90);

		context.fillStyle = "#545659";
		context.font = "20px Roboto Mono";
		font_len = context.measureText("Score: " + GAME_POSITION).width
		context.fillText("Score: " + (GAME_POSITION - GAME_WIDTH), canvas.width/2 - (font_len / 2), 180);

		context.fillStyle = "#545659";
		context.font = "25px Roboto Mono";
		font_len = context.measureText("SPACE to restart").width
		context.fillText("SPACE to restart", canvas.width/2 - (font_len / 2), 240);
	} else {
		requestAnimationFrame(game_scrolling);
	}
}


function game_restart(event) {
	if ((event.keyCode == 32) && (game_over)) {
		obstacles = [];
		clouds = [];
		game_floor_tiles = [];
		GAME_POSITION = 0;
		prev_tile_num = 0;
		init_game();
		game_over = false;
	}
}
