const tasks = document.getElementById('tasks');
const form = document.getElementById('new-task');
const taskInput = document.getElementById("new-input");

let tasksList = [];
function Elements(val){
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    // newTask.id=

const newContent = document.createElement('div');
newContent.classList.add('content');

const newInput = document.createElement('input');
newInput.classList.add('task');
newInput.setAttribute('type', 'text');
newInput.setAttribute('readonly', true);
newInput.setAttribute('value', val);

const newActions = document.createElement('div');
newActions.classList.add('actions');

const deleteButton = document.createElement('button');
deleteButton.classList.add('delete');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', ()=>{
    newTask.remove();
})

newActions.appendChild(deleteButton);
newContent.appendChild(newInput);
newTask.appendChild(newContent);
newTask.appendChild(newActions);
tasks.appendChild(newTask);
}
const createTask = (text) => {
    if(localStorage.getItem("toDos")){
        tasksList = JSON.parse(localStorage.getItem("toDos"));
        tasksList.push(text);
       Elements(text);
    }else{
        tasksList.push(text);
        Elements(text);
    }
localStorage.setItem("toDos", JSON.stringify(tasksList) );
}
function Read(){
    if(localStorage.getItem("toDos")){
        let dataaaaa = JSON.parse(localStorage.getItem("toDos"));
        dataaaaa.forEach((el)=>{
            Elements(el);
})
     }
}

Read();



form.addEventListener('submit', (event) => {
    event.preventDefault();
    createTask(taskInput.value);
    taskInput.value = '';
});

