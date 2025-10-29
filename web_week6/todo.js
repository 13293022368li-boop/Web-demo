// Retrieve tasks from localStorage or initialize as empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks on the page
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list

    // Loop through tasks and create list items with remove buttons
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task + ' ';

        // Create a remove button for each task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTask(index);

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();

    // Only add non-empty tasks
    if (newTask !== '') {
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
}

// Function to remove a task by index
function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Display tasks when the page loads
window.onload = displayTasks;