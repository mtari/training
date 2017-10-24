function PIXIDebugDraw(graphics) {
    this.m_sprite.graphics = graphics;
    this.m_ctx = {}
}

(function() {
    var debugDraw = new box2d.b2Draw();
    PIXIDebugDraw.prototype = debugDraw;

    debugDraw.DrawSegment = function (p1, p2, color) {
        var scale = this.m_drawScale, alpha = this.m_alpha, thickness = this.m_lineThickness;
        var graphics = this.m_sprite.graphics;
        graphics.lineStyle(thickness, color.color, alpha);
        graphics.moveTo(scale, p1.y * scale);
        graphics.lineTo(scale, p2.y * scale);
    };
    debugDraw.DrawPolygon = function (vertices, vertexCount, color) {
        var scale = this.m_drawScale, graphics = this.m_sprite.graphics;
        graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
        for(var i=0;i<vertexCount;i++) {
            if ( i === 0 )
                graphics.moveTo(vertices[i].x * scale, vertices[i].y * scale);
            else
                graphics.lineTo(vertices[i].x * scale, vertices[i].y * scale);
        }
    };
    debugDraw.DrawSolidPolygon = function (vertices, vertexCount, color) {
        var scale = this.m_drawScale, graphics = this.m_sprite.graphics;
        graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
        graphics.beginFill(color, this.m_fillAlpha);
        for(var i=0;i<vertexCount;i++) {
            if ( i === 0 )
                graphics.moveTo(vertices[i].x * scale, vertices[i].y * scale);
            else
                graphics.lineTo(vertices[i].x * scale, vertices[i].y * scale);
        }
        graphics.endFill();
    };
    debugDraw.DrawCircle = function (center, radius, color) {
        var scale = this.m_drawScale, graphics = this.m_sprite.graphics;
        var graphics = this.m_sprite.graphics;
        graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
        graphics.drawCircle(center.x*scale, center.y * scale, radius*scale);
    };
    debugDraw.DrawSolidCircle = function (center, radius, axis, color) {
        var scale = this.m_drawScale, graphics = this.m_sprite.graphics;
        var ang = Math.atan2(axis.y, axis.x);
        graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
        graphics.beginFill(color, this.m_fillAlpha);
        graphics.moveTo(center.x * scale, center.y * scale);
        graphics.arc(center.x * scale, center.y * scale, radius * scale, ang, ang+2 * Math.PI, false);
        graphics.endFill();
    };
    debugDraw.DrawTransform = function (xf) {
        var scale = this.m_drawScale, graphics = this.m_sprite.graphics;
        graphics.lineStyle(this.m_lineThickness, 0xff0000, this.m_alpha);
        graphics.moveTo(xf.position.x * scale, xf.position.y * scale);
        graphics.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * scale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * scale);
        graphics.lineStyle(this.m_lineThickness, 0xff00, this.m_alpha);
        graphics.moveTo(xf.position.x * scale, xf.position.y * scale);
        graphics.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * scale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * scale);
    };
})();
