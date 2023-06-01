//the ripple effect
// Idea from:
// https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm


// Coding Train Videos:
// Stream: https://www.youtube.com/watch?v=5lIl5F1hpTE
// Challenge: https://www.youtube.com/watch?v=BZUdGqeOD0w

//code from :
//https://editor.p5js.org/BarneyCodes/sketches/WWNG88FHr
//by BarneyCodes

let rippleShader;

// need two buffers
let currBuff, prevBuff;

const damping = 0.99;

function ripple_preload() {
  rippleShader = loadShader('ripple.vert', 'ripple.frag');
}


function ripple_setup() {

	pixelDensity(1);
	noSmooth();

	// create buffers
	currBuff = createGraphics(width, height);
	currBuff.pixelDensity(1);
	currBuff.noSmooth();

	prevBuff = createGraphics(width, height);
	prevBuff.pixelDensity(1);
	prevBuff.noSmooth();

	// set the shader
	shader(rippleShader);

	rippleShader.setUniform("damping", damping);
	rippleShader.setUniform("res", [width, height]);
}
  