// Object that stores the gameboard array
function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    // Create a 3x3 2-D array for gameboard
    // Row 0 will be the top row while Column 0 will be left-most column
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
    const markCell = (row, col, player) => {

    };

    // Method to be used to print board to the console. 
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
    const addMark = (player) => {
        value = player;
    };

    // Retrieves current value of this cell through closure
    const getValue = () => value;

    return { addMark, getValue };
}


// for testing
const game = Gameboard();
