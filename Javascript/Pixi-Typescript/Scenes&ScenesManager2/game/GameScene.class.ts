///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.js.d.ts" />
module tuto.Ezelia {
    // Class
    export class GameScene extends Scene {
        
        private bunny: PIXI.Sprite;

        constructor() {
            super();

            //add a bunny :) 
            this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
            // center the sprites anchor point
            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 0.5;            
            this.bunny.position.x = 50;
            this.bunny.position.y = 50;
            this.addChild(this.bunny);

            var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/MenuButton.png"));
            button.position.x = ScenesManager.defaultWidth - 200;
            button.scale.x = 0.5;
            button.scale.y = 0.5;

            button.on('click', this.click, this);
            button.on('tap', this.click, this);

            this.addChild(button);
            
            this.interactive = true;
        }

        public update() {
            super.update();
            this.bunny.rotation += 0.1;
        }

        private click = (eventData: PIXI.interaction.InteractionData): void => {
            if (this.isPaused()) return;
            ScenesManager.goToScene('menu');
        }
    }

}
