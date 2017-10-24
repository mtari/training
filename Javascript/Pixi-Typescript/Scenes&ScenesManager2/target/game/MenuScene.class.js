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
        var MenuScene = (function (_super) {
            __extends(MenuScene, _super);
            function MenuScene() {
                var _this = this;
                _super.call(this);
                this.onButtonDown = function (event) {
                    _this.isdown = true;
                    _this.button.texture = _this.textureButtonDown;
                    _this.button.alpha = 1;
                };
                this.onButtonUp = function (event) {
                    _this.isdown = false;
                    if (_this.isOver) {
                        _this.button.texture = _this.textureButtonOver;
                    }
                    else {
                        _this.button.texture = _this.textureButton;
                    }
                };
                this.onButtonOver = function (event) {
                    _this.isOver = true;
                    if (_this.isdown) {
                        return;
                    }
                    _this.button.texture = _this.textureButtonOver;
                };
                this.onButtonOut = function (event) {
                    _this.isOver = false;
                    if (_this.isdown) {
                        return;
                    }
                    _this.button.texture = _this.textureButton;
                };
                this.click = function (eventData) {
                    if (_this.isPaused())
                        return;
                    Ezelia.ScenesManager.goToScene('game');
                };
                // this.setBackgroundColor(0xffffff);
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
                this.button.interactive = true;
                this._registerEvents();
                this.addChild(this.button);
                this.interactive = true;
            }
            MenuScene.prototype._registerEvents = function () {
                // set the mousedown and touchstart callback..
                this.button.on('mousedown', this.onButtonDown, this);
                this.button.on('touchstart', this.onButtonDown, this);
                this.button.on('mouseup', this.onButtonUp, this);
                this.button.on('touchend', this.onButtonUp, this);
                this.button.on('mouseover', this.onButtonOver, this);
                this.button.on('mouseout', this.onButtonOut, this);
                this.button.on('click', this.click, this);
                this.button.on('tap', this.click, this);
            };
            return MenuScene;
        }(Ezelia.Scene));
        Ezelia.MenuScene = MenuScene;
    })(Ezelia = tuto.Ezelia || (tuto.Ezelia = {}));
})(tuto || (tuto = {}));
//# sourceMappingURL=MenuScene.class.js.map