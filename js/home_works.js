const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

gmailButton.addEventListener("click", () => {
    const value = gmailInput.value.trim();
    const gmailRegexp = /^[a-zA-Z0-9._]+@gmail\.com$/;

    if (gmailRegexp.test(value)) {
        gmailResult.textContent = "Почта валидная ✓";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Неверный Gmail!";
        gmailResult.style.color = "red";
    }
});


const child = document.querySelector(".child_block");
const parent = document.querySelector(".parent_block");

let position = 0;

function moveBlock() {
    const max = parent.clientWidth - child.clientWidth;

    if (position <= max) {
        child.style.left = position + "px";
        position += 2;  // скорость движения
        setTimeout(moveBlock, 10); // рекурсия
    }
}

moveBlock();


const secondsBlock = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let sec = 0;
let intervalId = null;

startBtn.addEventListener("click", () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            sec++;
            secondsBlock.textContent = sec;
        }, 1000);
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    sec = 0;
    secondsBlock.textContent = 0;
});
