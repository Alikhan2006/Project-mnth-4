const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

const gmailReg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener('click', () => {
    const value = gmailInput.value.trim();

    if (gmailReg.test(value)) {
        gmailResult.textContent = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'ERROR';
        gmailResult.style.color = 'red';
    }
});


const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

const parentWidth = parentBlock.clientWidth - childBlock.offsetWidth;
const parentHeight = parentBlock.clientHeight - childBlock.offsetHeight;

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    if (positionY === 0 && positionX < parentWidth) {
        positionX++;
    } else if (positionX === parentWidth && positionY < parentHeight) {
        positionY++;
    } else if (positionY === parentHeight && positionX > 0) {
        positionX--;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
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
    if (intervalId !== null) return;

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


const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/characters.json');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send();

xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    const block = document.querySelector('.characters-list');

    block.innerHTML = '';

    data.forEach(item => {
        block.innerHTML += `
            <div class="card">
                <img src="${item.photo}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Возраст: ${item.age}</p>
            </div>
        `;
    });
};


function getJSON() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/data.json');
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = () => {
        console.log('ANY JSON:', xhr.response);
    };
}

getJSON();


const card = document.querySelector('.slide_card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let cardId = 1;
const MAX = 200;

function loadCard(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            card.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        });
}

loadCard(cardId);

nextBtn.addEventListener('click', () => {
    cardId++;
    if (cardId > MAX) cardId = 1;
    loadCard(cardId);
});

prevBtn.addEventListener('click', () => {
    cardId--;
    if (cardId < 1) cardId = MAX;
    loadCard(cardId);
});


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        console.log('FETCH POSTS:', data);
    });


