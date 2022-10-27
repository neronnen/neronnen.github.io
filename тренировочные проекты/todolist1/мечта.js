const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}
const createTemplate = (task, index) => {
  return `
        <div class="todo-item ${task.completed ? "checked" : ""}">
          <div class="description">${task.description}</div>
          <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${
    task.completed ? "checked" : ""
  } />
            <button onclick="deleteTask(${index})" class="btn-delete">Удалить</button>
          </div>
        </div>
  `;
};
const fillHtmllist = () => {
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".todo-item");
  }
};

const filterTask = () => {
  const activeTask =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTask =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTask, ...completedTask];
};

fillHtmllist();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  console.log(index);
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmllist();
};

addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmllist();
  deskTaskInput.value = "";
  deskTaskInput.focus();
});

const deleteTask = (index) => {
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmllist();
  }, 500);
};
