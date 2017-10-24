var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var tuto;
(function (tuto) {
    ///<reference path="../engine/ScenesManager.class.ts" />
    ///<reference path="../engine/Scene.class.ts" />
    ///<reference path="../lib/pixi.d.ts" />
    (function (Ezelia) {
        // Class
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                        _super.call(this);
                //add a bunny :)
                this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
                // center the sprites anchor point
                this.bunny.anchor.x = 0.5;
                this.bunny.anchor.y = 0.5;
                this.bunny.position.x = 50;
                this.bunny.position.y = 50;
                this.addChild(this.bunny);
                var _this = this;
                var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/MenuButton.png"));
                button.position.x = Ezelia.ScenesManager.defaultWidth - 200;
                button.scale.x = 0.5;
                button.scale.y = 0.5;
                button.click = button.tap = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    Ezelia.ScenesManager.goToScene('menu');
                };
                button.setInteractive(true);
                this.addChild(button);
                this.setInteractive(true);
            }
            GameScene.prototype.update = function () {
                _super.prototype.update.call(this);
                this.bunny.rotation += 0.1;
            };
            return GameScene;
        })(Ezelia.Scene);
        Ezelia.GameScene = GameScene;        
    })(tuto.Ezelia || (tuto.Ezelia = {}));
    var Ezelia = tuto.Ezelia;
})(tuto || (tuto = {}));
//@ sourceMappingURL=GameScene.class.js.map
