// Configuration
const gridSize = 11;
const farmhousePos = Math.floor(gridSize / 2)
let bluePosition = { row: 3, col: 3 }; // Initial blue square position
let blueDirection = 'down';
let blueFuel = 50;

// Function to create a grid
function createGrid(size, cropGrid) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Clear existing grid

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;

            // Crops
            if (cropGrid[row][col] > 9) {
                square.classList.add('yellow');
            } else if (cropGrid[row][col] > 0) {
                square.classList.add('green');
            }

            // Farmhouse
            if (row === farmhousePos && col === farmhousePos) {
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

// Grow crops
function growCrops(cropGrid) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (cropGrid[row][col] > 0 && cropGrid[row][col] < 10) {
                cropGrid[row][col] = cropGrid[row][col] + 1;
            }
        }
    }
    return cropGrid
}

// Function to automatically move the blue square
function playGame() {
    // Initialisation
    bluePosition = { row: 3, col: 3 }; // Initial blue square position
    blueDirection = 'down';
    blueFuel = 75;

    // Create crops
    let cropGrid = [];
    for (let row = 0; row < gridSize; row++) {
        cropGrid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            if (row != farmhousePos && col != farmhousePos && Math.random() > 0.8) {
                cropGrid[row][col] = 1;
            } else {
                cropGrid[row][col] = 0;
            }
        }
    }

    // Initial display
    createGrid(gridSize, cropGrid);

    // Game loop
    intervalId = setInterval(() => {
        const { row, col } = bluePosition;
        let newRow = row;
        let newCol = col;

        if (bluePosition.row === farmhousePos && bluePosition.col === farmhousePos && blueFuel < 100) {
            blueFuel++;
        }

        // Grow the crops
        cropGrid = growCrops(cropGrid);

        // Handle movement
        if (blueFuel > 0) {
            if (blueDirection === 'up') newRow=(newRow+gridSize-1)%gridSize;
            if (blueDirection === 'down') newRow=(newRow+1)%gridSize;
            if (blueDirection === 'left') newCol=(newCol+gridSize-1)%gridSize;
            if (blueDirection === 'right') newCol=(newCol+1)%gridSize;
        }

        // Update bluePosition
        if (newRow !== row || newCol !== col) {
            bluePosition = { row: newRow, col: newCol }; // Update position
            if (cropGrid[newRow][newCol] === 10) cropGrid[newRow][newCol] = 1; // Harvest crop
            blueFuel--; // Use fuel
            // Handle farmhouse stopping (only stop once)
            if (bluePosition.row === farmhousePos && bluePosition.col === farmhousePos) {
                if (blueFuel < 100) {
                    blueDirection = 'stop';
                } else {
                    blueDirection = 'right';
                }
            }
        }

        createGrid(gridSize, cropGrid);
        updateFuelBar();
    }, 200);
}

// Swipe detection variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Listen for touchstart event to detect the starting position
document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
});

// Listen for touchend event to detect the ending position and determine swipe direction
document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipeGesture();
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

// Prevent scrolling
let scrollTop = window.scrollY || document.documentElement.scrollTop;
let scrollLeft = window.scrollX || document.documentElement.scrollLeft;

// if any scroll is attempted,
// set this to the previous value
window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop); // Prevent scrolling
    scrollTop = window.scrollY || document.documentElement.scrollTop; // Update values
    scrollLeft = window.scrollX || document.documentElement.scrollLeft;
};

playGame();