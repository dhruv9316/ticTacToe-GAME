const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game-status");
const newGameButton = document.querySelector(".btn");


let playingPlayer;
let gameMatrix;

const winningCellsCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function startGame() {
    playingPlayer = "X";
    gameMatrix = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    cells.forEach((cell, position) => {
        cell.innerText = "";
        cells[position].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        cell.classList = `cell cell${position+1}`;
    });
    newGameButton.classList.remove("active");
    gameStatus.innerText = `Player - ${playingPlayer}`;
}

startGame();

function changePlayer() {
    if(playingPlayer === "X") {
        playingPlayer = "O";
    }
    else {
        playingPlayer = "X";
    }
    
    //UI Update
    gameStatus.innerText = `Player - ${playingPlayer}`;
}

function isGameOver() {
    let result = "";

    winningCellsCombo.forEach((index) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameMatrix[index[0]] !== "" || gameMatrix[index[1]] !== "" || gameMatrix[index[2]] !== "") 
            && (gameMatrix[index[0]] === gameMatrix[index[1]] ) && (gameMatrix[index[1]] === gameMatrix[index[2]])) {

                //check if winner is X
                if(gameMatrix[index[0]] === "X") 
                    result = "X";
                else {
                    result = "O";
                } 
                    

                //disable pointer events
                cells.forEach((cell) => {
                    cell.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                cells[index[0]].classList.add("win");
                cells[index[1]].classList.add("win");
                cells[index[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(result !== "" ) {
        gameStatus.innerText = `Winner - ${result}`;
        newGameButton.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let filledCells = 0;
    gameMatrix.forEach((cell) => {
        if(cell !== "" )
            filledCells++;
    });

    //board is Filled, game is TIE
    if(filledCells === 9) {
        gameStatus.innerText = "Game is Tied !";
        newGameButton.classList.add("active");
    }

}

function manageClick(index) {
    if(gameMatrix[index] === "" ) {
        //for UI...
        cells[index].innerText = playingPlayer;
        //for Scripting...
        gameMatrix[index] = playingPlayer;
        cells[index].style.pointerEvents = "none";
        //swap karo turn ko
        changePlayer();
        //check karo ke koi jeet toh nahi gya
        isGameOver();
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        manageClick(index);
    })
});

newGameButton.addEventListener("click", startGame);