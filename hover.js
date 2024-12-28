
let isFadedOut = false; // To track if the elements are faded out
let lineAppeared = false; // To track if the black line has appeared

// Create the black line element if it's not in the HTML
const blackLine = document.querySelector('.bg');

let startY = 0; // Initial touch position
let isTouching = false; // To track if a touch event is ongoing

// Function to handle scroll (mouse wheel or touch delta)
function handleMouseWheel(delta) {
  const stadiums = document.querySelectorAll('.stadium');

  // Scroll down (delta > 0)
  if (delta > 0) {
    if (!isFadedOut) {
      isFadedOut = true;

      stadiums.forEach((stadium) => {
        stadium.style.transition = 'transform 2s ease, opacity 2s ease, height 2s ease'; // Slower transition
        stadium.style.opacity = '0'; // Fade out
        stadium.classList.add('jiggle'); // Add jiggle animation
      });

      // Expand the black line and make it visible
      blackLine.style.transition = 'height 2s ease, opacity 2s ease, margin-top 2s ease'; // Slower transition for the black line
      blackLine.style.height = '200vh';
      blackLine.style.opacity = '1';
      blackLine.style.marginTop = "-70vh";

      // Trigger additional animations after the transition
      blackLine.addEventListener('transitionend', triggerAnlog);
    }

    // Trigger subsequent animations with delays
    setTimeout(() => {
      stadiums.forEach((stadium) => {
        stadium.style.transition = 'transform 2.5s ease, opacity 2.5s ease'; // Slower land animation
        stadium.classList.add('land-animation'); // Add land animation for fade-in
      });

      setTimeout(() => {
        stadiums.forEach((stadium) => {
          stadium.style.transition = 'height 3s ease'; // Slow randomHeight animation
          stadium.classList.add('random-height'); // Start randomHeight animation
        });
      }, 1500); // Increased delay to allow for slower animations
    }, 1500); // Increased delay to ensure the black line animation completes first
  }

  // Scroll up (delta < 0)
  else if (delta < 0) {
    if (isFadedOut) {
      isFadedOut = false;

      stadiums.forEach((stadium) => {
        stadium.style.transition = 'transform 2s ease, opacity 2s ease, height 2s ease'; // Slower transition
        stadium.style.opacity = '1'; // Fade in
        stadium.style.height = '300px'; // Restore original height
        stadium.style.transform = 'translateY(0)'; // Reset position
        stadium.classList.add('land-animation'); // Add land animation
        stadium.classList.remove('jiggle'); // Remove the jiggle effect
      });

      // Trigger randomHeight animation after a delay
      setTimeout(() => {
        stadiums.forEach((stadium) => {
          stadium.style.transition = 'height 3s ease'; // Slow randomHeight animation
          stadium.classList.add('random-height'); // Start randomHeight animation
        });
      }, 1500); // Increased delay to allow for slower animations

      // Collapse the black line and make it invisible
      blackLine.style.transition = 'height 2s ease, opacity 2s ease, margin-top 2s ease'; // Slower transition for the black line
      blackLine.style.height = '0';
      blackLine.style.opacity = '0';
    }
  }
}

// Function to trigger anlog script after the black line has finished fading in
function triggerAnlog() {
  if (blackLine.style.height === '200vh') {
    anlog(); // Assuming anlog() is a function defined elsewhere
  }
}

// Mouse wheel event listener
let isScrolling = false;
window.addEventListener('wheel', function (event) {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(function () {
      handleMouseWheel(event.deltaY || event.detail || -event.wheelDelta);
      isScrolling = false;
    });
  }
}, { passive: false });

// Touch event listeners for mobile scrolling
window.addEventListener('touchstart', (event) => {
  isTouching = true;
  startY = event.touches[0].clientY; // Record initial touch position
}, { passive: false });

window.addEventListener('touchmove', (event) => {
  if (isTouching) {
    const currentY = event.touches[0].clientY; // Get current touch position
    const delta = startY - currentY; // Calculate scroll delta (negative for up, positive for down)
    handleMouseWheel(delta); // Pass delta to the existing scroll handler
    startY = currentY; // Update startY for continuous scrolling

    // Prevent default scrolling behavior
    event.preventDefault();
  }
}, { passive: false });

window.addEventListener('touchend', () => {
  isTouching = false; // Reset the touch state
});
