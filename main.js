
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
            console.log(board[index])
            return true;
        } else {
            displayController.invalidMoveNotification(index);
            return false;
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    };

    return { getBoard, setCell, resetBoard };
})();

const gameController = (() => {

    const players = [];
    let currentPlayerIndex = 0;

    const addPlayer = (player) => {
        players.push(player);
        console.log(`Player ${player.name} added.`);
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const playerMove = (index) => {
        if (gameBoard.setCell(index, players[currentPlayerIndex].marker)) {

            console.log(`Board after ${players[currentPlayerIndex].name}'s move:`, gameBoard.getBoard());

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
                    condition.every(index => board[index] === players[currentPlayerIndex].marker)
                );
            };

            if (checkWin()) {
                players[currentPlayerIndex].incrementScore();
                console.log(`${players[currentPlayerIndex].name} wins!`);

                gameBoard.resetBoard();
                displayController.resetBoard();
                displayController.declareWinner(players[currentPlayerIndex]);

                return true;
            }

            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            return true;
        }
        return false;
    };


    return { playerMove, addPlayer, getCurrentPlayer };
})();

const displayController = (() => {

    /* const playerOneNameInput = document.querySelector('#player-one-name-input');
    const playerOneName = playerOneNameInput.textContent()
    const playerTwoNameInput = document.querySelector('#player-two-name-input');
    const playerTwoName = playerTwoNameInput.textContent() */

    const player1 = createPlayer('Alice', 'X');
    const player2 = createPlayer('Bob', 'O');

    gameController.addPlayer(player1);
    gameController.addPlayer(player2);

    const updatePlayerInfo = () => {

        // Player one info card content
        const playerOneDiv = document.querySelector('#player-one');
        const playerOneNameLabel = document.querySelector('#player-one-name');
        const playerOneScore = document.querySelector('#player-one-score');
        const playerOneMarker = document.querySelector('#player-one-marker');

        playerOneNameLabel.textContent = `Name: ${player1.name}`;
        playerOneScore.textContent = `Score: ${player1.getScore()}`;
        playerOneMarker.textContent = `Marker: ${player1.marker}`;

        // Player two info card content
        const playerTwoDiv = document.querySelector('#player-two');
        const playerTwoNameLabel = document.querySelector('#player-two-name');
        const playerTwoScore = document.querySelector('#player-two-score');
        const playerTwoMarker = document.querySelector('#player-two-marker');

        playerTwoNameLabel.textContent = `Name: ${player2.name}`;
        playerTwoScore.textContent = `Score: ${player2.getScore()}`;
        playerTwoMarker.textContent = `Marker: ${player2.marker}`;
    };

    const renderGameBoard = (player) => {
        let size = 3 * 3;

        for (let i = 0; i < size; i++) {
            const gameBoardDiv = document.querySelector('#game-board');
            const square = document.createElement('div');

            square.classList.add('board-cell');

            square.style.width = '200px';
            square.style.height = '200px';

            square.addEventListener('click', () => {
                const container = document.querySelector('#container');
                const winnerDeclaration = document.querySelector('.winner-declaration');
                if (winnerDeclaration) {
                    container.removeChild(winnerDeclaration);
                };
                if (gameController.playerMove(i)) {
                    square.textContent = gameController.getCurrentPlayer().marker;
                } else {
                    console.log('Invalid move detected.');
                };
            });

            gameBoardDiv.appendChild(square);
        };
    }

    const resetBoard = () => {
        const gameBoardDiv = document.querySelector('#game-board');
        while (gameBoardDiv.firstChild) {
            gameBoardDiv.removeChild(gameBoardDiv.firstChild);
        }
        renderGameBoard();
    };

    const declareWinner = (player) => {
        const container = document.querySelector('#container');
        const winnerDiv = document.createElement('div');
        winnerDiv.classList.add('winner-declaration');
        winnerDiv.textContent = `${player.name} wins!`;
        container.appendChild(winnerDiv);
    };

    const invalidMoveNotification = (index) => {
        console.log(`${index} is already occupied!`);
    }

    const init = () => {
        displayController.renderGameBoard();
        displayController.updatePlayerInfo();
    };

    return { updatePlayerInfo, renderGameBoard, resetBoard, declareWinner, invalidMoveNotification, init };
})();

displayController.init();
