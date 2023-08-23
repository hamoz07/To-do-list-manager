//* selecting elements
let input = document.querySelector(".input");
let allTasks = document.querySelector(".tasks");
let add = document.querySelector(".add");

// array of tasks

let tasks = [];

// saving tasks to local storage

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLS();

// deleting operation

allTasks.addEventListener("click", (l) => {
  // checking if it's the delete button or not
  if (l.target.classList.contains("del")) {
    removeTask(l.target.parentElement.getAttribute("data-unique"));
    l.target.parentElement.remove();
  }
  // checking if it's the task div or not
  if (l.target.classList.contains("task")) {
    checkDone(l.target.getAttribute("data-unique"));
    l.target.classList.toggle("done");
  }
  addToLS(tasks);
});

// my form operation

add.onclick = () => {
  if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
};

//

function addTask(inputs) {
  let task = {
    id: Date.now(),
    taskVal: inputs,
    Done: false,
  };
  tasks.push(task);
  // looping over each task
  addTaskFromMainArr(tasks);
  addToLS(tasks);
}

function addTaskFromMainArr(tasks) {
  allTasks.innerHTML = "";

  tasks.forEach((t) => {
    // the task
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    if (t.Done) {
      taskDiv.className += " done";
    }

    taskDiv.setAttribute("data-unique", t.id);
    // the delete
    let span = document.createElement("span");
    span.className = "del";
    //all appends
    span.append(document.createTextNode("Delete"));
    taskDiv.appendChild(document.createTextNode(t.taskVal));
    taskDiv.appendChild(span);
    allTasks.append(taskDiv);
  });
}

function addToLS(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLS() {
  let allData = localStorage.getItem("tasks");
  if (allData) {
    let conv = JSON.parse(allData);
    addTaskFromMainArr(conv);
  }
}

function removeTask(taskID) {
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${tasks[i].id} === ${taskID}`);
  }
  tasks = tasks.filter((t) => t.id != taskID);
  addToLS(tasks);
}

function checkDone(taskID) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskID) {
      tasks[i].Done = !tasks[i].Done;
    }
  }
  addToLS(tasks);
}

// allTasks.innerHTML = "";
// localStorage.clear()
