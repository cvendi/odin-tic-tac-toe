
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
        return false; // Move was invalid or cell already occupied
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
                 // If every index in any win condition contains the player's marker,
                 // Player wins the game
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

const displayController = (() => {

    const player1 = createPlayer('Alice', 'X');
    const player2 = createPlayer('Bob', 'O');

    const updatePlayerInfo = () => {

        const container = document.querySelector("container");
        const playerInfo = document.querySelector("#player-info");

        // Player one info card content
        const playerOneDiv = document.createElement('div');
        playerOneDiv.classList.add(player1.name.toLowerCase());
        playerOneDiv.textContent = `Name: ${player1.name}`;

        const playerOneScore = document.createElement('div');
        playerOneScore.classList.add(`${player1.name.toLowerCase()}-score`);
        playerOneScore.textContent = `Score: ${player1.getScore()}`;

        const playerOneMarker = document.createElement('div');
        playerOneMarker.classList.add(`${player1.name.toLowerCase()}-marker`);
        playerOneMarker.textContent = `Marker: ${player1.marker}`;

        playerInfo.appendChild(playerOneDiv);
        playerOneDiv.appendChild(playerOneScore);
        playerOneDiv.appendChild(playerOneMarker);

        // Player two info card content
        const playerTwoDiv = document.createElement('div');
        playerTwoDiv.classList.add(player2.name.toLowerCase());
        playerTwoDiv.textContent = `Name: ${player2.name}`;

        const playerTwoScore = document.createElement('div');
        playerTwoScore.classList.add(`${player2.name.toLowerCase()}-score`);
        playerTwoScore.textContent = `Score: ${player2.getScore()}`;

        const playerTwoMarker = document.createElement('div');
        playerTwoMarker.classList.add(`${player2.name.toLowerCase()}-marker`);
        playerTwoMarker.textContent = `Marker: ${player2.marker}`;

        playerInfo.appendChild(playerTwoDiv);
        playerTwoDiv.appendChild(playerTwoScore);
        playerTwoDiv.appendChild(playerTwoMarker);
    };

    const simulateGameplay = () => {
        gameController.playerMove(0, player1);
        gameController.playerMove(1, player2);
        gameController.playerMove(3, player1);
        gameController.playerMove(5, player2);
        gameController.playerMove(6, player1);
    };

    return { updatePlayerInfo, simulateGameplay };
})();

displayController.simulateGameplay();
displayController.updatePlayerInfo();
