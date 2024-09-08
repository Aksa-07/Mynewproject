// Variables to store the selected images
let selectedTopImage = null;
let selectedBottomImage = null;

// Function to toggle highlight on click
function toggleHighlight(image, isTopDiv) {
  if (isTopDiv) {
    // Deselect the previously selected top image
    if (selectedTopImage) {
      selectedTopImage.classList.remove("highlighted");
    }
    // Select the new top image
    selectedTopImage = image === selectedTopImage ? null : image;
    if (selectedTopImage) {
      selectedTopImage.classList.add("highlighted");
    }
  } else {
    // Deselect the previously selected bottom image
    if (selectedBottomImage) {
      selectedBottomImage.classList.remove("highlighted");
    }
    // Select the new bottom image
    selectedBottomImage = image === selectedBottomImage ? null : image;
    if (selectedBottomImage) {
      selectedBottomImage.classList.add("highlighted");
    }
  }
}

// Add click event listeners to all images in the top div
document.querySelectorAll(".top-div .image").forEach((image) => {
  image.addEventListener("click", function () {
    toggleHighlight(this, true);  // true for top div
  });
});

// Add click event listeners to all images in the bottom div
document.querySelectorAll(".bottom-div .image").forEach((image) => {
  image.addEventListener("click", function () {
    toggleHighlight(this, false);  // false for bottom div
  });
});
