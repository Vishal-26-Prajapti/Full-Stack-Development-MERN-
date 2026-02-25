const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(e) {

    const index = e.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive)
        return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (currentPlayer === "X")
        e.target.classList.add("x");
    else
        e.target.classList.add("o");

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameActive)
        statusText.textContent = "Player " + currentPlayer + " Turn";

}   

function checkWinner() {

    for (let line of winningLines) {

        let a = line[0];
        let b = line[1];
        let c = line[2];

        if (gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]) {

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            statusText.textContent = "Player " + gameBoard[a] + " Wins!";
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "Draw!";
        gameActive = false;
    }

}

restartBtn.addEventListener("click", () => {

    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");
    });

    statusText.textContent = "Player X Turn";

});


document.addEventListener("mousemove", (e) => {

    let x = (e.clientY / window.innerHeight - 0.5) * 20;
    let y = (e.clientX / window.innerWidth - 0.5) * 20;

    board.style.transform =
        `rotateX(${-x}deg) rotateY(${y}deg)`;

});