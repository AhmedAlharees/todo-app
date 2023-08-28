// dom
const themeBtn = document.querySelector('.header__theme-icon');
const themeImg = document.querySelector('.theme-img');
const body = document.querySelector('body');
const tasksContainer = document.querySelector('.tasks');
const taskElements = document.querySelectorAll('.task');
const todoInput = document.querySelector('#create-todo');
const clear = document.querySelector('.tasks__clear');
const inputCircle = document.querySelector('.input__circle');
const checkBox = document.querySelectorAll('.task__checkbox');
const itemsSpan = document.querySelector('.tasks__num');
const clearCompleteBtn = document.querySelector('.clear-complete-btn');
const showAllBtn = document.querySelector('.filters__all');
const showActiveBtn = document.querySelector('.filters__active');
const showCompletedBtn = document.querySelector('.filters__completed');

// global variable
let doneTasks = 0;

body.onload = () => {
  showItems();
};

const darkMode = function () {
  body.style.backgroundColor = 'hsl(235, 21%, 11%)';
};
const showItems = function () {
  itemsSpan.textContent = tasksContainer.childElementCount - 1 - doneTasks;
};
const createNewTask = function (text) {
  const newTask = document.createElement('article');
  newTask.className = 'task';
  newTask.innerHTML = `
  <div class="task__checkbox">
  <img src="./images/icon-check.svg" alt="">
    </div>
    <p class="task__text">${todoInput.value}</p>
    <div class="task__cancel">
      <img src="./images/icon-cross.svg" alt="">
    </div>
  `;
  tasksContainer.insertBefore(newTask, clear);
  showItems();
};

const changeInputCircle = function () {
  inputCircle.classList.add('circle');
};

const taskDone = function (currentElement) {
  if (currentElement.classList.contains('task-done')) doneTasks -= 1;
  else {
    doneTasks += 1;
  }
  currentElement.classList.toggle('task-done');
  showItems();
};

const deletTask = function (toDelete) {
  if (toDelete.classList.contains('task-done')) {
    doneTasks -= 1;
    showItems();
  }
  tasksContainer.removeChild(toDelete);
  showItems();
};

const clearCompletedTasks = function () {
  /*
  used an array because some when 
  nodes where adjacent they wont get deleted 
  */
  const nodesToBeDeleted = [];

  tasksContainer.childNodes.forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.classList.contains('task-done')
    ) {
      nodesToBeDeleted.push(node);
    }
  });

  nodesToBeDeleted.forEach((node) => {
    deletTask(node);
  });
};

const showActiveFunc = function () {
  showAllFunc();
  const tasksArray = [...tasksContainer.childNodes];
  tasksArray.forEach((node) => {
    console.log(node);
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.classList.contains('task-done')
    ) {
      node.classList.add('hide');
    }
  });
};

const showAllFunc = function () {
  tasksContainer.childNodes.forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.classList.contains('task')
    ) {
      node.classList.remove('hide');
    }
  });
};

const showCompletedFunc = function () {
  showAllFunc();
  const tasksArray = [...tasksContainer.childNodes];
  tasksArray.forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      !node.classList.contains('task-done') &&
      node.classList.contains('task')
    ) {
      node.classList.add('hide');
    }
  });
};

tasksContainer.addEventListener('pointerdown', (e) => {
  const elementClassName = e.target.classList;
  const clearElement = e.target.parentElement.classList;
  if (elementClassName.contains('task__checkbox')) {
    taskDone(e.target.parentElement);
  }
  if (clearElement.contains('task__cancel')) {
    deletTask(e.target.parentElement.parentElement);
  }
});

todoInput.addEventListener('keydown', (e) => {
  const taskValue = todoInput.value;
  if (e.key === 'Enter' && taskValue) {
    createNewTask(e.value);
    todoInput.value = '';
    changeInputCircle();
  }
});

themeBtn.addEventListener('pointerdown', (e) => {
  if (themeImg.src.includes('icon-moon.svg')) {
    themeImg.src = `./images/icon-sun.svg`;
    darkMode();
  } else {
    themeImg.src = `./images/icon-moon.svg`;
  }
});

clearCompleteBtn.addEventListener('pointerdown', clearCompletedTasks);

showActiveBtn.addEventListener('pointerdown', showActiveFunc);
showCompletedBtn.addEventListener('pointerdown', showCompletedFunc);
showAllBtn.addEventListener('pointerdown', showAllFunc)