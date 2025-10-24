// Get all plant stage elements from the HTML
let seed = document.querySelector(".seed"); // Find the seed element
let sprout = document.querySelector(".sprout"); // Find the sprout element
let littleFlower = document.querySelector(".little-flower"); // Find the little flower element
let fullFlower = document.querySelector(".flower"); // Find the full flower element


// Plant states
let isWithering = false; // Tracks if the plant is withering
let isDead = false; // Tracks if the plant is dead


// Timer variables
let witherTimer = null; // Stores the timeout for withering
let deadTimer = null; // Stores the timeout for dying


// Growth stage variables
let currentStage = 0; // Tracks which stage the plant is at (0=seed, 1=sprout, 2=little flower, 3=full flower)
let holdInterval = null; // Stores the interval for holding to grow


// Get plant container
const plantContainer = seed?.parentElement || document.body; // Gets the parent container of the plant elements


// CODE FOR CUSTOM CURSOR
let cursor = document.createElement('div'); // Create a new div element for the cursor
cursor.className = 'custom-cursor'; // Give it the custom-cursor class
cursor.style.position = 'fixed'; // Make it stay in place on the screen
cursor.style.pointerEvents = 'none'; // Let clicks go through the cursor image
cursor.style.left = '-9999px'; // Start it off screen
cursor.style.top = '-9999px'; // Start it off screen
cursor.style.opacity = '0'; // Make it invisible at first
cursor.style.transform = 'translate(-50%, -50%)'; // Center the cursor image on the mouse pointer
document.body.appendChild(cursor); // Add the cursor to the page


// Custom cursor movement
document.addEventListener('mousemove', function (e) { // When the mouse moves
  cursor.style.left = e.clientX + 'px'; // Move cursor to mouse X position
  cursor.style.top = e.clientY + 'px'; // Move cursor to mouse Y position
  cursor.style.opacity = '1'; // Make cursor visible
});


document.addEventListener('mouseleave', function () { // When mouse leaves the window
  cursor.style.opacity = '0'; // Hide the cursor
  cursor.style.left = '-9999px'; // Move it off screen
  cursor.style.top = '-9999px'; // Move it off screen
});


document.addEventListener('mouseenter', function (e) { // When mouse enters the window
  cursor.style.left = (typeof e.clientX === 'number' ? e.clientX : window.innerWidth / 2) + 'px'; // Position cursor at mouse X
  cursor.style.top = (typeof e.clientY === 'number' ? e.clientY : window.innerHeight / 2) + 'px'; // Position cursor at mouse Y
  cursor.style.opacity = '1'; // Make cursor visible
});


// Restart button
let restartButton = document.createElement("button"); // Create a button element
restartButton.textContent = "The plant is dead. Get new seed?"; // Set the button text
restartButton.style.position = "absolute"; // Position it anywhere on the page
restartButton.style.top = "40%"; // Place it 40% from the top
restartButton.style.left = "50%"; // Place it 50% from the left (center)
restartButton.style.transform = "translate(-50%, -50%)"; // Center the button perfectly
restartButton.style.padding = "10px 20px"; // Add space inside the button
restartButton.style.fontSize = "18px"; // Make the text bigger
restartButton.style.border = "none"; // Remove the border
restartButton.style.borderRadius = "8px"; // Round the corners
restartButton.style.backgroundColor = "lightGreen"; // Make it light green
restartButton.style.cursor = "pointer"; // Show pointer cursor when hovering
document.body.appendChild(restartButton); // Add the button to the page
restartButton.style.display = "none"; // Hide it at first (only shows when plant dies)


