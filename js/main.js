let intervalId;

// Function to change the color of the square
const changeColor = () => {
    const square = document.getElementById("colorSquare");

    const colors = ["red", "blue", "yellow"];
    let currentColorIndex = 0;

    intervalId = setInterval(() => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        square.style.backgroundColor = colors[currentColorIndex];
    }, 1000);
}

document.getElementById("startButton").addEventListener("click", () => {
    changeColor();
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
});

document.getElementById("pauseButton").addEventListener("click", () => {
    clearInterval(intervalId);
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("startButton").disabled = false;
});