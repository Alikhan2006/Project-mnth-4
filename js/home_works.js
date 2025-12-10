// -------------------- 1. ВАЛИДАТОР GMAIL --------------------

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

gmailButton.addEventListener("click", () => {
    const value = gmailInput.value.trim();
    const gmailRegex = /^[a-zA-Z0-9._]+@gmail\.com$/;

    if (gmailRegex.test(value)) {
        gmailResult.textContent = "Почта валидная ✓";
        gmailResult.style.color = "limegreen";
    } else {
        gmailResult.textContent = "Неверный Gmail!";
        gmailResult.style.color = "red";
    }
});


// -------------------- 2. КРАСНЫЙ КВАДРАТ 2.0 --------------------

const child = document.querySelector(".child_block");
const parent = document.querySelector(".parent_block");

let x = 0;
let y = 0;
let direction = "right"; // right → down → left → up

function moveSquare() {
    const maxX = parent.clientWidth - child.clientWidth;
    const maxY = parent.clientHeight - child.clientHeight;

    if (direction === "right") {
        if (x < maxX) x++;
        else direction = "down";
    }

    else if (direction === "down") {
        if (y < maxY) y++;
        else direction = "left";
    }

    else if (direction === "left") {
        if (x > 0) x--;
        else direction = "up";
    }

    else if (direction === "up") {
        if (y > 0) y--;
        else direction = "right";
    }

    child.style.left = x + "px";
    child.style.top = y + "px";

    requestAnimationFrame(moveSquare);
}

moveSquare();


// -------------------- 3. СЕКУНДОМЕР --------------------

const secondsBlock = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let sec = 0;
let timer = null;

function updateSeconds() {
    secondsBlock.textContent = sec;
}

startBtn.addEventListener("click", () => {
    if (timer !== null) return; // защита от повторного запуска

    timer = setInterval(() => {
        sec++;
        updateSeconds();
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    sec = 0;
    updateSeconds();
});




