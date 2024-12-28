// A flag to track whether the flip animation is in progress for each stadium
const isFlippingMap = new Map();

// Function to handle mouse enter
function handleMouseEnter(event) {
  const stadium = event.currentTarget;

  // If not already flipping, start the flip animation
  if (!isFlippingMap.get(stadium)) {
    isFlippingMap.set(stadium, true); // Set the flipping state to true
    stadium.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease";

    // Apply the hover effect styles
    stadium.style.transform = "rotateY(180deg) scale(2) translateY(50px)";
    stadium.style.width = "200px";
    stadium.style.height = "500px";
    stadium.style.zIndex = "2"; // Bring to the front

    // Wait for the animation to complete
    setTimeout(() => {
      isFlippingMap.set(stadium, false); // Animation is complete
      if (!stadium.matches(':hover')) {
        // If the mouse is no longer hovering, revert the styles
        revertStadium(stadium);
      }
    }, 500); // Match the animation duration
  }
}

// Function to handle mouse leave
function handleMouseLeave(event) {
  const stadium = event.currentTarget;

  // If the animation is still in progress, do nothing
  if (isFlippingMap.get(stadium)) return;

  // Otherwise, revert immediately if the mouse is not hovering
  if (!stadium.matches(':hover')) {
    revertStadium(stadium);
  }
}

// Function to revert the stadium to its original state
function revertStadium(stadium) {
  stadium.style.transition = "transform 0.5s ease, width 0.5s ease, height 0.5s ease";
  stadium.style.transform = "rotateY(0deg) scale(1) translateY(0)";
  stadium.style.width = "80px";
  stadium.style.height = "350px";
  stadium.style.zIndex = "1"; // Reset z-index to normal
}

// Function to play animation when the stadium is visible in the viewport
function playAnimationOnScroll() {
  stadiums.forEach((stadium) => {
    const rect = stadium.getBoundingClientRect();

    // Check if the stadium is visible in the viewport
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      if (!isFlippingMap.get(stadium)) {
        isFlippingMap.set(stadium, true); // Mark as flipping
        stadium.style.transition = "transform 0.5s ease";
        stadium.style.transform = "rotateY(180deg)";

        // Reset after animation completes
        setTimeout(() => {
          stadium.style.transform = "rotateY(0deg)";
          isFlippingMap.set(stadium, false); // Reset flipping state
        }, 500); // Match animation duration
      }
    }
  });
}

// Add event listeners to each stadium for mouse enter and leave
const stadiums = document.querySelectorAll('.stadium');
stadiums.forEach(stadium => {
  isFlippingMap.set(stadium, false); // Initialize flipping state
  stadium.addEventListener('mouseenter', handleMouseEnter);
  stadium.addEventListener('mouseleave', handleMouseLeave);
});

// Add scroll event listener to trigger animations
window.addEventListener('scroll', playAnimationOnScroll);

// Initial check in case some elements are already in the viewport
playAnimationOnScroll();





