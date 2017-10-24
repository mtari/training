(function Main()
{
    var   b2Vec2 = box2d.b2Vec2
        ,  b2AABB = box2d.b2AABB
        ,	b2BodyDef = box2d.b2BodyDef
        ,	b2Body = box2d.b2Body
        ,	b2FixtureDef = box2d.b2FixtureDef
        ,	b2Fixture = box2d.b2Fixture
        ,	b2World = box2d.b2World
        ,	b2MassData = box2d.b2MassData
        ,	b2PolygonShape = box2d.b2PolygonShape
        ,	b2CircleShape = box2d.b2CircleShape
        ,	b2DebugDraw = box2d.b2DebugDraw
        ,  b2MouseJointDef =  box2d.b2MouseJointDef
        ;


    const STAGE_WIDTH = 1024, STAGE_HEIGHT = 579;
    const METER = 100;
    const BOTTLE_SCALE = 0.6;

    const TICK = 1.0/60;
    const THROW_IMPULSE_MIN = 3, THROW_IMPULSE_MAX = 10, THROW_IMPULSE_SPEED = 5;
    const THROW_ANGLE_MIN = -Math.PI, THROW_ANGLE_MAX = 0, THROW_ANGLE_SPEED = Math.PI/2;

    var bodies = [];
    var stage, renderer;
    var world, mouseJoint, ground;
    var touchX, touchY;
    var isBegin;
    var stats;
    var isDrawDebug = false;
    var debugGraphics = null;

    var bottleFixture1, bottleFixture2;

    function loadBody(levelObj) {
        var fixturesData = levelLoader.json[levelObj];

        const bodyDef = new b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_staticBody;

        const polyFixture = new b2FixtureDef();
        polyFixture.shape = new b2PolygonShape();
        polyFixture.density = 1;

        const body = world.CreateBody(bodyDef);
        for (var i=0;i<fixturesData.length; i++) {
            var fData = fixturesData[i];
            var v = [];
            for (var j=0;j<fData.shape.length;j+=2) {
                v.push(new b2Vec2(fData.shape[j]/METER, fData.shape[j+1]/METER));
            }
            polyFixture.shape.Set(v);
            body.CreateFixture(polyFixture);
        }
        return body;
    }

    function Glove() {
        this.keyUp = this.keyDown = this.keyLeft = this.keyRight = false;
        var mouseX = this.mouseY = 0;
        var mouseDown = false;
        var throwBody = null;
        var throwArm = null;
        var spineBoy = null;
        var graphics;
        var throwAng = (THROW_ANGLE_MIN+THROW_ANGLE_MAX*3)/4;
        var throwImpulse = 0;
        var throwStatus = 0;

        this.setBody = function(body) {
            if (throwBody==null && body!=null)
                stage.addChild(graphics);
            else if (throwBody!=null && body==null)
                stage.removeChild(graphics);
            throwBody = body;
            if (throwBody!=null) {
                spineBoy = throwBody.m_userData;
                //todo: find 'bottle' in children
                throwArm = spineBoy.children[17];
            } else{
                spineBoy = throwArm = null;
            }
        };

        this.getBody = function() {
            return body;
        }

        this.setInput = function(_mouseDown, _mouseX, _mouseY) {
            mouseDown = _mouseDown;
            mouseX = _mouseX;
            mouseY = _mouseY;
        }

        this.update = function() {
           /* if (this.keyRight) throwAng = Math.min(throwAng + THROW_ANGLE_SPEED * TICK, THROW_ANGLE_MAX);
            if (this.keyLeft) throwAng = Math.max(throwAng - THROW_ANGLE_SPEED * TICK, THROW_ANGLE_MIN);
            if (this.keyUp) throwImpulse = Math.min(throwImpulse + THROW_IMPULSE_SPEED * TICK, THROW_IMPULSE_MAX);
            if (this.keyDown) throwImpulse = Math.max(throwImpulse - THROW_IMPULSE_SPEED * TICK, THROW_IMPULSE_MIN);*/

            if (throwBody == null) return;

            var x = throwArm.worldTransform.tx, y = throwArm.worldTransform.ty;
            if (mouseDown) {
                if (throwStatus == 0) {
                    throwStatus = 1;
                    throwImpulse = THROW_IMPULSE_MIN;
                    spineBoy.state.setAnimationByName(0, "aim", false);
                }
                else {
                    throwImpulse += THROW_IMPULSE_SPEED * throwStatus * TICK;
                    if (throwImpulse > THROW_IMPULSE_MAX) {
                        throwImpulse = THROW_IMPULSE_MAX;
                        throwStatus = -1;
                    }
                    if (throwImpulse < THROW_IMPULSE_MIN) {
                        throwImpulse = THROW_IMPULSE_MIN;
                        throwStatus = 1;
                    }
                }
                var dx = mouseX - x, dy = mouseY - y;
                throwAng = Math.atan2(dy, dx);
                if (throwAng>Math.PI/2) throwAng-=Math.PI*2;
                if (throwAng>Math.PI/4) throwAng = Math.PI/4;
                if (throwAng<-Math.PI*5/4) throwAng = -Math.PI*5/4;
            } else {
                if (throwStatus != 0) {
                    this.launch();
                    spineBoy.state.addAnimationByName(0, "trow", false, 0);
                    spineBoy.state.addAnimationByName(0, "idle", true, 0);
                    throwStatus = 0;
                }
            }

            throwBody.SetAngle(0);
            graphics.visible = throwStatus!=0;
            graphics.position.x = x;
            graphics.position.y = y;
            graphics.rotation = throwAng;
            graphics.scale.x = throwImpulse;
            graphics.scale.y = throwImpulse;
            if (throwBody.m_userData.scale.x * Math.cos(throwAng) < 0)
                throwBody.m_userData.scale.x = -throwBody.m_userData.scale.x;
        };

        this.init = function() {
            graphics = new PIXI.Graphics();
            graphics.lineStyle(0.5, 0xffff00, 1.0);
            graphics.moveTo(3, 0);
            graphics.lineTo(10, 0);
            graphics.moveTo(10, 0);
            graphics.lineTo(7, 3);
            graphics.moveTo(10, 0);
            graphics.lineTo(7, -3);
        }

        this.launch = function() {
            if (throwBody == null) return;
            const bodyDef = new b2BodyDef();
            bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
            bodyDef.position.Set(throwArm.worldTransform.tx/METER, throwArm.worldTransform.ty/METER);
            bodyDef.rotation = throwAng + Math.PI/2;
            const body = world.CreateBody(bodyDef);
            body.CreateFixture(bottleFixture1);
            body.CreateFixture(bottleFixture2);
            const spr = new PIXI.Sprite(PIXI.Texture.fromFrame("assets/bottle.png"));
            spr.anchor.x=spr.anchor.y=0.5;
            spr.scale.x=spr.scale.y=BOTTLE_SCALE;
            body.ttl = 5;
            stage.addChild(spr);
            body.m_userData = spr;
            bodies.push(body);
            var m = throwImpulse * body.GetMass();
            var p = body.GetWorldCenter();
            body.ApplyLinearImpulse(new b2Vec2(m * Math.cos(throwAng), m * Math.sin(throwAng)), p);

            //spineBoy.state.setAnimationByName(0, "aim", false, 0);
        }
    }

    var glove = new Glove();

    var bottle1 = [{x:4, y:2},{x:9, y:1},{x:18, y:1},{x:23, y:2},{x:23, y:7},{x:21, y:9},{x:6, y:9},{x:4, y:7}]
    var bottle2 = [{x:6, y:9},{x:21, y:9},{x:26, y:17},{x:26, y:52},{x:23, y:58},{x:4, y:58},{x:1, y:52},{x:1, y:17}]
    var allLevels = [
    {
        name: "location_1",
        spawn: [{x: 60, y: 170}, {x: 261, y: 400}, {x: 475, y: 300}, {x: 648, y: 150}, {x: 676, y: 425}, {
            x: 877, y: 479 }]
    },
    {
        name: "location_2",
        spawn: [{x: 60, y: 210}, {x: 100, y: 410}, {x: 446, y: 145}, {x: 462, y: 433}, {x: 854, y: 485}, {
            x: 886, y: 157 }]
    },
    {
        name: "location_3",
        spawn: [{x: 114, y: 130}, {x: 128, y: 305}, {x: 560, y: 432}, {x: 767, y: 124}, {x: 780, y: 450}, {
            x: 877, y: 479 }]
    }
    ];
    var bottleWidth = 28;
    var bottleHeight = 60;
    var respCounter = 0;

    (function init()
    {
        if (!window.requestAnimationFrame)
        {
            window.requestAnimationFrame = (function() {
                return window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
        }

        window.onload = onLoad;
    })();

    var level;
    var levelLoader;
    function onLoad()
    {
        level = allLevels[Math.random()*allLevels.length|0];

        const container = document.createElement("div");
        document.body.appendChild(container);

        stats = new Stats();
        container.appendChild(stats.domElement);
        stats.domElement.style.position = "absolute";

        stage = new PIXI.Stage(0xDDDDDD, true);

        renderer = new PIXI.CanvasRenderer(STAGE_WIDTH, STAGE_HEIGHT);
        document.body.appendChild(renderer.view);

        const loader = new PIXI.AssetLoader([
            "assets/"+level.name+".png",
            "assets/bottle.png",
            "assets/enemy.png",
            "assets/skeleton.json"]);
        loader.onComplete = function() {
            levelLoader = new PIXI.JsonLoader("assets/"+level.name+".json");
            levelLoader.onLoaded = onLoadAssets;
            levelLoader.load();
        };
        loader.load();
    }

    function onLoadAssets()
    {
        var background = new PIXI.Sprite( PIXI.Texture.fromFrame("assets/"+level.name+".png"));
        background.position.x = 0;
        background.position.y = 0;
        stage.addChild(background);

        world = new b2World(new b2Vec2(0, 10),  true);

        const polyFixture = new b2FixtureDef();
        polyFixture.shape = new b2PolygonShape();
        polyFixture.density = 1;

        const circleFixture	= new b2FixtureDef();
        circleFixture.shape	= new b2CircleShape();
        circleFixture.density = 1;
        circleFixture.restitution = 0.7;

        const bodyDef = new b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_staticBody;

        //down
        polyFixture.shape.SetAsBox(10, 1);
        bodyDef.position.Set(9, STAGE_HEIGHT / METER + 1);
        world.CreateBody(bodyDef).CreateFixture(polyFixture);

        //left
        polyFixture.shape.SetAsBox(1, 100);
        bodyDef.position.Set(-1, 0);
        world.CreateBody(bodyDef).CreateFixture(polyFixture);

        //right
        bodyDef.position.Set(STAGE_WIDTH / METER + 1, 0);
        world.CreateBody(bodyDef).CreateFixture(polyFixture);

        ground = loadBody(level.name);

        bottleFixture1 = new b2FixtureDef();
        bottleFixture1.shape = new b2PolygonShape();
        bottleFixture1.density = 1;
        bottleFixture1.restitution = 0.7;
        bottleFixture1.filter.categoryBits = 2;
        bottleFixture1.filter.maskBits = 7;
        bottleFixture1.shape.Set(bottle1.map(function(point) { return new b2Vec2((point.x-bottleWidth/2)*BOTTLE_SCALE/METER, (point.y-bottleHeight/2)*BOTTLE_SCALE/METER) }));
        bottleFixture2 = new b2FixtureDef();
        bottleFixture2.shape = new b2PolygonShape();
        bottleFixture2.density = 1;
        bottleFixture2.filter.categoryBits = 2;
        bottleFixture2.filter.maskBits = 7;
        bottleFixture2.restitution = 0.7;
        bottleFixture2.shape.Set(bottle2.map(function(point) { return new b2Vec2((point.x-bottleWidth/2)*BOTTLE_SCALE/METER, (point.y-bottleHeight/2)*BOTTLE_SCALE/METER) }));

        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;

        glove.init();
        for (var i = 0; i < level.spawn.length; i++)
            spawnCharacter(i);

        document.addEventListener("mousedown", function(event) {
            isBegin = true;
            onMove(event);
            document.addEventListener("mousemove", onMove, true);
        }, true);

        document.addEventListener("mouseup", function(event) {
            document.removeEventListener("mousemove", onMove, true);
            isBegin = false;
            touchX = undefined;
            touchY = undefined;
        }, true);


        document.addEventListener("keydown", function(event) {
            switch (event.which) {
                case 13:
                    var index = spawnCharacter(MathUtil.rndIntRange(1, spawn.length-1));
                    break;
                case 32:
                    glove.launch();
                    break;
                case 37:
                    glove.keyLeft = true;
                    break;
                case 38:
                    glove.keyUp = true;
                    break;
                case 39:
                    glove.keyRight = true;
                    break;
                case 40:
                    glove.keyDown = true;
                    break;

            }
        }, true);

        document.addEventListener("keyup", function(event) {
            switch (event.which) {
                case 37:
                    glove.keyLeft = false;
                    break;
                case 38:
                    glove.keyUp = false;
                    break;
                case 39:
                    glove.keyRight = false;
                    break;
                case 40:
                    glove.keyDown = false;
                    break;
            }
        }, true);

        renderer.view.addEventListener("touchstart", function(event) {
            isBegin = true;
            onMove(event);
            renderer.view.addEventListener("touchmove", onMove, true);
        }, true);

        renderer.view.addEventListener("touchend", function(event) {
            renderer.view.removeEventListener("touchmove", onMove, true);
            isBegin = false;
            touchX = undefined;
            touchY = undefined;
        }, true);

        var contactListener = new box2d.b2ContactListener();
        contactListener.BeginContact = function(contact) {
            var f = null;
            if (contact.GetFixtureA().GetFilterData().categoryBits == 4 &&
                contact.GetFixtureB().GetFilterData().categoryBits == 2)
                f = contact.GetFixtureA();
            if (contact.GetFixtureA().GetFilterData().categoryBits == 2 &&
                contact.GetFixtureB().GetFilterData().categoryBits == 4)
                f = contact.GetFixtureB();
            if (f==null) return;
            if (!f.GetBody().ttl)
                f.GetBody().ttl = 1;
        };
        world.SetContactListener(contactListener);

        initDebug();
        update();
    }

    function spawnCharacter(index) {
        const polyFixture = new b2FixtureDef();
        polyFixture.shape = new b2PolygonShape();
        polyFixture.density = 1;
        const bodyDef = new b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set( level.spawn[index].x/METER,  level.spawn[index].y/METER);
        var body = world.CreateBody(bodyDef);
        polyFixture.shape.SetAsBox(0.25, 0.25);
        var spr;
        if (index==0) {
            var spineBoy = new PIXI.Spine("assets/skeleton.json");
            //spineBoy.stateData.setMixByName("aim", "trow", 0.2);
            //spineBoy.stateData.setMixByName("trow", "aim", 0.4);
            spineBoy.state.setAnimationByName(0, "draworder", true);
            spineBoy.scale.x = 0.1;
            spineBoy.scale.y = 0.1;
            spr = spineBoy;
            polyFixture.filter.categoryBits = 8;
            polyFixture.filter.maskBits = 1;
        } else {
            spr = new PIXI.Sprite(PIXI.Texture.fromFrame("assets/enemy.png"));
            polyFixture.filter.categoryBits = 4;
            polyFixture.filter.maskBits = 7;
            spr.scale.x=spr.scale.y=0.25;
            spr.anchor.x = spr.anchor.y = 0.5;
        }
        body.CreateFixture(polyFixture);
        body.m_userData = spr;
        stage.addChild(spr);
        bodies.push(body);
        if (index==0) glove.setBody(body);
    }

    function initDebug() {
        debugGraphics = new PIXI.Graphics();
        if (isDrawDebug) {
            stage.addChild(debugGraphics);
        }
        /*var debugDraw = new PIXIDebugDraw(debugGraphics);
        debugDraw.SetDrawScale(METER);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);*/
    }

    function toggleDebug() {
        isDrawDebug = !isDrawDebug;
        if (isDrawDebug) {
            stage.addChild(debugGraphics);
        } else
            stage.removeChild(debugGraphics);
    }

    function getBodyAtMouse()
    {
        const mousePos = new b2Vec2(touchX, touchY);
        const aabb = new b2AABB();
        aabb.lowerBound.Set(touchX - 0.001, touchY - 0.001);
        aabb.upperBound.Set(touchX + 0.001, touchY + 0.001);

        var body;
        world.QueryAABB(
            function (fixture)
            {
                if(fixture.GetBody().GetType() != box2d.b2BodyType.b2_staticBody)
                {
                    if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePos)) {
                        body = fixture.GetBody();
                        return false;
                    }
                }
                return true;
            }, aabb);

        return body;
    }

    function onMove(event)
    {
        if (event["changedTouches"])
        {
            var touche = event["changedTouches"][0];
            touchX = touche.pageX / METER;
            touchY = touche.pageY / METER;
        }
        else {
            touchX = event.clientX / METER;
            touchY = event.clientY / METER;
        }
    }


    function update() {
        requestAnimationFrame(update);

        if (isBegin && !mouseJoint) {
            const dragBody = false;//getBodyAtMouse();
            if (dragBody) {
                const jointDef = new b2MouseJointDef();
                jointDef.bodyA = ground;
                jointDef.bodyB = dragBody;
                jointDef.target.Set(touchX, touchY);
                jointDef.collideConnected = true;
                jointDef.maxForce = 300.0 * dragBody.GetMass();
                mouseJoint = world.CreateJoint(jointDef);
                dragBody.SetAwake(true);
            } else {
                //ATTACK!!!
                glove.setInput(true, touchX*METER, touchY*METER);
            }
        }
        if (!isBegin)
            glove.setInput(false);

        if (mouseJoint) {
            if (isBegin)
                mouseJoint.SetTarget(new b2Vec2(touchX, touchY));
            else {
                world.DestroyJoint(mouseJoint);
                mouseJoint = null;
            }
        }

        if (respCounter>0) {
            respCounter -= TICK;
            if (respCounter<=0) {
                spawnCharacter(MathUtil.rndIntRange(1,  level.spawn.length-1));
            }
        } else {
            if (bodies.length< level.spawn.length)
                respCounter = MathUtil.rndRange(5, 10);
        }

        world.Step(TICK, 3, 3);
        world.ClearForces();

        const n = bodies.length;
        for (var i = 0; i < n; i++) {
            var body = bodies[i];
            var actor = body.m_userData;
            var position = body.GetPosition();
            actor.position.x = position.x * METER;
            if (actor instanceof PIXI.Spine) {
                actor.position.y = position.y * METER + 25;
            } else
                actor.position.y = position.y * METER;
            actor.rotation = body.GetAngle();
            if (body.ttl) {
                if (body.ttl < 1)
                    actor.alpha = Math.sqrt(body.ttl);
                body.ttl -= TICK;
                if (body.ttl<=0)
                    body.dieFlag = true;
            }
        }
        //remove old objects
        {
            var j = 0;
            for (var i = 0; i < n; i++) {
                var body = bodies[i];
                var actor = body.m_userData;
                if (body.dieFlag) {
                    stage.removeChild(actor);
                    world.DestroyBody(body);
                } else
                    bodies[j++] = body;
            }
            while (bodies.length > j)
                bodies.pop();
        }
        glove.update();
        if (isDrawDebug)
            world.DrawDebugData();
        renderer.render(stage);
        stats.update();
    }
})();
