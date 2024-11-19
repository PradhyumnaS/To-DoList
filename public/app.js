// Task list
let tasks = [];

// DOM elements
const taskList = document.getElementById('taskList');
const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const loginSignupButton = document.getElementById('showLoginSignup');
const usernameSpan = document.getElementById('username');
const logoutButton = document.getElementById('logoutButton');

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    usernameSpan.textContent = `Hello, ${currentUser}`;
    usernameSpan.style.display = 'inline';
    logoutButton.style.display = 'inline';
    loginSignupButton.style.display = 'none';
  } else {
    usernameSpan.style.display = 'none';
    logoutButton.style.display = 'none';
    loginSignupButton.style.display = 'inline';
  }
  fetchTasks();
});

// Fetch tasks from the server
async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  tasks = await response.json();
  displayTasks();
}

// Display tasks
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <div class="task-text">${index + 1}. ${task.description}</div>
      <div class="actions">
        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskList.appendChild(taskItem);
  });
}

// Add new task
async function addTask(event) {
  event.preventDefault();
  const description = taskInput.value.trim();
  const currentUser = localStorage.getItem('currentUser');
  const taskData = { description, completed: false };
  if (currentUser) {
    taskData.user = currentUser;
  }
  if (description !== '') {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const newTask = await response.json();
    tasks.push(newTask);
    taskInput.value = '';
    displayTasks();
  }
}

// Toggle task completion
async function toggleTask(index) {
  const task = tasks[index];
  task.completed = !task.completed;
  const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const updatedTask = await response.json();
  tasks[index] = updatedTask;
  displayTasks();
}

// Delete task
async function deleteTask(index) {
  const task = tasks[index];
  await fetch(`http://localhost:3000/tasks/${task._id}`, {
    method: 'DELETE',
  });
  tasks.splice(index, 1);
  displayTasks();
}

// Event listeners
addTaskForm.addEventListener('submit', addTask);

// Redirect to auth page if user clicks login/signup
loginSignupButton.addEventListener('click', () => {
  window.location.href = 'auth.html';
});

// Handle logout
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});
