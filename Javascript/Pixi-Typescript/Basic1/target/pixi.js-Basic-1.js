/// <reference path="library/pixi.js.d.ts" />
var basics;
(function (basics) {
    var Basics = (function () {
        function Basics() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.bunny.rotation += 0.1;
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("bunny.png");
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
        return Basics;
    }());
    basics.Basics = Basics;
})(basics || (basics = {}));
//# sourceMappingURL=pixi.js-Basic-1.js.map