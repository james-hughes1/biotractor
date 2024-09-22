// Configuration
const gridSize = 11;
let bluePosition = { row: 5, col: 5 }; // Initial blue square position
let blueDirection = 'stop';
let blueFuel = 100;

// Function to create a grid
function createGrid(size) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Clear existing grid

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;

            // Farmhouse
            if (row === 5 && col === 5) {
                square.classList.add('red');
            }

            // Make the initial square blue
            if (row === bluePosition.row && col === bluePosition.col) {
                square.classList.add('blue');
            }

            gridContainer.appendChild(square);
        }
    }
}

function updateFuelBar() {
    const fuelBar = document.getElementById('fuelBar');
    fuelBar.style.width = blueFuel + '%'; // Assuming blueFuel is a percentage (0 to 100)
}

// Function to automatically move the blue square
function playGame() {
    // Initialisation
    let bluePosition = { row: 5, col: 5 }; // Initial blue square position
    let blueDirection = 'stop';
    let blueFuel = 100;

    // Game loop
    intervalId = setInterval(() => {
        const { row, col } = bluePosition;
        let newRow = row;
        let newCol = col;
        if (blueFuel > 0) {
            if (blueDirection === 'up') newRow=(newRow+gridSize-1)%gridSize;
            if (blueDirection === 'down') newRow=(newRow+1)%gridSize;
            if (blueDirection === 'left') newCol=(newCol+gridSize-1)%gridSize;
            if (blueDirection === 'right') newCol=(newCol+1)%gridSize;
        }

        if (newRow !== row || newCol !== col) {
            // If blue moves
            bluePosition = { row: newRow, col: newCol }; // Update position
            if (bluePosition.row === 5 && bluePosition.col === 5) {
                blueDirection = 'stop';
            }
            createGrid(gridSize); // Re-create the grid with updated blue square position
            blueFuel--;
            updateFuelBar();
        } else {
            if (blueFuel < 100) blueFuel++;
            updateFuelBar();
        }
        
    }, 200);
}

createGrid(gridSize);
playGame();

// Swipe detection variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Listen for touchstart event to detect the starting position
document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    event.preventDefault(); // Prevent scrolling
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent scrolling while swiping
});

// Listen for touchend event to detect the ending position and determine swipe direction
document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipeGesture();
    event.preventDefault(); // Prevent scrolling
});

// Function to detect the swipe direction
function handleSwipeGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            blueDirection = 'right'; // Swipe right
        } else {
            blueDirection = 'left'; // Swipe left
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            blueDirection = 'down'; // Swipe down
        } else {
            blueDirection = 'up'; // Swipe up
        }
    }
}

// Add listeners for arrow key controls
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            blueDirection = 'up';
            break;
        case 'ArrowDown':
            blueDirection = 'down';
            break;
        case 'ArrowLeft':
            blueDirection = 'left';
            break;
        case 'ArrowRight':
            blueDirection = 'right';
            break;
    }
});