const form = document.querySelector("#form");
const taskInput = document.querySelector("#task-input");
const tasklist = document.querySelector("#tasklist");
const emptylist = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener("submit", addTask);
tasklist.addEventListener("click", deleteTask);
tasklist.addEventListener("click", doneTask);

function addTask(event) {
  //   отмена отправки формы
  event.preventDefault();

  //  достаём текст задачи из поля ввода
  const taskText = taskInput.value;

  // задача в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // добавляем задачу в массив
  tasks.push(newTask);

  saveToLocalStorage();

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
}

function deleteTask(event) {
  //  проверка что клик был по кнопке удаления задачи
  if (event.target.dataset.action === "remove") {
    const pareNode = event.target.closest(".list-group-item");

    // определение айди задачи
    const id = Number(pareNode.id);

    // находим индекс задачи в массиве
    const index = tasks.findIndex(function (task) {
      return task.id === id;
    });

    // удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    saveToLocalStorage();

    pareNode.remove();

    checkEmptyList();
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const pareNode = event.target.closest(".list-group-item");

    const id = Number(pareNode.id);
    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    });
    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = pareNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const EmptyListElement = `
     <li id="emptyList" class="list-group-item empty-list">
            <img
              src="/img/leaf-nature-forest-brand-plant_icon-icons.com_59259.png"
              alt="empty"
              width="48"
              class="mt-3"
            />
            <div class="empty-list__title">Список дел пуст</div>
          </li>
     `;
    tasklist.insertAdjacentHTML("afterbegin", EmptyListElement);
  }
  if (tasks.length > 0) {
    const EmptyListEl = document.querySelector("#emptyList");
    EmptyListEl ? EmptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  //   формирование разметки для новрй задачи
  const taskHtml = `
  <li id= "${task.id}"class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img
                  src="/img/Tick_Mark_Circle_icon-icons.com_69145.svg"
                  alt="done"
                  width="18"
                  height="18"
                />
              </button>
              <button type="button" data-action="remove" class="btn-action">
                <img
                  src="/img/1487086345-cross_81577.svg"
                  alt="done"
                  width="18"
                  height="18"
                />
              </button>
            </div>
          </li>
  `;
  //  добавляем задачу на страницу
  tasklist.insertAdjacentHTML("beforeend", taskHtml);
}
