const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
const clearAllButton = document.querySelector(".clear-all-btn");
clearAllButton.addEventListener("click", clearAll);

function clearAll() {
    const allTodos = todoList.querySelectorAll(".todo");
    if (allTodos.length === 0) {
        alert("No tasks to clear.");
    } else {
        allTodos.forEach(todo => {
            todo.remove();
        });
        // Clear local storage
        localStorage.removeItem("todos");
        // Update counters
        updateCounters();
    }
}


function addTodo(event) {
    event.preventDefault();
    if (todoInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";

    saveLocalTodos(todoInput.value);

    // Update counters
    updateCounters();
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
            // Update counters
            updateCounters();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        // Update counters
        updateCounters();
    }
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(filterOption.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
    // Update counters
    updateCounters();
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCounters() {
    let completedCount = 0;
    let uncompletedCount = 0;

    todoList.childNodes.forEach(function(todo) {
        if (todo.classList.contains("completed")) {
            completedCount++;
        } else {
            uncompletedCount++;
        }
    });

    completedCounter.textContent = completedCount;
    uncompletedCounter.textContent = uncompletedCount;
}
