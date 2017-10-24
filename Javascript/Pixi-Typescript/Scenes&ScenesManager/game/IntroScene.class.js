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
        var IntroScene = (function (_super) {
            __extends(IntroScene, _super);
            function IntroScene() {
                        _super.call(this);
                this.setBackgroundColor(0xffffff);
                this.logo = PIXI.Sprite.fromImage("img/logo.png");
                this.addChild(this.logo);
                this.logo.scale.x = Ezelia.ScenesManager.defaultWidth / 230;
                this.logo.scale.y = this.logo.scale.x;
                this.logo.anchor.x = 0.5;
                this.logo.anchor.y = 0.5;
                this.logo.alpha = 0;
                // move the sprite to the center of the screen
                this.logo.position.x = Ezelia.ScenesManager.defaultWidth / 2;
                this.logo.position.y = Ezelia.ScenesManager.defaultHeight / 2;
            }
            IntroScene.prototype.update = function () {
                _super.prototype.update.call(this);
                if(this.logo.alpha < 1) {
                    this.logo.alpha += 0.01;
                } else {
                    Ezelia.ScenesManager.goToScene('menu');
                }
            };
            return IntroScene;
        })(Ezelia.Scene);
        Ezelia.IntroScene = IntroScene;        
    })(tuto.Ezelia || (tuto.Ezelia = {}));
    var Ezelia = tuto.Ezelia;
})(tuto || (tuto = {}));
//@ sourceMappingURL=IntroScene.class.js.map
