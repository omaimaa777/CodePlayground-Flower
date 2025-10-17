/*
 * IDB Programming: Code Playground
 */
import * as Util from "./util.js";


// State variables are the parts of your program that change over time.
let x = 0.35;
let y = 0.35;


// Settings variables should contain all of the "fixed" parts of your programs


// Code that runs over and over again
function loop() {
  Util.setPosition(x, y);
  window.requestAnimationFrame(loop);
}


function HandleMouseClicks(event) {
  // The ball is 100px in the CSS
  const ballPixelSize = 100;
 
  // Center the ball on the mouse by subtracting half its size
  x = (event.x - ballPixelSize / 2) / window.innerWidth;
  y = (event.y - ballPixelSize / 2) / window.innerHeight;
}


// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  document.addEventListener("pointerdown", HandleMouseClicks);
  window.requestAnimationFrame(loop);
}


document.getElementById('thing').addEventListener(type, listener)




setup(); // Always remember to call setup()!
 


