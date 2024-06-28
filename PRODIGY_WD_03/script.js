document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const singlePlayerButton = document.getElementById('singlePlayer');
    const twoPlayerButton = document.getElementById('twoPlayer');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let singlePlayerMode = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const updateStatus = () => {
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                break;
            }
        }
        if (roundWon) {
            statusDisplay.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            setTimeout(resetGame, 2000);
            return;
        }

        if (!gameState.includes('')) {
            statusDisplay.innerText = 'Game is a draw!';
            gameActive = false;
            setTimeout(resetGame, 2000);
        }
    };

    const handleCellClick = (e) => {
        const cellIndex = e.target.getAttribute('data-index');

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        e.target.innerText = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());
        checkWin();

        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();

            if (singlePlayerMode && currentPlayer === 'O') {
                handleAIMove();
            }
        }
    };

    const minimax = (newGameState, player) => {
        const availableCells = newGameState.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        if (checkWinForMinimax(newGameState, 'X')) return { score: -10 };
        if (checkWinForMinimax(newGameState, 'O')) return { score: 10 };
        if (availableCells.length === 0) return { score: 0 };

        const moves = [];
        for (let i = 0; i < availableCells.length; i++) {
            const move = {};
            move.index = availableCells[i];
            newGameState[availableCells[i]] = player;

            if (player === 'O') {
                const result = minimax(newGameState, 'X');
                move.score = result.score;
            } else {
                const result = minimax(newGameState, 'O');
                move.score = result.score;
            }

            newGameState[availableCells[i]] = '';
            moves.push(move);
        }

        let bestMove;
        if (player === 'O') {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    };

    const checkWinForMinimax = (newGameState, player) => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (newGameState[a] === player && newGameState[b] === player && newGameState[c] === player) {
                return true;
            }
        }
        return false;
    };

    const handleAIMove = () => {
        const bestMove = minimax(gameState, 'O').index;
        gameState[bestMove] = 'O';
        cells[bestMove].innerText = 'O';
        cells[bestMove].classList.add('o');
        checkWin();

        if (gameActive) {
            currentPlayer = 'X';
            updateStatus();
        }
    };

    const resetGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('x', 'o', 'win');
        });
        updateStatus();
    };

    singlePlayerButton.addEventListener('click', () => {
        singlePlayerMode = true;
        resetGame();
    });

    twoPlayerButton.addEventListener('click', () => {
        singlePlayerMode = false;
        resetGame();
    });

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    updateStatus();
});
