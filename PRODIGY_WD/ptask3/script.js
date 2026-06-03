// 1. Target interface layout items
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');

// 2. Track internal game parameters
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tracks board strings state
let isGameActive = true;

// 3. Mathematical indexes arrays showing every winning line combo
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// 4. Action handle for square clicks
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Block logic clicks if cell is already full or game ended
    if (gameState[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Register active marker to board
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === "X" ? "x-marker" : "o-marker");

    checkResult();
}

// 5. Evaluate matching scenarios state
function checkResult() {
    let roundWon = false;

    // Run verification filter across all predefined paths
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // Skip completely if any tracking cell block is blank
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // Match line successfully verified
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
        statusMessage.style.color = "#2ecc71"; // Turn message green
        isGameActive = false;
        return;
    }

    // Handle Draws (If there are no empty strings left in gameState)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusMessage.textContent = "Game ended in a Draw! 🤝";
        statusMessage.style.color = "#95a5a6";
        isGameActive = false;
        return;
    }

    // Toggle player turn rotation assignment if no conclusions yet
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// 6. Reset parameters system clean sweep handler
function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusMessage.textContent = "Player X's turn";
    statusMessage.style.color = "#f39c12";

    // Revert visual squares
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x-marker', 'o-marker');
    });
}

// 7. Initialize event click trackers
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);