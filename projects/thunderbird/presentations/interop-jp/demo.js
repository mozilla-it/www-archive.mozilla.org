
function canvas1_start() {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    with (ctx) {
        translate(canvas.width / 2, canvas.height / 2);

        save();
        translate(-82, 0);
        fillStyle = "red";
        fillRect(-40, -40, 80, 80);
        restore();

        save();
        translate (82, 0);
        fillStyle = "blue";
        arc(0, 0, 40, 0, 2 * Math.PI, false);
        fill();
        restore();

        save();
        translate (0, 0);
        fillStyle = "green";
        beginPath();
        moveTo(-40, 40);
        lineTo(0, -40);
        lineTo(40, 40);
        fill();
        restore();
    }

    ctx.restore();
}

function canvas2_start() {
    var canvas = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var img = document.getElementById("mozilla-image");
    var pat = ctx.createPattern(img, "repeat");
    ctx.save();
    ctx.scale (4, 4);
    ctx.fillStyle = pat;
    ctx.beginPath();
    ctx.moveTo(10, 90);
    ctx.lineTo(50, 10);
    ctx.lineTo(90, 90);
    ctx.lineTo(10, 90);
    ctx.stroke();

    ctx.rotate(Math.PI/4);
    ctx.scale (.2, .2);
    ctx.fill();
    ctx.restore();
}

var canvas3_interval = null;
function canvas3_start() {
    var canvas3 = document.getElementById("canvas3");
    var ctx = canvas3.getContext("2d");

    ctx.save();

    ctx.clearRect(0, 0, canvas3.width, canvas3.height);

    var img = document.getElementById("mozilla-image");
    var pat = ctx.createPattern(img, "repeat");
    ctx.scale (4, 4);
    ctx.fillStyle = pat;

    // triangle
    ctx.beginPath();
    ctx.moveTo(10, 90);
    ctx.lineTo(50, 10);
    ctx.lineTo(90, 90);
    ctx.lineTo(10, 90);
    ctx.stroke();

    ctx.translate(80,80);
    ctx.scale(.2, .2);
    canvas3_interval = setInterval(function () {
                                       if (canvas3_interval == null)
                                           return;
                                       ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                                       ctx.fill();
                                       ctx.rotate(Math.PI/20);
                                       ctx.fillStyle = pat;
                                       ctx.fill();
                                   }, 100);
}

function canvas3_stop() {
    var canvas3 = document.getElementById("canvas3");
    var ctx = canvas3.getContext("2d");

    clearInterval(canvas3_interval);
    canvas3_interval = null;
    ctx.restore();
}

function canvas4_start() {
    var canvas4a = document.getElementById("canvas4-first");
    var canvas4b = document.getElementById("canvas4-second");
    var canvas4c = document.getElementById("canvas4-third");

    var w = canvas4a.width;
    var h = canvas4a.height;

    with (canvas4a.getContext("2d")) {
        clearRect(0, 0, w, h);

        fillStyle = "rgb(0,150,0)";
        beginPath();
        moveTo(-20,                    (1 + Math.random()) * (h / 3));
        lineTo(1 * w / 4, (1 + Math.random()) * (h / 3));
        lineTo(2 * w / 4, (1 + Math.random()) * (h / 3));
        lineTo(3 * w / 4, (1 + Math.random()) * (h / 3));
        lineTo(w + 20,    (1 + Math.random()) * (h / 3));
        lineTo(w + 20,    h + 20);
        lineTo(-20,    h + 20);
        closePath();
        fill();
        lineWidth = 4.0;
        strokeStyle = "rgb(0,100,0)";
        stroke();

        fillStyle = "rgb(100,100,0)";
        beginPath();
        moveTo(0, h);
        for (var i = 0; i < 5; i++) {
            lineTo((i*2+1) * (w/10), h - 10);
            lineTo((i*2+2) * (w/10), h);
        }
        closePath();
        fill();
    }

    with (canvas4b.getContext("2d")) {
        clearRect(0, 0, w, h);
        fillStyle = "rgb(200,200,0)";
        arc(w / 2, h / 2, (h * 0.8) / 2, 0, 2 * Math.PI, false);
        fill();
    }

    with (canvas4c.getContext("2d")) {
        save();
        fillStyle = "rgb(0,200,220)";
        fillRect(0, 0, w, h);

        save();
        scale(.35, .35);
        drawImage(canvas4b, Math.random() * (w/0.4), 20);
        restore();

        drawImage(canvas4a, 0, 0);
        restore();
    }

}

function canvas4_stop() {
}

function canvas5_start() {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");

    var canvas = document.getElementById("canvas5");
    var ctx = canvas.getContext("2d");

    with (ctx) {
        clearRect(0, 0, canvas.width, canvas.height);

        var s = .6;
        save();
        translate(canvas.width/2, 0);
        scale(s, s);
        rotate(Math.PI / 4, Math.PI / 4);
        lineWidth = 2.0;
        drawWindow(window, 0, 0, window.innerWidth, window.innerHeight, "#ffffff");
        strokeRect(0, 0, window.innerWidth, window.innerHeight);
        restore();
    }
}

function xtech_demo_load() {
}

window.addEventListener("load", xtech_demo_load, false);
