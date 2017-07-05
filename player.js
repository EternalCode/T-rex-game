function Player() {
	this.x = GAME_POSITION;
	this.y = 400 - 44 - (28 / 2);
	this.state = 0;

	this.update = function() {
		this.x = GAME_POSITION + 20;
	}

	this.draw = function(context) {
		context.drawImage(
			player,
			this.state * 40,
			0,
			40,
			44,
			this.x,
			this.y,
			40,
			44);
	}
}