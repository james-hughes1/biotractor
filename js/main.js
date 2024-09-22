// Function to change the color of the square
const changeColor = () => {
    document.getElementById("hiddenMessage").style.display = "block";

    const square = document.getElementById("colorSquare");
    
    // Array of colors to cycle through
    const colors = ["red", "blue", "yellow"];
    let currentColorIndex = 0;

    // Set an interval to change the color every 10 seconds
    setInterval(() => {
        // Move to the next color in the array
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        
        // Change the background color of the square
        square.style.backgroundColor = colors[currentColorIndex];
    }, 10000); // 10000ms = 10 seconds
}

// Adding event listener to the button
document.getElementById("startButton").addEventListener("click", () => {
    changeColor();
    document.getElementById("startButton").disabled = true; // Disable button after clicking
});