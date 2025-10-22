// Get all plant stage elements from the HTML
let seed = document.querySelector(".seed");
let sprout = document.querySelector(".sprout");
let littleFlower = document.querySelector(".little-flower");
let fullFlower = document.querySelector(".flower");


// Plant states - tracks if plant is withering or dead
let isWithering = false;
let isDead = false;


// Timer variables - stores the timeout IDs
let witherTimer = null;
let deadTimer = null;

let healthStages = ['healthy','isWithering','isDead'];






// Function to update plant colors based on state
function updatePlantColors() {
  // Get all plant stage elements in an array
  const stages = [seed, sprout, littleFlower, fullFlower];
 
  // Loop through each plant element
  stages.forEach(function(el) {
    // Skip if element doesn't exist
    if (!el) {
      return;
    }
   
    // Apply dead styling
    if (isDead) {
      el.style.filter = 'grayscale(100%) brightness(60%)';
      el.style.pointerEvents = 'none';
    }
    // Apply withering styling
    else if (isWithering) {
      el.style.filter = 'grayscale(40%) saturate(60%) brightness(85%)';
      el.style.pointerEvents = '';
    }
    // Apply healthy styling
    else {
      el.style.filter = 'none';
      el.style.pointerEvents = '';
    }
  });
}


// Function to clear timers
function clearTimers() {
  // Clear the wither timeout
  clearTimeout(witherTimer);
  // Clear the death timeout
  clearTimeout(deadTimer);
}


// Function to start the decay process
function startDecay() {
  // Clear any existing timers first
  clearTimers();
 
  // Don't start new timers if plant is already dead
  if (isDead) {
    return;
  }
 
  // Set timer to make plant wither after 5 seconds
  witherTimer = setTimeout(function() {
    isWithering = true;
    updatePlantColors(); // Update the visuals when withering starts
  }, 5000);
 
  // Set timer to make plant die after 10 seconds
  deadTimer = setTimeout(function() {
    isDead = true;
    isWithering = false;
    updatePlantColors(); // Update the visuals when plant dies
  }, 10000);
}


// Function to handle plant click
function clickPlant() {
  // Don't allow clicking if plant is dead
  if (isDead) {
    return;
  }
 
  // Reset withering state
  isWithering = false;
  // Update colors to show healthy plant
  updatePlantColors();
  // Restart the decay timers
  startDecay();
}


// Function to setup event listeners
function setupListeners() {
  // Add click listener to seed
  seed.addEventListener('click', clickPlant);
  // Add click listener to sprout
  sprout.addEventListener('click', clickPlant);
  // Add click listener to little flower
  littleFlower.addEventListener('click', clickPlant);
  // Add click listener to full flower
  fullFlower.addEventListener('click', clickPlant);
}


// Function to initialize the program
function setup() {
  // Set up all the click listeners
  setupListeners();
  // Set initial colors to healthy
  updatePlantColors();
  // Start the first decay cycle
  startDecay();
}


// Start the program when page loads
setup();








function updatePlantColors() {
  const stages = [seed, sprout, littleFlower, fullFlower];


  // code that checks to avoid running code on a null element, lets loop continue to next element "safely"
  stages.forEach((el) => { //arrow function that calls the arrow for each stage "el" element 
    if (!el) return; // checks if 'el' is falsy (does not exist), if so, exits the function


    // Adjust CSS filter for the different withering stages colors
    if (isDead) {
      el.style.filter = 'grayscale(100%) brightness(60%)'; // completely gray and darker
    } else if (isWithering) {
      el.style.filter = 'grayscale(40%) saturate(60%) brightness(85%)'; // desaturated and less bright
    } else {
      el.style.filter = 'none'; // normal colors
    }
  });
}


let restartButton = document.createElement("button");
restartButton.textContent = "Game over. Restart";
restartButton.style.position = "absolute";
restartButton.style.top = "40%";
restartButton.style.left = "50%";
restartButton.style.transform = "translate(-50%, -50%)";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "18px";
restartButton.style.border = "none";
restartButton.style.borderRadius = "8px";
restartButton.style.backgroundColor = "lightGreen";
restartButton.style.cursor = "pointer";
document.body.appendChild(restartButton);


if (healthStages[currentStage] === 'isDead') {
 restartButton.style.display = "none";
}
restartButton.addEventListener("click", function() {
 location.reload();
});





// show only one stage at a time and update colors
const plantContainer = seed?.parentElement || document.body;


function showStage(index) {
 const stages = [seed, sprout, littleFlower, fullFlower];
 stages.forEach((el, i) => {
   if (!el) return;
   // hide all except the current stage
   el.style.display = (i === index) ? '' : 'none';
 });
 updatePlantColors();
}


// advance stage on click; stops at last stage (remove check to loop)
plantContainer.addEventListener('click', () => {
 if (isDead) return;
 if (currentStage < plantStages.length - 1) {
   currentStage++;
   showStage(currentStage);
 } else {
   // optionally loop back to seed:
    //currentStage = 0; showStage(currentStage);
 }
});


// Initial display
showStage(currentStage);

