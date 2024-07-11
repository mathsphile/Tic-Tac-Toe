const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let count = 0; // To track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const handleBoxClick = (e) => {
    const box = e.target;
    box.innerText = turnO ? "O" : "X";
    box.setAttribute("aria-label", `Cell occupied by ${box.innerText}`);
    turnO = !turnO;
    box.disabled = true;
    count++;

    if (checkWinner()) {
        return;
    }

    if (count === 9) {
        gameDraw();
    }
};

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.setAttribute("aria-label", "Empty");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const boxA = boxes[a].innerText;
        const boxB = boxes[b].innerText;
        const boxC = boxes[c].innerText;

        if (boxA && boxA === boxB && boxB === boxC) {
            showWinner(boxA);
            return true;
        }
    }
    return false;
};

boxes.forEach(box => box.addEventListener("click", handleBoxClick));
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
