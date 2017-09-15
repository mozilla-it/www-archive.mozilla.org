/** This script created by Jason Johnston (Jason@screaminweb.com)
*** You may use and/or modify this script freely, I just ask that
*** you give me due credit.
**/

var gravity = .2;

//constructor:    
function Particle(x, y, xVelocity, yVelocity, lifespan, size, color, kids) {
	this.x        = x;
	this.y        = y;
	this.xVel     = xVelocity;
	this.yVel     = yVelocity * -1;
	this.lifespan = lifespan;
	this.size     = size;
	this.kids     = kids;
	this.color    = color;

	this.create();
}

Particle.prototype = {

	create : function() {
		//add to global array of particles:
		if(!document._particles) document._particles=[];
		document._particles = [this].concat(document._particles); //append to beginning of array, to facilitate cleanup

		//measure particle's age:
		this.birthdate = new Date();
		
		//create the element and set its styles:
		this.particle = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		var sty = this.particle.style;
			sty.width      = this.size+"px";
			sty.height     = this.size+"px";
			sty.border     = "0 solid #CCC";
			sty.borderRightWidth = sty.borderBottomWidth = "1px";
			sty.background = this.color;
			sty.position   = "absolute";
			sty.left       = this.x+"px";
			sty.top        = this.y+"px";

		//append element to document:
		document.getElementsByTagName("body")[0].appendChild(this.particle);
	},

	move : function() {
		//get current values:
		var x = parseFloat(this.particle.style.left);
		var y = parseFloat(this.particle.style.top);
		var winWidth = parseFloat(getComputedStyle(document.documentElement,null).getPropertyValue("width"));
		
		//adjust y velocity for gravity:
		this.yVel += gravity;
		
		//set new coordinate values:
		x += this.xVel;
		y += this.yVel;

		//destroy if leaving window bounds:
		if(x + this.size + 1 >= winWidth) {
			this.destroy();
			return;
		}

		//move particle to new coordinates:
		this.particle.style.left = x + "px";
		this.particle.style.top  = y + "px";

		//destroy (and/or explode) if past lifespan:
		if(new Date() - this.birthdate > this.lifespan) {
			//if specified, explode into several new particles:
			var possibleColors = ["#CC00CC","magenta","red","#3333FF","#00CC00"];
			if(this.kids > 0) {
				var newColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
				for(var i=0; i<this.kids; i++) {
					//x, y, velocity, direction, lifespan, size, color, kids
					var newXVel = (Math.random() - 0.5) * 18 + this.xVel;
					var newYVel = (Math.random() - 0.5) * 10 - (this.yVel / 2);
					var newLife = Math.random() * 600 + 600;
					var newSize = Math.ceil(Math.random()*3);
					new Particle(x, y, newXVel, newYVel, newLife, newSize, newColor, 0);
				}
			}
			this.destroy();
		}
	},

	destroy : function() {
		//remove element from document:
		if(this.particle) document.getElementsByTagName("body")[0].removeChild(this.particle);
		this.particle = null;
	}

}

function tickParticles() {
	var particles = document._particles;
	if(!particles) return;
	for(var i=particles.length-1; i>=0; i--) {
		if(particles[i].particle) particles[i].move();
		else if(i==particles.length-1) particles.length--; //clean up empty slots for performance
	}
}

function makeFirework() {
	var delay = Math.random()*1000 + 900 + 1200; //delay before next launch; should be at least as long as the longest possible lifespan of parent plus children.
	if(document._clearForLaunch) {
		//prevent another launch until after this one completes:
		document._clearForLaunch = false;
		setTimeout("document._clearForLaunch = true", delay);
		
		//create firework base particle:
		var newXVel = (Math.random() - 0.5) * 4;
		var newYVel = (Math.random() + 1) * 7;
		new Particle(document._mouseX, document._mouseY, newXVel, newYVel, 900, 2, "black", 8); //x, y, xVelocity, yVelocity, lifespan, size, color, kids
	}
	clearTimeout(document._fireworkTimer);
	document._fireworkTimer = setTimeout(makeFirework, delay);
}

function onFireworksStarted(evt) {
	if(document._clearForLaunch) makeFirework();
	if(document._animTimer) clearInterval(document._animTimer);
        
        // Avoid javascript errors if they click the link too quickly.
	try {
		document._animTimer = setInterval(tickParticles,50);
	} catch (e) {}
}

function onFireworksStopped(evt) {
	clearTimeout(document._fireworkTimer);
}

function onMouseMoved(evt) {
	//keep a reference property with current mouse coords:
	document._mouseX = evt.clientX;
	document._mouseY = evt.clientY;
}

function onPageLoaded(evt) {
	var partyElt = document.getElementById("party");
	if(!partyElt) return;
	document._clearForLaunch = true; //flag indicating if it's ok to launch a new firework, to prevent overlapping.
	partyElt.addEventListener("mousemove",onFireworksStarted,false);
	partyElt.addEventListener("mouseout",onFireworksStopped,false);
}


document._clearForLaunch = true;
if(window.addEventListener) {
	window.addEventListener("load",onPageLoaded,false);
	window.addEventListener("mousemove",onMouseMoved,false);
}

//add namespace methods to HTML DOM; this makes the script work in both HTML and XML contexts.
if(!document.createElementNS) document.createElementNS = function(ns,elt) {return document.createElement(elt);}
