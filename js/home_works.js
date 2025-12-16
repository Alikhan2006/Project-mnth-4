// ===== Красный квадрат =====
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

// ===== Секундомер =====
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

// ===== Авто таб-слайдер =====
const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');

let tabIndex = 0;

function hideTabs() {
    tabsContent.forEach(item => item.classList.add('hide'));
    tabsContent.forEach(item => item.classList.remove('show'));
    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
}

function showTab(i) {
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

if (tabs.length > 0) {
    hideTabs();
    showTab(tabIndex);

    setInterval(() => {
        tabIndex++;
        if (tabIndex >= tabs.length) tabIndex = 0;
        hideTabs();
        showTab(tabIndex);
    }, 3000);
}

// ===== Модальное окно =====
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

// Открыть по скроллу один раз
function showModalOnScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalOnScroll);
    }
}
window.addEventListener('scroll', showModalOnScroll);

// Открыть через 10 секунд после загрузки
setTimeout(() => openModal(), 10000);

// ===== XHR Запросы (JSON) =====
const xhrCharacters = new XMLHttpRequest();
xhrCharacters.open('GET', '../data/characters.json');
xhrCharacters.setRequestHeader('Content-Type', 'application/json');
xhrCharacters.send();

xhrCharacters.onload = () => {
    if (xhrCharacters.status === 200) {
        const data = JSON.parse(xhrCharacters.response);
        const block = document.querySelector('.characters-list');
        block.innerHTML = '';
        data.forEach(item => {
            block.innerHTML += `
                <div class="card">
                    <img src="${item.photo}" alt="${item.name}" />
                    <h3>${item.name}</h3>
                    <p>Возраст: ${item.age}</p>
                </div>
            `;
        });
    }
};

const xhrAny = new XMLHttpRequest();
xhrAny.open('GET', '../data/data.json');
xhrAny.responseType = 'json';
xhrAny.send();

xhrAny.onload = () => {
    if (xhrAny.status === 200) console.log(xhrAny.response);
};

// ===== Конвертер валют (SOM, USD, EUR) =====
const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

const rates = {
    som: 1,
    usd: 87,   // 1 USD = 87 SOM
    eur: 100   // 1 EUR = 100 SOM
};

function convertFromSom() {
    const som = parseFloat(somInput.value) || 0;
    usdInput.value = (som / rates.usd).toFixed(2);
    eurInput.value = (som / rates.eur).toFixed(2);
}
function convertFromUsd() {
    const usd = parseFloat(usdInput.value) || 0;
    somInput.value = (usd * rates.usd).toFixed(2);
    eurInput.value = ((usd * rates.usd) / rates.eur).toFixed(2);
}
function convertFromEur() {
    const eur = parseFloat(eurInput.value) || 0;
    somInput.value = (eur * rates.eur).toFixed(2);
    usdInput.value = ((eur * rates.eur) / rates.usd).toFixed(2);
}

somInput.addEventListener('input', convertFromSom);
usdInput.addEventListener('input', convertFromUsd);
eurInput.addEventListener('input', convertFromEur);



