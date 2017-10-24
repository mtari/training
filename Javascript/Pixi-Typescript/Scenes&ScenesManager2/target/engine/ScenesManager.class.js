//file ScenesManager.class.ts
///<reference path="../lib/pixi.js.d.ts" />
///<reference path="Scene.class.ts" />
// Module
var tuto;
(function (tuto) {
    var Ezelia;
    (function (Ezelia) {
        var ScenesManager = (function () {
            function ScenesManager() {
            }
            ScenesManager.create = function (width, height, scale) {
                if (scale === void 0) { scale = false; }
                if (ScenesManager.renderer)
                    return this;
                this.defaultWidth = ScenesManager.width = width;
                this.defaultHeight = ScenesManager.height = height;
                ScenesManager.renderer = PIXI.autoDetectRenderer(ScenesManager.width, ScenesManager.height);
                document.body.appendChild(ScenesManager.renderer.view);
                if (scale) {
                    ScenesManager._rescale();
                    window.addEventListener('resize', ScenesManager._rescale, false);
                }
                requestAnimationFrame(ScenesManager.loop);
                return this;
            };
            ScenesManager._rescale = function () {
                ScenesManager.ratio = Math.min(window.innerWidth / ScenesManager.defaultWidth, window.innerHeight / ScenesManager.defaultHeight);
                ScenesManager.width = ScenesManager.defaultWidth * ScenesManager.ratio;
                ScenesManager.height = ScenesManager.defaultHeight * ScenesManager.ratio;
                ScenesManager.renderer.resize(ScenesManager.width, ScenesManager.height);
            };
            ScenesManager._applyRatio = function (displayObj, ratio) {
                if (ratio == 1)
                    return;
                var object = displayObj;
                object.position.x = object.position.x * ratio;
                object.position.y = object.position.y * ratio;
                object.scale.x = object.scale.x * ratio;
                object.scale.y = object.scale.y * ratio;
                for (var i = 0; i < object.children.length; i++) {
                    ScenesManager._applyRatio(object.children[i], ratio);
                }
            };
            ScenesManager.loop = function () {
                requestAnimationFrame(function () { ScenesManager.loop(); });
                if (!ScenesManager.currentScene || ScenesManager.currentScene.isPaused())
                    return;
                ScenesManager.currentScene.update();
                ScenesManager._applyRatio(ScenesManager.currentScene, ScenesManager.ratio);
                ScenesManager.renderer.render(ScenesManager.currentScene);
                ScenesManager._applyRatio(ScenesManager.currentScene, 1 / ScenesManager.ratio);
            };
            ScenesManager.createScene = function (id, TScene) {
                if (TScene === void 0) { TScene = Ezelia.Scene; }
                if (ScenesManager.scenes[id])
                    return undefined;
                var scene = new TScene();
                ScenesManager.scenes[id] = scene;
                return scene;
            };
            ScenesManager.goToScene = function (id) {
                if (ScenesManager.scenes[id]) {
                    if (ScenesManager.currentScene)
                        ScenesManager.currentScene.pause();
                    ScenesManager.currentScene = ScenesManager.scenes[id];
                    ScenesManager.currentScene.resume();
                    return true;
                }
                return false;
            };
            ScenesManager.scenes = {}; // should be hashmap but a JS object is fine too :)
            ScenesManager.ratio = 1;
            return ScenesManager;
        }());
        Ezelia.ScenesManager = ScenesManager;
    })(Ezelia = tuto.Ezelia || (tuto.Ezelia = {}));
})(tuto || (tuto = {}));
//# sourceMappingURL=ScenesManager.class.js.map