var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.js.d.ts" />
var tuto;
(function (tuto) {
    var Ezelia;
    (function (Ezelia) {
        // Class
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                var _this = this;
                _super.call(this);
                this.click = function (eventData) {
                    if (_this.isPaused())
                        return;
                    Ezelia.ScenesManager.goToScene('menu');
                };
                //add a bunny :) 
                this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
                // center the sprites anchor point
                this.bunny.anchor.x = 0.5;
                this.bunny.anchor.y = 0.5;
                this.bunny.position.x = 50;
                this.bunny.position.y = 50;
                this.addChild(this.bunny);
                var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/MenuButton.png"));
                button.position.x = Ezelia.ScenesManager.defaultWidth - 200;
                button.scale.x = 0.5;
                button.scale.y = 0.5;
                button.on('click', this.click, this);
                button.on('tap', this.click, this);
                this.addChild(button);
                this.interactive = true;
            }
            GameScene.prototype.update = function () {
                _super.prototype.update.call(this);
                this.bunny.rotation += 0.1;
            };
            return GameScene;
        }(Ezelia.Scene));
        Ezelia.GameScene = GameScene;
    })(Ezelia = tuto.Ezelia || (tuto.Ezelia = {}));
})(tuto || (tuto = {}));
//# sourceMappingURL=GameScene.class.js.map