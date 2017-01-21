/*
 * Creates an island.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */
IslandFactory = function (group, x, y, sprite, controls) {
	s = group.create(x, y, sprite);
	s.anchor.set(0.5);

	randomColor = function (min, max) {
		return Math.random() * (max - min) + min
	};
	s.tint = randomColor(0x888888 << 0, 0xFFFFFF << 0);

	s.controls = controls

	s.keyPressed = function (key) {
		for (i in key)
			if (game.input.keyboard.isDown(key[i]))
				return true;
		return false;
	}

	// Physics
	game.physics.arcade.enable([s]);
	// s.body.setCircle(25);
	s.body.bounce.set(0.8);
	s.body.maxVelocity = 300;
	s.acceleration = 1200;

	s.update = function () {
		s.rotation = game.physics.arcade.angleToPointer(s)
		if (game.input.mousePointer.isDown) {
			game.physics.arcade.moveToPointer(s, 400);
		}
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

	return s;
}
