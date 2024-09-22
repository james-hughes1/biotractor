// Configuration
const gridSize = 11;
let bluePosition = { row: 0, col: 0 }; // Initial blue square position
let blueDirection = 'up';

// Function to create a grid
function createGrid(size) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 20px)`; // Adjust columns based on grid size
    gridContainer.innerHTML = ''; // Clear existing grid

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;

            // Make the initial square blue
            if (row === bluePosition.row && col === bluePosition.col) {
                square.classList.add('blue');
            }

            gridContainer.appendChild(square);
        }
    }
}

// Function to automatically move the blue square
function moveBlueSquare() {
    intervalId = setInterval(() => {
        const { row, col } = bluePosition;
        let newRow = row;
        let newCol = col;

        if (blueDirection === 'up') newRow=(newRow+gridSize-1)%gridSize;
        if (blueDirection === 'down') newRow=(newRow+1)%gridSize;
        if (blueDirection === 'left') newCol=(newCol+gridSize-1)%gridSize;
        if (blueDirection === 'right') newCol=(newCol+1)%gridSize;

        if (newRow !== row || newCol !== col) {
            bluePosition = { row: newRow, col: newCol }; // Update position
            createGrid(gridSize); // Re-create the grid with updated blue square position
        }
    }, 100);
}

moveBlueSquare();

// Add event listeners for arrow buttons
document.getElementById('upButton').addEventListener('click', () => {blueDirection = 'up'});
document.getElementById('downButton').addEventListener('click', () => {blueDirection = 'down'});
document.getElementById('leftButton').addEventListener('click', () => {blueDirection = 'left'});
document.getElementById('rightButton').addEventListener('click', () => {blueDirection = 'right'});