//file : Scene.class.ts
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../lib/pixi.js.d.ts" />
// Module
var tuto;
(function (tuto) {
    var Ezelia;
    (function (Ezelia) {
        // Class
        var Scene = (function (_super) {
            __extends(Scene, _super);
            function Scene() {
                _super.call(this);
                this.paused = false;
                this.updateCB = function () { };
            }
            Scene.prototype.onUpdate = function (updateCB) {
                this.updateCB = updateCB;
            };
            Scene.prototype.update = function () {
                this.updateCB();
            };
            Scene.prototype.pause = function () {
                this.paused = true;
            };
            Scene.prototype.resume = function () {
                this.paused = false;
            };
            Scene.prototype.isPaused = function () {
                return this.paused;
            };
            return Scene;
        }(PIXI.Container));
        Ezelia.Scene = Scene;
    })(Ezelia = tuto.Ezelia || (tuto.Ezelia = {}));
})(tuto || (tuto = {}));
//# sourceMappingURL=Scene.class.js.map