const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

let direction = 'right'; // right → down → left → up

const moveBlock = () => {
    if (direction === 'right') {
        if (positionX < maxX) {
            positionX++;
        } else {
            direction = 'down';
        }
    } else if (direction === 'down') {
        if (positionY < maxY) {
            positionY++;
        } else {
            direction = 'left';
        }
    } else if (direction === 'left') {
        if (positionX > 0) {
            positionX--;
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY--;
        } else {
            direction = 'right';
        }
    }

    childBlock.style.left = positionX + 'px';
    childBlock.style.top = positionY + 'px';

    requestAnimationFrame(moveBlock);
};

moveBlock();


const secondsElement = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let counter = 0;
let intervalId = null;

const renderCounter = () => {
    secondsElement.textContent = counter;
};

startBtn.addEventListener('click', () => {
    if (intervalId !== null) return; // защита от повторного запуска

    intervalId = setInterval(() => {
        counter++;
        renderCounter();
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    counter = 0;
    renderCounter();
});
