const tasks = document.getElementById("tasks");
const form = document.getElementById("new-task");
const taskInput = document.getElementById("new-input");
const totalTasks = document.getElementById("task-count");

let tasksList = JSON.parse(localStorage.getItem("toDos")) || [];
//check localstorage if there any tasks
if (localStorage.getItem("toDos")) {
  tasksList.map((task) => {
    createElements(task);
  });
}
//render tasks
function createElements(val) {
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("id", val.id);

  const newContent = document.createElement("div");
  newContent.classList.add("content");

  const newInput = document.createElement("input");
  newInput.classList.add("task");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("readonly", true);
  newInput.setAttribute("value", val.name);
  newInput.setAttribute("id", val.id);

  const newActions = document.createElement("div");
  newActions.classList.add("actions");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "DELETE";
  deleteButton.addEventListener("click", () => {
    deleteTask(val.id);
  });
  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.textContent = "EDIT";
  editButton.addEventListener("click", () => {
    newInput.removeAttribute("readonly");
    editTask(val.id, newInput);
  });
  const timeSpan = document.createElement("span");
  timeSpan.innerText = val.time;
  newActions.appendChild(deleteButton);
  newActions.appendChild(editButton);
  newContent.appendChild(newInput);
  newTask.appendChild(newContent);
  newTask.appendChild(newActions);
  newContent.prepend(timeSpan);
  tasks.appendChild(newTask);
  countTasks();
}
// add new task
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //check if the input is empty
  if (taskInput.value == "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: taskInput.value,
    time: new Date().getHours() + ":" + new Date().getMinutes(),
  };

  tasksList.push(task);
  localStorage.setItem("toDos", JSON.stringify(tasksList)); //localstorage only supports strings
  createElements(task);
  taskInput.value = "";
});
function countTasks() {
  totalTasks.innerText = tasksList.length;
}
function deleteTask(taskId) {
  tasksList = tasksList.filter((task) => task.id != taskId);
  localStorage.setItem("toDos", JSON.stringify(tasksList));
  document.getElementById(taskId).remove();
  countTasks();
}
function editTask(id, el) {
  let editedTask = tasksList.find((task) => task.id == id);
  editedTask.name = el.value;
  localStorage.setItem("toDos", JSON.stringify(tasksList));
}
