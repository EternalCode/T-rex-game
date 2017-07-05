var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start
var SCROLL_SPEED = 7;

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
		game_floor_tiles.push(new GameFloorTile(i, getRandomIntInclusive(0, (GROUND_IMAGE_LEN/GROUND_TILE_LEN)-1)));

	}
}

