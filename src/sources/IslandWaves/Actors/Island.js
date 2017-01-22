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
	island.waveSprite = waveSprite;

	randomColor = function (min, max) {
		return Math.random() * (max - min) + min
	};
	// island.tint = randomColor(0xAAAAAA << 0, 0xFFFFFF << 0);

	island.controls = controls;
	island.cooldown = false;
	island.invulnerable = false;
	island.health = 2500;
	// Physics
	game.physics.arcade.enable([island]);
	// s.body.setCircle(25);
	island.body.bounce.set(0.8);
	island.body.maxVelocity = 300;
	island.body.drag.x = 1000;
	island.body.drag.y = 1000;
	
	island.acceleration = 1200;

	island.powerUpSpeed = 1;

	//weapon
	island.weapon = WaveFactory(island, island.waveSprite);
	island.update = function () {
		this.rotation = game.physics.arcade.angleToPointer(this, this.controls.pointer)

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
		if (keyPressed(this.controls, controllerKeys.SHOOT)) {
			callback = function () {
				this.cooldown = false;
			};
			if (!this.cooldown && this.alive) {
				this.weapon.fire();
				game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity);
				game.time.events.add(this.weapon.fireRate, callback, this)
				this.cooldown = true;
			}
		}
		// Acceleration
		if (keyPressed(this.controls, controllerKeys.UP))
			this.body.acceleration.y = -this.acceleration;
		else if (keyPressed(this.controls, controllerKeys.DOWN))
			this.body.acceleration.y = this.acceleration;
		else
			this.body.acceleration.y = 0;
		if (keyPressed(this.controls, controllerKeys.LEFT))
			this.body.acceleration.x = -this.acceleration;
		else if (keyPressed(this.controls, controllerKeys.RIGHT))
			this.body.acceleration.x = this.acceleration;
		else
			this.body.acceleration.x = 0;
		
		// game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
		// game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity );
		// this.body.angularAcceleration = -400 * this.powerUpSpeed
		// this.body.angularAcceleration = 400 * this.powerUpSpeed
			
	}

	return island;
}
