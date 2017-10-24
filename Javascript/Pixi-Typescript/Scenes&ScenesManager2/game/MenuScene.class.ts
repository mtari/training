///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.js.d.ts" />
module tuto.Ezelia {
    // Class
    export class MenuScene extends Scene {

        private button: PIXI.Sprite;

        private textureButton: PIXI.Texture;
        private textureButtonDown: PIXI.Texture;
        private textureButtonOver: PIXI.Texture;

        isdown: boolean;
        isOver: boolean;

        constructor() {
            super();
            // this.setBackgroundColor(0xffffff);

            this.textureButton = PIXI.Texture.fromImage("img/button.png");
            this.textureButtonDown = PIXI.Texture.fromImage("img/buttonDown.png");
            this.textureButtonOver = PIXI.Texture.fromImage("img/buttonOver.png");

            this.button = new PIXI.Sprite(this.textureButton);
            // Scaling and positionning 
            this.button.scale.x = ScenesManager.defaultWidth / 400;
            this.button.scale.y = this.button.scale.x;

            this.button.anchor.x = 0.5;
            this.button.anchor.y = 0.5;
            
            // move the sprite to the center of the screen
            this.button.position.x = ScenesManager.defaultWidth / 2;
            this.button.position.y = ScenesManager.defaultHeight / 2;
    
            // make the button interactive..
            this.button.interactive = true;

            this._registerEvents();


            this.addChild(this.button);

            this.interactive = true;
        }

        private _registerEvents() {
            // set the mousedown and touchstart callback..
            this.button.on('mousedown', this.onButtonDown, this);
            this.button.on('touchstart', this.onButtonDown, this);

            this.button.on('mouseup', this.onButtonUp, this);
            this.button.on('touchend', this.onButtonUp, this);

            this.button.on('mouseover', this.onButtonOver, this);

            this.button.on('mouseout', this.onButtonOut, this);

            this.button.on('click', this.click, this);
            this.button.on('tap', this.click, this);
        }

         private onButtonDown = (event: PIXI.interaction.InteractionEvent): void => {

            this.isdown = true;
            this.button.texture = this.textureButtonDown;
            this.button.alpha = 1;

        }

        private onButtonUp = (event: PIXI.interaction.InteractionEvent): void => {

            this.isdown = false;

            if (this.isOver) {
                this.button.texture = this.textureButtonOver;
            }
            else {
                this.button.texture = this.textureButton;
            }
        }

        private onButtonOver = (event: PIXI.interaction.InteractionEvent): void => {

            this.isOver = true;

            if (this.isdown) {
                return;
            }

            this.button.texture = this.textureButtonOver;

        }

        private onButtonOut = (event: PIXI.interaction.InteractionEvent): void => {

            this.isOver = false;

            if (this.isdown) {
                return;
            }

            this.button.texture = this.textureButton;
        }


        private click = (eventData: PIXI.interaction.InteractionData): void => {
            if (this.isPaused()) return;
            ScenesManager.goToScene('game');
        }
    }

}
