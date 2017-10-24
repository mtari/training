//file ScenesManager.class.ts

///<reference path="../lib/pixi.js.d.ts" />
///<reference path="Scene.class.ts" />

// Module
module tuto.Ezelia {


    export class ScenesManager {
        private static scenes: any = {}; // should be hashmap but a JS object is fine too :)
        public static currentScene: Scene;
        public static renderer: PIXI.SystemRenderer;

        public static ratio:number = 1;
        public static defaultWidth: number;
        public static defaultHeight: number;
        public static width: number;
        public static height: number;
        public static create(width: number, height: number, scale:boolean=false) {
            if (ScenesManager.renderer) return this;
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
        }
        private static _rescale() {
            ScenesManager.ratio = Math.min(window.innerWidth / ScenesManager.defaultWidth, window.innerHeight / ScenesManager.defaultHeight)
            ScenesManager.width = ScenesManager.defaultWidth * ScenesManager.ratio;
            ScenesManager.height = ScenesManager.defaultHeight * ScenesManager.ratio;
            ScenesManager.renderer.resize(ScenesManager.width, ScenesManager.height);
        }
        private static _applyRatio(displayObj: PIXI.DisplayObject, ratio: number) {
            if (ratio == 1) return;
            var object: any = displayObj;
            object.position.x = object.position.x * ratio;
            object.position.y = object.position.y * ratio;
            object.scale.x = object.scale.x * ratio;
            object.scale.y = object.scale.y * ratio;
            
            for (var i = 0; i < object.children.length; i++) {
                ScenesManager._applyRatio(object.children[i], ratio);
            }
        }
        private static loop() {
            requestAnimationFrame(function () { ScenesManager.loop() });

            if (!ScenesManager.currentScene || ScenesManager.currentScene.isPaused()) return;
            
            ScenesManager.currentScene.update();
            
            ScenesManager._applyRatio(ScenesManager.currentScene, ScenesManager.ratio);
            ScenesManager.renderer.render(ScenesManager.currentScene);
            ScenesManager._applyRatio(ScenesManager.currentScene, 1 / ScenesManager.ratio);

        }
        

        public static createScene(id: string, TScene: new () => Scene = Scene): Scene {
            if (ScenesManager.scenes[id]) return undefined;

            var scene = new TScene();

            ScenesManager.scenes[id] = scene;

            return scene;
        }

        public static goToScene(id: string): boolean {
            
            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene) ScenesManager.currentScene.pause();
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.resume();
                return true;
            }
            return false;
        }
    }


}

