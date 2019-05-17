let fieldArr;
const row = 10;
const column = 10;
let scoreUser = 0;
let scoreComp = 0;
const initElement = {
    owner: 0, // 0 - синий, 1 - желтый, 2 - зеленый,юзер, 3 - крассный, комп
};

let timeOut = null;
let modal = $('.cover, .modal, .content');

function initArray() {
    fieldArr = [];
    // Первый перебор по количеству строк
    for (let i = 0; i < row; i++) {
        // создается массив пустой строки
        const rowArr = [];
        // Второй перебор по количестку элементов в строке
        for (let j = 0; j < column; j++) {
            // Добавляем в ранее созданную пустую строку элементы
            rowArr.push({ ...initElement
        });
        }
        // Добавляем заполненную строку в массив Поля
        fieldArr.push(rowArr);
    }
}
initArray();

function init() {
    buildField();
    $('.btn').on('click', () => {
        clearTimeout(timeOut);
    startGame();
});
    $('.stop').on('click', () => {
        clearTimeout(timeOut);
    initArray();
    scoreUser = 0;
    scoreComp = 0;
    buildField();
    score();
});
    $('.modal').click(function() {
        modal.fadeOut();
        initArray();
        scoreUser = 0;
        scoreComp = 0;
        buildField();
        score();
    });
}
// Метод построения поля
function buildField() {
    $('.field').empty();
    // Перебераем все СТРОКИ поля
    fieldArr.forEach((item, i) => {
        // создаем класс для строки ( row-0, row-1, row-2 ..... )
        const rowClass = `row-${i}`;
    // находим блок в который добавим строку
    $('.field')
    // добавляем div c классом строки в поле
        .append($(`<div class='${rowClass}'></div>`));
    // перебераем все елементы в cтроке
    item.forEach((elem, j) => {
        // создаем класс для елемента ( element-0, element-1, element-2 ..... )
        const ownerColor = getColorByOwner(elem.owner);
    const elementClass = `${ownerColor} element-${j}`
    // Находи див строки для которой будем вставлять елементы
    $(`.${rowClass}`)
    // добавляем дивы элементов с классом елемента
        .append($(`<div class='${elementClass}'></div>`))
});
});
}
// выбираем рандомный элемент
function getRandomElement() {
    let randRow = Math.floor(Math.random() * fieldArr.length);
    let randArr = fieldArr[randRow];
    let randElement = Math.floor(Math.random() * randArr.length);
    let randomResult = randArr[randElement];
    // смотрим был ли задействован элемент
    if (randomResult.owner === 0) {
        return randomResult;
    } else {
        return getRandomElement();
    }
}
// определяем цвет элемента
function getColorByOwner(owner) {
    let colorClass = 'blue';
    switch (owner) {
        case 1:
        {
            colorClass = 'yellow';
            break;
        }
        case 2:
        {
            colorClass = 'green';
            break;
        }
        case 3:
        {
            colorClass = 'red';
            break;
        }
        default:
    }
    return colorClass;
}

function score() {
// Перебераем все СТРОКИ
    fieldArr.forEach((item, i) => {
        // перебераем все елементы в cтроке
        item.forEach((elem, j) => {
        // определяем кому принадлежит поле и добавляем 1
        if (elem.owner === 2) {
        scoreUser += 1;
    } else if (elem.owner === 3) {
        scoreComp += 1;
    }
});
});
    // вставляем в span результаты
    $('.pl').html(scoreUser);
    $('.comp').html(scoreComp);
}

function game() {
// обнуляем результат
    scoreUser = 0;
    scoreComp = 0;
    let newElement = getRandomElement();
    // рандомному элементу даем желтый цвет
    newElement.owner = 1;
    buildField();
    score();
    //при нажатии на желтый элемент
    $(".yellow").on('click', () => {
        // отменяем функцию timeOut
        clearTimeout(timeOut);
    timeOut = null;
    // рандомному элементу даем зеленый цвет
    newElement.owner = 2;
    game();
});
    // функция срабатывающая через определенное время
    timeOut = setTimeout(() => {
        // рандомному элементу даем красный
        newElement.owner = 3;
    clearTimeout(timeOut);
    timeOut = null;
    game();
    //событие через время введенное пользователем в input
}, $('.time').val());
    if (scoreUser > 9 || scoreComp > 9) {
        clearTimeout(timeOut);
        timeOut = null;
        modal.fadeIn();
    }
}

function startGame() {
    console.log('startGame');
    initArray();
    game();
}

// Start init
init();