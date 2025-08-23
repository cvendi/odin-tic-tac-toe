
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

        const playerInfo = document.querySelector("#player-info");

        // Player one info card content
        const playerOneDiv = document.createElement('div');
        playerOneDiv.classList.add('player-one');

        const playerOneName = document.createElement('p');
        playerOneName.classList.add('player-one-name')
        playerOneName.textContent = `Name: ${player1.name}`;

        const playerOneScore = document.createElement('p');
        playerOneScore.classList.add('player-one-score');
        playerOneScore.textContent = `Score: ${player1.getScore()}`;

        const playerOneMarker = document.createElement('p');
        playerOneMarker.classList.add(`player-one-marker`);
        playerOneMarker.textContent = `Marker: ${player1.marker}`;

        playerInfo.appendChild(playerOneDiv);
        playerOneDiv.appendChild(playerOneName);
        playerOneDiv.appendChild(playerOneScore);
        playerOneDiv.appendChild(playerOneMarker);

        // Player two info card content
        const playerTwoDiv = document.createElement('div');
        playerTwoDiv.classList.add('player-two');

        const playerTwoName = document.createElement('p');
        playerTwoName.classList.add('player-two-name');
        playerTwoName.textContent = `Name: ${player2.name}`;

        const playerTwoScore = document.createElement('p');
        playerTwoScore.classList.add(`player-two-score`);
        playerTwoScore.textContent = `Score: ${player2.getScore()}`;

        const playerTwoMarker = document.createElement('p');
        playerTwoMarker.classList.add(`player-two-marker`);
        playerTwoMarker.textContent = `Marker: ${player2.marker}`;

        playerInfo.appendChild(playerTwoDiv);
        playerTwoDiv.appendChild(playerTwoName);
        playerTwoDiv.appendChild(playerTwoScore);
        playerTwoDiv.appendChild(playerTwoMarker);
    };

    const createGameBoard = () => {
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
        let size = 3 * 3;

        for (let i = 0; i < size; i++) {
            const gameBoardDiv = document.querySelector('#game-board');
            const square = document.createElement('div');

            gameBoardDiv.style.width = '600px';
            gameBoardDiv.style.height = '600px';
            square.classList.add('board-cell');

            square.style.width = '200px';
            square.style.height = '200px';
            square.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            gameBoardDiv.appendChild(square);
        };
    }

    const updateGameBoard = () => {
        const gameBoardDiv = document.querySelector('#game-board');
    }

    const simulateGameplay = () => {
        gameController.playerMove(0, player1);
        gameController.playerMove(1, player2);
        gameController.playerMove(3, player1);
        gameController.playerMove(5, player2);
        gameController.playerMove(6, player1);

        updateGameBoard();
    };

    return { updatePlayerInfo, simulateGameplay, createGameBoard };
})();

displayController.createGameBoard();
displayController.simulateGameplay();
displayController.updatePlayerInfo();
