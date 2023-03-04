const tasks = document.getElementById("tasks");
const form = document.getElementById("new-task");
const taskInput = document.getElementById("new-input");

const taskCount = document.querySelector('#task-count span');

let tasksList = JSON.parse(localStorage.getItem("toDos")) || [];
//check localstorage if there any tasks
if (localStorage.getItem("toDos")) {
  tasksList.map((task) => {
    createElements(task);
  });
}

// handle task count 
const handleTasksCount = (n) => {
 if(n) {
  taskCount.textContent = n
 } else {
  taskCount.textContent = 0
 }
}
handleTasksCount(tasksList.length);
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
    newInput.style.border = '2px solid green'
    newInput.focus()
  });

  newInput.addEventListener('blur', () => {
    newInput.setAttribute('readonly', true);
    newInput.style.border = 'none';
    
    const tasks =  JSON.parse(localStorage.getItem("toDos"))
    const newTasks = tasks.map(t =>  {
      if(t.id === val.id) {
        return {...t, name: newInput.value }
      }else {
        return t
      }
    })
    localStorage.setItem("toDos", JSON.stringify(newTasks));
  })
  const timeSpan = document.createElement("span");
  timeSpan.innerText = val.time;
  newActions.appendChild(deleteButton);
  newActions.appendChild(editButton);
  newContent.appendChild(newInput);
  newTask.appendChild(newContent);
  newTask.appendChild(newActions);
  newContent.prepend(timeSpan);
  tasks.appendChild(newTask);
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
  handleTasksCount(tasksList.length)
});
function deleteTask(taskId) {
  tasksList = tasksList.filter((task) => task.id != taskId);
  localStorage.setItem("toDos", JSON.stringify(tasksList));
  document.getElementById(taskId).remove();
  handleTasksCount(tasksList.length)
}


function editTask(id) {
}


