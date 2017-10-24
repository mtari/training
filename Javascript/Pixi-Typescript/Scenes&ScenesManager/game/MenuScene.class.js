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
        var MenuScene = (function (_super) {
            __extends(MenuScene, _super);
            function MenuScene() {
                        _super.call(this);
                this.setBackgroundColor(0xffffff);
                this.textureButton = PIXI.Texture.fromImage("img/button.png");
                this.textureButtonDown = PIXI.Texture.fromImage("img/buttonDown.png");
                this.textureButtonOver = PIXI.Texture.fromImage("img/buttonOver.png");
                this.button = new PIXI.Sprite(this.textureButton);
                // Scaling and positionning
                this.button.scale.x = Ezelia.ScenesManager.defaultWidth / 400;
                this.button.scale.y = this.button.scale.x;
                this.button.anchor.x = 0.5;
                this.button.anchor.y = 0.5;
                // move the sprite to the center of the screen
                this.button.position.x = Ezelia.ScenesManager.defaultWidth / 2;
                this.button.position.y = Ezelia.ScenesManager.defaultHeight / 2;
                // make the button interactive..
                this.button.setInteractive(true);
                this._registerEvents();
                this.addChild(this.button);
                this.setInteractive(true);
            }
            MenuScene.prototype._registerEvents = function () {
                var _this = this;
                // set the mousedown and touchstart callback..
                this.button.mousedown = this.button.touchstart = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    this.isdown = true;
                    this.setTexture(_this.textureButtonDown);
                    this.alpha = 1;
                };
                // set the mouseup and touchend callback..
                this.button.mouseup = this.button.touchend = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    this.isdown = false;
                    if(this.isOver) {
                        this.setTexture(_this.textureButtonOver);
                    } else {
                        this.setTexture(_this.textureButton);
                    }
                };
                // set the mouseover callback..
                this.button.mouseover = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    this.isOver = true;
                    if(this.isdown) {
                        return;
                    }
                    this.setTexture(_this.textureButtonOver);
                };
                // set the mouseout callback..
                this.button.mouseout = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    this.isOver = false;
                    if(this.isdown) {
                        return;
                    }
                    this.setTexture(_this.textureButton);
                };
                this.button.click = this.button.tap = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    Ezelia.ScenesManager.goToScene('game');
                };
            };
            return MenuScene;
        })(Ezelia.Scene);
        Ezelia.MenuScene = MenuScene;        
    })(tuto.Ezelia || (tuto.Ezelia = {}));
    var Ezelia = tuto.Ezelia;
})(tuto || (tuto = {}));
//@ sourceMappingURL=MenuScene.class.js.map
