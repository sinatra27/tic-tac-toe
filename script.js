// Object that stores the gameboard array
function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    // Create a 3x3 array for the gameboard
    // Row 0 will be the top row while Column 0 will be the left-most column
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    // Method to be used (later) by UI to render the gameboard
    const getBoard = () => board;

    // In order to mark a spot, we need to determine if it is available,
    // then change to the current player's mark
    const markCell = (row, col, playersMark) => {
        // Use passed-in row as index of outermost array and column as index of the inner array to
        // determine location of the player's selected cell.
        // Check if cell location is already marked and if so, do not allow player to mark it.
        // Using zeroes for now to show cell as available. If available, mark the player's selection. 
        if (row >= rows || col >= cols) {
            console.log('Cannot mark outside of the 3 x 3 gameboard, lost of turn smh...');
            return;
        } else if (board[row][col].getValue() === 0) {
                board[row][col].addMark(playersMark);
        } else {
            console.log('This cell has already been marked, lost of turn :(');
            // skip player's turn or switch player's turn here?
            return;
        } 
    };

    // Method to be used to print board to the console (console version only).
    // Will not be used (later) when UI is built
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { /*getBoard,*/ markCell, printBoard };
}

function Cell() {
    let value = 0;

    // Accept player's mark to change the value of the cell
    const addMark = (playersMark) => {
        value = playersMark;
    };

    // Retrieves current value of this cell through closure
    const getValue = () => value;

    return { addMark, getValue };
}

// GameController will be responsible for controlling the game flow, which player's turn it is,
// and determines if a player has won
function GameController(playerOne, playerTwo) {
    const gameboard = Gameboard();

    const players = [
        {
            name: playerOne,
            mark: 1
        },
        {
            name: playerTwo,
            mark: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayersTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const getActivePlayer = () => activePlayer;         // change this in UI version?
    
    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, col) => {
        // Mark a spot for the current player
        console.log(`Marking ${getActivePlayer().name}'s selection into row ${row}, column ${col}...`);
        gameboard.markCell(row, col, getActivePlayer().mark);

        // Add check for winner or tie and a message here

        // Switch players' turn
        switchPlayersTurn();
        printNewRound();
    };

    // Used for initial new game message
    printNewRound();

    return { playRound, getActivePlayer };
}

// for console version
const game = GameController('Player One', 'Player Two');
