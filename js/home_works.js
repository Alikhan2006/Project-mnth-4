const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

let direction = 'right';

function moveBlock() {
    if (direction === 'right') {
        if (positionX < maxX) positionX++;
        else direction = 'down';
    } else if (direction === 'down') {
        if (positionY < maxY) positionY++;
        else direction = 'left';
    } else if (direction === 'left') {
        if (positionX > 0) positionX--;
        else direction = 'up';
    } else if (direction === 'up') {
        if (positionY > 0) positionY--;
        else direction = 'right';
    }

    childBlock.style.left = positionX + 'px';
    childBlock.style.top = positionY + 'px';

    requestAnimationFrame(moveBlock);
}

moveBlock();


const secondsElement = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let counter = 0;
let intervalId = null;

function renderCounter() {
    secondsElement.textContent = counter;
}

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


const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');

let tabIndex = 0;

function hideTabs() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show');
    });
    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
}

function showTab(i) {
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabs();
showTab(tabIndex);

setInterval(() => {
    tabIndex++;
    if (tabIndex >= tabs.length) tabIndex = 0;
    hideTabs();
    showTab(tabIndex);
}, 3000);


const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

// --- 4.1 по скроллу один раз ---
function showModalOnScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalOnScroll);
    }
}
window.addEventListener('scroll', showModalOnScroll);

setTimeout(() => {
    openModal();
}, 10000);


const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/characters.json');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send();

xhrx.onload = () => {
    const data = JSON.parse(xhr.response);

    const block = document.querySelector('.characters-list');
    block.innerHTML = "";

    data.forEach(item => {
        block.innerHTML += `
            <div class="card">
                <img src="${item.photo}" alt="${item.name}" />
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
        console.log(xhr.response);
    };
}

getJSON();


