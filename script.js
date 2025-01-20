// Select DOM elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Array to store tasks
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // Parse the JSON string into an array
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert tasks array to JSON string
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    const taskText = document.createElement("span");
    taskText.textContent = task.title;

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "actions";

    // Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.className = "complete";
    completeButton.onclick = () => toggleComplete(index);

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.onclick = () => editTask(index);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteTask(index);

    // Append buttons to actions
    actions.appendChild(completeButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    // Append task text and actions to the task item
    taskItem.appendChild(taskText);
    taskItem.appendChild(actions);

    // Append task item to the task list
    taskList.appendChild(taskItem);
  });
}

// Add task
addTaskButton.addEventListener("click", () => {
  const taskTitle = taskInput.value.trim();
  if (taskTitle) {
    tasks.push({ title: taskTitle, completed: false });
    taskInput.value = ""; // Clear input field
    saveTasks(); // Save to localStorage
    renderTasks();
  }
});

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(); // Save to localStorage
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTitle = prompt("Edit Task", tasks[index].title);
  if (newTitle) {
    tasks[index].title = newTitle;
    saveTasks(); // Save to localStorage
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  saveTasks(); // Save to localStorage
  renderTasks();
}

// Initial setup
loadTasks(); // Load tasks from localStorage
renderTasks(); // Render the loaded tasks