// Update plant colors based on state
function updatePlantColors() {
  const stages = [seed, sprout, littleFlower, fullFlower]; // Put all plant stages in an array
 
  stages.forEach(function(el) { // Loop through each plant element
    if (!el) return; // Skip if element doesn't exist
   
    if (isDead) { // If the plant is dead
      restartButton.style.display = 'block'; // Show the restart button
      el.style.filter = 'grayscale(100%) brightness(60%)'; // Make plant gray and dark
      el.style.pointerEvents = 'none'; // Disable clicking on dead plant
    }
    else if (isWithering) { // If the plant is withering
      el.style.filter = 'grayscale(40%) saturate(60%) brightness(85%)'; // Make plant slightly gray
      el.style.pointerEvents = ''; // Allow clicking to water it
    }
    else { // If the plant is healthy
      el.style.filter = 'none'; // Show normal colors
      el.style.pointerEvents = ''; // Allow clicking
    }
  });
}


// Clear timers
function clearTimers() {
  clearTimeout(witherTimer); // Stop the withering timer
  clearTimeout(deadTimer); // Stop the death timer
}


// Start the decay process - CHANGED: Longer timers now!
function startDecay() {
  clearTimers(); // Clear any existing timers first
 
  if (isDead) return; // Don't start timers if plant is already dead
 
  // Reset to healthy
  isWithering = false; // Set withering to false
  updatePlantColors(); // Update the colors to show healthy plant
 


  witherTimer = setTimeout(function() { // Start a timer for 10 seconds
    isWithering = true; // Set plant to withering state
    updatePlantColors(); // Update colors to show withering
  }, 10000); // 10000 milliseconds = 10 seconds
 
 
  deadTimer = setTimeout(function() { // Start a timer for 20 seconds
    isDead = true; // Set plant to dead state
    isWithering = false; // Plant is no longer withering (it's dead now)
    updatePlantColors(); // Update colors to show dead plant
  }, 15000); // 15000 milliseconds = 15 seconds
}


// Water the plant (click)
function waterPlant() {
  if (isDead) return; // Don't allow watering if plant is dead
 
  isWithering = false; // Remove withering state
  updatePlantColors(); // Update colors to show healthy plant
  startDecay(); // Restart the decay timers from the beginning
}


// Show only one stage at a time
function showStage(index) {
  const stages = [seed, sprout, littleFlower, fullFlower]; // Put all plant stages in an array
  stages.forEach(function(el, i) { // Loop through each stage with its index
    if (!el) return; // Skip if element doesn't exist
    el.style.display = (i === index) ? '' : 'none'; // Show current stage, hide all others
  });
  updatePlantColors(); // Update the colors for the visible stage
}


// HOLD to grow the plant
plantContainer.addEventListener('pointerdown', function() { // When you press down on the plant
  if (isDead) return; // Don't allow growing if plant is dead
 
  holdInterval = setInterval(function() { // Start an interval that runs repeatedly
    if (currentStage < 3) { // If we haven't reached the last stage (full flower)
      currentStage++; // Move to the next stage
      showStage(currentStage); // Display the new stage
    } else { // If we're at the last stage
      clearInterval(holdInterval); // Stop the interval
    }
  }, 500); // Run every 500 milliseconds (half a second)
});


// Stop growing when you let go
plantContainer.addEventListener('pointerup', function() { // When you release the pointer
  clearInterval(holdInterval); // Stop the growing interval
});


plantContainer.addEventListener('pointerleave', function() { // When pointer leaves the plant area
  clearInterval(holdInterval); // Stop the growing interval
});


// CLICK to water the plant
seed.addEventListener('click', waterPlant); // Add click listener to seed
sprout.addEventListener('click', waterPlant); // Add click listener to sprout
littleFlower.addEventListener('click', waterPlant); // Add click listener to little flower
fullFlower.addEventListener('click', waterPlant); // Add click listener to full flower


// Restart button
restartButton.addEventListener('click', function() { // When restart button is clicked
  location.reload(); // Reload the entire page to start over
});


// Start everything - Back to original behavior where timers start immediately
showStage(currentStage); // Show the first stage (seed)
startDecay(); // Start the decay timers right away

