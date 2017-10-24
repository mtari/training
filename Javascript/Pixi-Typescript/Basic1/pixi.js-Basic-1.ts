/// <reference path="library/pixi.js.d.ts" />
module basics {

    export class Basics {

        private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

        private stage: PIXI.Container;

        private bunny: PIXI.Sprite;

        constructor() {

            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);

            // create the root of the scene graph
            this.stage = new PIXI.Container();

            // create a texture from an image path
            var texture: PIXI.Texture = PIXI.Texture.fromImage("bunny.png");

            // create a new Sprite using the texture
            this.bunny = new PIXI.Sprite(texture);

            // center the sprite's anchor point
            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 0.5;

            // move the sprite to the center of the screen
            this.bunny.position.x = 200;
            this.bunny.position.y = 150;

            //add it to the stage
            this.stage.addChild(this.bunny);

            this.animate();

        }

        private animate = (): void => {

            requestAnimationFrame(this.animate);

            this.bunny.rotation += 0.1;

            this.renderer.render(this.stage);

        }

    }

}