// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskItem.addEventListener("click", () => toggleComplete(index));
    taskList.appendChild(taskItem);
  });
};

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  }
});

// Edit task
const editTask = (index) => {
  const newTaskText = prompt("Edit your task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    updateLocalStorage();
    renderTasks();
  }
};

// Delete task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
};

// Toggle task completion
const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
};

// Update local storage
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Initial render
renderTasks();
