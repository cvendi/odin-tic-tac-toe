
const createPlayer = (name, marker) => {
    let score = 0;
    return { 
        name, 
        marker, 
        getScore: () => score,
        incrementScore: () => ++score,
        resetScore: () => { score = 0; }
    };
};

const gameBoard = (() => {
    const board = Array(9).fill(null);

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (index >= 0 && index < 9 && !board[index]) {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    };

    return { getBoard, setCell, resetBoard };
})();

const gameController = (() => {

    const playerMove = (index, player) => {
        console.log(`${player.name} is attempting to place ${player.marker} at index ${index}`);
        if (gameBoard.setCell(index, player.marker)) {

            const checkWin = () => {
                const board = gameBoard.getBoard();
                console.log(board);
                const winConditions = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];
                return winConditions.some(condition => 
                    condition.every(index => board[index] === player.marker)
                );
            };

            if (checkWin()) {
                player.incrementScore();
                console.log(`${player.name} wins!`);
                gameBoard.resetBoard();
            };
            return true;
        }
        return false;
    };

    return { playerMove };
})();

const player1 = createPlayer('Alice', 'X');
const player2 = createPlayer('Bob', 'O');

gameController.playerMove(0, player1);
gameController.playerMove(1, player2);
gameController.playerMove(3, player1);
gameController.playerMove(5, player2);
gameController.playerMove(6, player1);

console.log(`${player1.name}: ${player1.getScore()} - ${player2.name}: ${player2.getScore()}`);