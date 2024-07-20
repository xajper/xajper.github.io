document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button-option");
    const message = document.getElementById("message");
    const popup = document.querySelector(".popup");
    const restartButton = document.getElementById("restart");
    const newGameButton = document.getElementById("new-game");
    let currentPlayer = "❌";
    let board = ["", "", "", "", "", "", "", "", ""];

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes("") ? null : "Draw";
    };

    const updateHoverEffect = () => {
        buttons.forEach(button => {
            button.classList.remove("hover-x", "hover-o");
            if (!button.textContent) {
                button.classList.add(currentPlayer === "❌" ? "hover-x" : "hover-o");
            }
        });
    };

    const handleClick = (e, index) => {
        if (!board[index]) {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            const winner = checkWin();
            if (winner) {
                message.textContent = winner === "Draw" ? "Remis!" : `${winner} wygrywa!`;
                popup.classList.add("show");
            } else {
                currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
                updateHoverEffect();
            }
        }
    };

    buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => handleClick(e, index));
    });

    restartButton.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        buttons.forEach(button => button.textContent = "");
        currentPlayer = "X";
        updateHoverEffect();
    });

    newGameButton.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        buttons.forEach(button => button.textContent = "");
        currentPlayer = "❌";
        popup.classList.remove("show");
        updateHoverEffect();
    });

    updateHoverEffect();
});
