// Configuration
const gridSize = 11;
let bluePosition = { row: 0, col: 0 }; // Initial blue square position

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

// Function to move the blue square
function moveBlueSquare(direction) {
    const { row, col } = bluePosition;
    let newRow = row;
    let newCol = col;

    if (direction === 'up') newRow=(newRow+gridSize-1)%gridSize;
    if (direction === 'down') newRow=(newRow+1)%gridSize;
    if (direction === 'left') newCol=(newCol+gridSize-1)%gridSize;
    if (direction === 'right') newCol=(newCol+1)%gridSize;

    if (newRow !== row || newCol !== col) {
        bluePosition = { row: newRow, col: newCol }; // Update position
        createGrid(gridSize); // Re-create the grid with updated blue square position
    }
}

// Initialize the grid
createGrid(gridSize);

// Add event listeners for arrow buttons
document.getElementById('upButton').addEventListener('click', () => moveBlueSquare('up'));
document.getElementById('downButton').addEventListener('click', () => moveBlueSquare('down'));
document.getElementById('leftButton').addEventListener('click', () => moveBlueSquare('left'));
document.getElementById('rightButton').addEventListener('click', () => moveBlueSquare('right'));