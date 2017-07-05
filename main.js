var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start
var SCROLL_SPEED = 7;
var prev_tile_num = 0;

/* Image assets need to be preloaded for use on ready*/
var ground_tiles = new Image();
ground_tiles.src = "imgs/ground_tiles.png";
var game_floor_tiles = [];
var GROUND_TILE_LEN = 28;
var GROUND_IMAGE_LEN = 588;

$(document).ready( function() {
	init_game();
});


function init_game() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	canvas.width = 840;
	canvas.height = 400;

	// initialize ground layers based on screen size + 1 tile
	for (var i = 0; i < ((GAME_WIDTH / GROUND_TILE_LEN) + 1); i++) {
		game_floor_tiles.push(new GameFloorTile(i, getRandomIntInclusive(0, (GROUND_IMAGE_LEN / GROUND_TILE_LEN) - 1)));
	}
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

	if (Math.floor(GAME_POSITION / GROUND_TILE_LEN) > prev_tile_num) {
		prev_tile_num = Math.floor(GAME_POSITION / GROUND_TILE_LEN);
		game_floor_tiles.splice(GAME_POSITION % GROUND_TILE_LEN, 1);
		game_floor_tiles.push(new GameFloorTile (
												game_floor_tiles[game_floor_tiles.length - 1].index + 1,
												getRandomIntInclusive(0, (GROUND_IMAGE_LEN / GROUND_TILE_LEN) - 1)));
	}

	// draw
	for (var i = 0; i < game_floor_tiles.length; i++) {
		game_floor_tiles[i].draw(context, canvas);
	}
	context.restore();
	requestAnimationFrame(GameScrolling);
}


function GameFloorTile (index, tile) {
	this.index = index;
	this.tile = tile;


	this.draw = function(context, canvas) {
		context.drawImage(
		ground_tiles,
		this.tile * GROUND_TILE_LEN,
		0,
		GROUND_TILE_LEN,
		GROUND_TILE_LEN,
		this.index * GROUND_TILE_LEN,
		canvas.height - GROUND_TILE_LEN,
		GROUND_TILE_LEN,
		GROUND_TILE_LEN);
	}
}

