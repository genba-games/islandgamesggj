/*
 * Creates an island.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */
IslandFactory = function (group, x, y, sprite, waveSprite, controls, bullets) {
	island = group.create(x, y, sprite);
	island.anchor.set(0.5);
	island.waveSprite = waveSprite

	randomColor = function (min, max) {
		return Math.random() * (max - min) + min
	};
	island.tint = randomColor(0x888888 << 0, 0xFFFFFF << 0);
	island.controls = controls

	island.keyPressed = function (key) {
		for (i in key)
			if (game.input.keyboard.isDown(key[i]))
				return true;
		return false;
	}

	// Physics
	game.physics.arcade.enable([island]);
	// s.body.setCircle(25);
	island.body.bounce.set(0.8);
	island.body.maxVelocity = 300;
	island.body.drag.x = 1000
	island.body.drag.y = 1000
	
	island.acceleration = 1200;

	//weapon
	island.weapon = WaveFactory(island, island.waveSprite)
	island.update = function () {
		this.rotation = game.physics.arcade.angleToPointer(this)
		
		/// Boundaries
		// Width
		if (this.position.x > game.width + this.width / 2)
			this.position.x = -this.width / 2 + 1;
		else if (this.position.x < -this.width / 2)
			this.position.x = game.width + this.width / 2 - 1;
		// Height
		if (this.position.y > game.height + this.height / 2)
			this.position.y = -this.height / 2 + 1;
		else if (this.position.y < -this.height / 2)
			this.position.y = game.height + this.height / 2 - 1;

		/// Input
		if (this.controls == undefined) return;
		if (this.keyPressed(this.controls.shoot)) {
			this.weapon.fire();
			game.physics.arcade.moveToPointer(this,-300)
		}
		// Acceleration
		if (this.keyPressed(this.controls.up))
			this.body.acceleration.y = -this.acceleration;
		else if (this.keyPressed(this.controls.down))
			this.body.acceleration.y = this.acceleration;
		else
			this.body.acceleration.y = 0;
		if (this.keyPressed(this.controls.left))
			this.body.acceleration.x = -this.acceleration;
		else if (this.keyPressed(this.controls.right))
			this.body.acceleration.x = this.acceleration;
		else
			this.body.acceleration.x = 0;
	}

	return island;
}
