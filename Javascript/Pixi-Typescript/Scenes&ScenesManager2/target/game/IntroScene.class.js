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
        var IntroScene = (function (_super) {
            __extends(IntroScene, _super);
            function IntroScene() {
                _super.call(this);
                // this.setBackgroundColor(0xffffff);
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
                if (this.logo.alpha < 1)
                    this.logo.alpha += 0.01;
                else
                    Ezelia.ScenesManager.goToScene('menu');
            };
            return IntroScene;
        }(Ezelia.Scene));
        Ezelia.IntroScene = IntroScene;
    })(Ezelia = tuto.Ezelia || (tuto.Ezelia = {}));
})(tuto || (tuto = {}));
//# sourceMappingURL=IntroScene.class.js.map