let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let newGBtn = document.querySelector("#new-btn");
let resGBtn = document.querySelector("#reset-btn");
let winStat = document.querySelector(".win-stat");

let turnO = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winStat.classList.add("hide");
};

const showDraw = () => {
    winStat.innerText = `Game is a Draw`;
    winStat.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) => {
    winStat.innerText = `Congratulations! Winner is ${winner}`;
    winStat.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO) {
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    let hasWin = false;

    for (let pattern of winPattern) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
            console.log("Winner is", posVal1);
            showWinner(posVal1);
            hasWin = true;
        }
    }

    if (!hasWin) {
        let allFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allFilled = false;
            }
        }
        if (allFilled) {
            console.log("Game is a draw");
            showDraw();
        }
    }
};

newGBtn.addEventListener("click", resetGame);
resGBtn.addEventListener("click", resetGame);
