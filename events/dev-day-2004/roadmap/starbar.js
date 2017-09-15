var gCtx = null;

var SIZE = 180.0;

function context2DForCanvas(cname) {
    //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect UniversalBrowserAccess');
    var canvas = document.getElementById(cname);
    var canvasbo = canvas.boxObject.QueryInterface(Components.interfaces.nsICanvasBoxObject);
    return canvasbo.getContext("context-2d").QueryInterface(Components.interfaces.nsICanvasRenderingContext2D);
}

function onLoad() {
    //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect UniversalBrowserAccess');
    gCtx = context2DForCanvas('canvas');
    setInterval (onTick, 1000);
}

var frobnication = 1;
function frob() {
    frobnication++;
    if (frobnication > 4)
        frobnication = 1;
}

var tickCount = 0;

var colors = ["red", "green", "blue", "darkred", "darkblue", "lightblue", "yellow", "teal", "red", "red", "lemonchiffon", "lightgoldenrodyellow", "mediumaquamarine", "peachpuff", "tomato", "peru", "cornflowerblue"];

function onTick() {
    //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect UniversalBrowserAccess');

  if (0) {
    for (var i = 0; i < frobnication; i++) {
        for (var j = 0; j < frobnication; j++) {
            gCtx.save();
            gCtx.translate(5 + SIZE/frobnication * i, SIZE + 20 + 5 + SIZE/frobnication * j);
            gCtx.scale(1.0 / frobnication, 1.0 / frobnication);

            gCtx.setLineWidth(1.0);
            star (gCtx);
            gCtx.strokePath();

            gCtx.restore();
        }
    }
  }

    var rx = Math.random() * 100;
    var ry = Math.random() * 550;
    var s = Math.random() * 5;
    var r = Math.random() * (2*Math.PI);

    var c = colors[Math.floor((Math.random() * 100) % colors.length)];

    gCtx.save();

    gCtx.translate(rx, ry);
    gCtx.scale(s, s);
    gCtx.rotate(r);

    try {
        gCtx.setStrokeColor(c);
        gCtx.setFillColor(c);
    } catch (e) {
    }

    gCtx.setAlpha(Math.random());

    star (gCtx);

    gCtx.restore();


    for (var i = 0; i < frobnication; i++) {
        for (var j = 0; j < frobnication; j++) {
            gCtx.save();
            gCtx.translate(5 + SIZE/frobnication * i, 5 + SIZE/frobnication * j);
            gCtx.scale(1.0 / frobnication, 1.0 / frobnication);

            gCtx.setFillColor("black");
            gCtx.setAlpha(1.0);
            gCtx.beginPath();
            gCtx.addArc(SIZE/2, SIZE/2, SIZE/2, 0, 2 * Math.PI, true);
            gCtx.fillPath();

            clock (gCtx);

            gCtx.restore();
        }
    }


    tickCount++;
}

function star(ctx) {
    //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect UniversalBrowserAccess');

    gCtx.save();
    gCtx.scale(6.0, 6.0);
    gCtx.translate(-20.0, -5.0);
    gCtx.beginPath();
    gCtx.moveToPoint(35.0,7.5);
    gCtx.addLineToPoint(37.9,16.1);
    gCtx.addLineToPoint(46.9,16.1);
    gCtx.addLineToPoint(39.7,21.5);
    gCtx.addLineToPoint(42.3,30.1);
    gCtx.addLineToPoint(35.0,25.0);
    gCtx.addLineToPoint(27.7,30.1);
    gCtx.addLineToPoint(30.3,21.5);
    gCtx.addLineToPoint(23.1,16.1);
    gCtx.addLineToPoint(32.1,16.1);
    gCtx.closePath();
//    gCtx.strokePath();
    gCtx.fillPath();

    gCtx.restore();
}

function clock(ctx) {
    //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect UniversalBrowserAccess');

    ctx.save();

    var now = new Date();
    var h = now.getHours() % 12;
    var m = now.getMinutes();
    var s = now.getSeconds();

    // draw clock body

    ctx.setFillColor("blue");
    ctx.setAlpha(0.3);
    ctx.beginPath();
    ctx.addArc(SIZE/2, SIZE/2, SIZE/2 - 20.0, 0, 2 * Math.PI, true);
    ctx.fillPath();

    ctx.setStrokeColor("white");
    ctx.setLineWidth(4.0);
    ctx.beginPath();
    ctx.addArc(SIZE/2, SIZE/2, SIZE/2 - 20.0, 0, 2 * Math.PI, true);
    ctx.strokePath();

    ctx.setStrokeColor("white");
    ctx.beginPath();
    ctx.addArc(SIZE/2, SIZE/2, SIZE/2, 0, 2 * Math.PI, true);
    ctx.strokePath();

    ctx.setLineWidth(1.5);
    ctx.setStrokeColor("white");
    // draw tick marks
    for (var j = 0; j < 12; j++) {
        ctx.save();
        ctx.translate(SIZE/2, SIZE/2);
        ctx.rotate((j/12) * (2*Math.PI));
        ctx.beginPath();
        ctx.moveToPoint(-SIZE/2 + 20, 0);
        ctx.addLineToPoint(-SIZE/2, 0);
        ctx.strokePath();
        ctx.restore();
    }

    ctx.setStrokeColor("red");
    ctx.setAlpha(1.0);
    // draw clock center
    ctx.setLineWidth(9.0);
    ctx.addArc(SIZE/2, SIZE/2, 4.0, 0, 2 * Math.PI, true);
    ctx.strokePath();

    ctx.setLineCap("round");

    ctx.setAlpha(0.90);
    // draw arms
    ctx.setLineWidth(9.0);
    ctx.save();
    var hangle = (h/12)*(2*Math.PI) + (m/(60*12))*(2*Math.PI);
    ctx.translate(SIZE/2, SIZE/2);
    ctx.rotate(hangle);
    ctx.beginPath();
    ctx.moveToPoint(0, 0);
    ctx.addLineToPoint(0, -SIZE/5);
    ctx.strokePath();
    ctx.restore();

    ctx.setLineWidth(9.0);
    ctx.save();
    var mangle = (m/60)*(2*Math.PI);
    ctx.translate(SIZE/2, SIZE/2);
    ctx.rotate(mangle);
    ctx.beginPath();
    ctx.moveToPoint(0, 0);
    ctx.addLineToPoint(0, -SIZE/2.5);
    ctx.strokePath();
    ctx.restore();

    ctx.setAlpha(0.75);
    ctx.setLineWidth(3.0);
    ctx.save();
    var sangle = (s/60)*(2*Math.PI);
    ctx.translate(SIZE/2, SIZE/2);
    ctx.rotate(sangle);
    ctx.beginPath();
    ctx.moveToPoint(0, 0);
    ctx.addLineToPoint(0, -SIZE/2.5);
    ctx.strokePath();
    ctx.restore();

    ctx.restore();
}
