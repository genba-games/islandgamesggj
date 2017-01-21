/*
 * Creates an island.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for island. Anchor is automatically set to the middle.
 */
Island = function (group, x, y, sprite)
	{
		s = group.create(x, y, sprite);
		s.anchor.set(0.5);

		s.controls = 
		{
			'up' : 
			[
				Phaser.Keyboard.W,
				Phaser.Keyboard.UP
			],
			'down' : 
			[
				Phaser.Keyboard.S,
				Phaser.Keyboard.DOWN
			],
			'left' : 
			[
				Phaser.Keyboard.A,
				Phaser.Keyboard.LEFT
			],
			'right' : 
			[
				Phaser.Keyboard.D,
				Phaser.Keyboard.RIGHT
			],
		};
		
		s.velocity = 
		{
			'acceleration' : 700,
			'max' : 500,
			'x': 0,
			'y': 0,
			'drag':
			{
				'base' : 300,
				'percentage' : 0.1
			}
		};

		s.keyPressed = function(key)
		{
			for (i in key)
				if (game.input.keyboard.isDown(key[i]))
					return true;
			return false;
		}

		s.update = function()
		{
			elapsed = this.game.time.elapsed * 0.001;
			va = true;

	        /// Velocity Limits
	        sign = this.velocity.magnitude > 0 ? 1 : 0;
	        if (Math.abs(this.velocity.magnitude) > this.velocity.max)
	            this.velocity.magnitude = sign * this.velocity.max;

			/// Input
	        // Acceleration
	        if (this.keyPressed(this.controls.up))
	            this.velocity.x -= this.velocity.acceleration * elapsed;
	        else if (this.keyPressed(this.controls.down))
	            this.velocity.x += this.velocity.acceleration * elapsed;
			if (this.keyPressed(this.controls.left))
	            this.velocity.y -= this.velocity.acceleration * elapsed;
	        else if (this.keyPressed(this.controls.right))
	            this.velocity.y += this.velocity.acceleration * elapsed;
	        else
	        	va = false;

	        /// Update
	        // Translation
	        this.position.y += this.velocity.x * elapsed;
	        this.position.x += this.velocity.y * elapsed;

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