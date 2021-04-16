enchant();


window.onload = function() {
	
	var core = new Core(320, 320);
	core.preload(['niko.png','bg.png','enemy.png','end.png','graphic.png']);
	core.fps = 15;
	core.onload = function() {
		
		var background = new Sprite(1320, 320); 
		background.image = core.assets['bg.png']; 
     background.moveTo(-320, 0);
    background.onenterframe = function() {
            // スクロール
            this.x += 2;
            // 端まで行ったら戻す
						
            if (this.x >= 0) {
                background.moveTo(-320, 0);
            }
        };
		
		core.rootScene.addChild(background);
		
		var niko = new Sprite(32, 32);
		niko.image = core.assets['niko.png'];
		niko.x = 280;
		niko.y = 160;
		niko.frame = 0;
	
		niko.addEventListener('enterframe', function() {
				if (core.input.up) this.y -= 5;
				if (core.input.down) this.y += 5;
				
				// within
				if (this.within(Enemy, 10)) {

					core.pushScene(gameOverScene);
					core.stop();		
				}
		
				
		});
		core.rootScene.addChild(niko);
		
		core.rootScene.on('touchstart', function(e) {
			 niko.y = e.y;
				});
    core.rootScene.addEventListener('touchmove', function(e){
            niko.y = e.y;
        });

		var gameOverScene = new Scene(); 
		
		var end = new Sprite(320, 320); 
		end.image = core.assets['end.png']; 
		gameOverScene.addChild(end);

		
/*
		var enemy = new Sprite(16, 16);
		enemy.image = core.assets['enemy.gif'];
		enemy.x = 0;
		enemy.y = 0;
		enemy.addEventListener('enterframe', function() {
			this.x += 5;
			if (this.x > 320) this.x = 0;
		});

		core.rootScene.addChild(enemy);
*/

		var Enemy = Class.create(Sprite, {
			initialize: function(x, y) {
			 Sprite.call(this, 32, 32);
			 this.x = x;
			 this.y = y;
 			 this.image = core.assets['enemy.png'];
			 
			 this.tl.moveTo(rand(-320), rand(320), 0);
			 
			 this.on('enterframe', function() {
				this.x += 5;
				if (this.x > 320) this.x = 0;
				
			 });
			 
			 this.addEventListener('enterframe', function(e) {
        if(this.within(niko)){ 
            core.pushScene(gameOverScene);
					core.stop();
        }
    });
			 
			 core.rootScene.addChild(this);
		}
	});
		
		var enemys = [];
		for (var i = 0; i < 15; i++) {
			enemys[i] = new Enemy(rand(-320), rand(-320));
	
		}
	}
	core.start();

};

function rand(n) {
	return Math.floor(Math.random() * (n+1));
}