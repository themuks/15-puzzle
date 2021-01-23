"use strict";

let gameField = [];

window.onload = () => {
    for (let i = 0; i < 16; i++) {
        gameField.push(i + 1);
    }
    randomizeGameField(gameField);
    let chips = document.querySelectorAll('.game-field__chip');
    chips.forEach((e) => {
        e.addEventListener('click', () => {
            chipOnClick(e.innerHTML);
        });
    });
    redrawGameField(gameField);
};

function chipOnClick(text) {
    let clickedChipIndex = gameField.indexOf(Number(text));
    let emptyChipIndex = gameField.indexOf(16);
    if (isEmptyChipNear(clickedChipIndex, emptyChipIndex)) {
        const temp = gameField[clickedChipIndex];
        gameField[clickedChipIndex] = gameField[emptyChipIndex];
        gameField[emptyChipIndex] = temp;
    }
    setTimeout(() => {
        if (isWinPosition(gameField)) {
            alert("You won!");
        }
    }, 100);
    redrawGameField(gameField);
}

function isEmptyChipNear(clickedChipIndex, emptyChipIndex) {
    switch (clickedChipIndex) {
        case emptyChipIndex + 1:
        case emptyChipIndex + 4:
        case emptyChipIndex - 1:
        case emptyChipIndex - 4:
            return true;
        default:
            return false;
    }
}

function redrawGameField(gameField) {
    let chips = document.querySelectorAll('.game-field__chip');
    for (let i = 0; i < 16; i++) {
        chips[i].innerHTML = gameField[i];
        if (gameField[i] != 16) {
            chips[i].className = 'game-field__chip';
        } else {
            chips[i].className = 'game-field__chip game-field__chip--active';
        }
    }
}

function randomizeGameField(gameField) {
    let length = gameField.length;
    for (let i = 0; i < length; i++) {
        let randomInt = Math.floor(Math.random(length) * length);
        const temp = gameField[i];
        gameField[i] = gameField[randomInt];
        gameField[randomInt] = temp;
    }
}

function isWinPosition(gameField) {
    for (let i = 0; i < 16; i++) {
        if (gameField[i] != i + 1) {
            return false;
        }
    }
    return true;
}