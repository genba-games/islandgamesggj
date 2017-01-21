/*
 * Creates an island.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */
Island = function (group, x, y, sprite, controls) {
	s = group.create(x, y, sprite);
	randomColor = function(min, max){
		return Math.random() * (max - min) + min
	};
	s.tint = randomColor(0x888888 << 0 ,0xFFFFFF << 0);
	s.anchor.set(0.5);
	
	s.controls = controls

	s.keyPressed = function (key) {
		for (i in key)
			if (game.input.keyboard.isDown(key[i]))
				return true;
		return false;
	}

	// Physics
	game.physics.arcade.enable([s]);
	s.body.setCircle(25);
	s.body.bounce.set(0.8);
	s.body.maxVelocity = 200
	s.acceleration=75

	s.update = function () {
		if (this.controls == undefined) return;
		elapsed = this.game.time.elapsed * 0.001;
		va = true;

		/// Input
		// Acceleration
		if (this.keyPressed(this.controls.up))
			this.body.velocity.y -= this.acceleration * elapsed;
		else if (this.keyPressed(this.controls.down))
			this.body.velocity.y += this.acceleration * elapsed;
		if (this.keyPressed(this.controls.left))
			this.body.velocity.x -= this.acceleration * elapsed;
		else if (this.keyPressed(this.controls.right))
			this.body.velocity.x += this.acceleration * elapsed;
		else
			va = false;

		/// Update
		// Translation
		// this.position.y += this.velocity.x * elapsed;
		// this.position.x += this.velocity.y * elapsed;

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
	}

	return s
}