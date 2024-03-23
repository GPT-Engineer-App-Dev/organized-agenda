// Get the input field and todo list container
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add a new todo
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && todoInput.value.trim() !== "") {
    addTodo(todoInput.value.trim());
    todoInput.value = "";
  }
});

// Add a new todo to the list
function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
}

// Render the todo list
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "flex", "items-center", "justify-between", "bg-gray-100", "rounded-md", "px-4", "py-2");
    todoItem.innerHTML = `
      <div class="flex items-center">
        <input type="checkbox" class="mr-2" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
        <span class="${todo.completed ? "line-through text-gray-500" : ""}">${todo.text}</span>
      </div>
      <button class="text-red-500 hover:text-red-700" onclick="deleteTodo(${todo.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Toggle the completion status of a todo
function toggleTodo(id) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  saveTodos();
  renderTodos();
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

// Save todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
