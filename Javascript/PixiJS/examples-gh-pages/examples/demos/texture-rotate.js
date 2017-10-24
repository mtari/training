var renderer = new PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var bol = false;

// create a texture from an image path

PIXI.loader.add('flowerTop', '_assets/flowerTop.png');
PIXI.loader.load(function(loader, resources) {
    texture = resources.flowerTop.texture;
    init();
});
var texture;

function init() {
// create rotated textures
    var textures = [texture];
    var D8 = PIXI.GroupD8;
    for (var rotate = 1; rotate < 16; rotate++) {
        var h = D8.isSwapWidthHeight(rotate) ? texture.frame.width : texture.frame.height;
        var w = D8.isSwapWidthHeight(rotate) ? texture.frame.height : texture.frame.width;

      	var frame = texture.frame;
        var crop = new PIXI.Rectangle(texture.frame.x, texture.frame.y, w, h);
        var trim = crop;
        if (rotate%2==0) {
        	var rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate);
        } else {
            //HACK to avoid exception
			//PIXI doesnt like diamond-shaped UVs, because they are different in canvas and webgl
          	var rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate-1);
          	rotatedTexture.rotate++;
        }
        textures.push(rotatedTexture);
    }

    var offsetX = renderer.width / 16 | 0;
    var offsetY = renderer.height / 8 | 0;
    var gridW = renderer.width / 4 | 0;
    var gridH = renderer.height / 5 | 0;

    //normal rotations and mirrors
    for (var i = 0; i < 16; i++) {
        // create a new Sprite using rotated texture
        var dude = new PIXI.Sprite(textures[i < 8 ? i*2 : (i-8)*2+1]);
        dude.scale.x = 0.5;
        dude.scale.y = 0.5;
        // show it in grid
        dude.position.x = offsetX + gridW * (i % 4);
        dude.position.y = offsetY + gridH * (i / 4 | 0);
        stage.addChild(dude);
        var text = new PIXI.Text("rotate = "+dude.texture.rotate, { font: '12px Courier New', fill: 'white', align: 'left' });
        text.position.x = dude.position.x;
        text.position.y = dude.position.y - 20;
        stage.addChild(text);
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);

    // render the stage
    renderer.render(stage);
}
