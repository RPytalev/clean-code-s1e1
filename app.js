let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");


let createNewTaskElement = function(taskString) {

    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");
    listItem.className = 'todo-el';

    label.innerText = taskString;
    label.className = 'subtitle';

    checkBox.type = "checkbox";
    checkBox.className = "todo-checkbox checkbox";

    editInput.type = "text";
     editInput.className = "todo-input input";

    editButton.innerText = "Edit";
    editButton.className = "edit-button";

    deleteButton.className = "todo-delete-button delete-button";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.className = "todo-img";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

let addTask = function() {

    console.log("Add Task...");
    if (!taskInput.value) return;
    let listItem  =  createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value  =  "";

}

let editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem = this.parentNode;

    let editInput = listItem.querySelector('input[type = text]');
    let label = listItem.querySelector("label");
    let editBtn = listItem.querySelector(".edit-button");
    let containsClass = listItem.classList.contains("edit-mode");
 
    if(containsClass) {

        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};

let deleteTask = function() {
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

}

let taskCompleted = function() {
    console.log("Complete Task...");

    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete = function() {
    console.log("Incomplete Task...");

    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



let ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


let bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");

    let checkBox = taskListItem.querySelector("input[type = checkbox]");
    let editButton = taskListItem.querySelector("button.edit-button");
    let deleteButton = taskListItem.querySelector("button.delete-button");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;
 
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i = 0; i< completedTasksHolder.children.length; i++) {

    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
