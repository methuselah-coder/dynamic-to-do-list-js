document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    loadTasks(); // Load stored tasks when the page loads

    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert("Please enter a task!");
            return;
        }

        // Create a new task element
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove task when button is clicked
        removeBtn.addEventListener("click", () => {
            taskList.removeChild(li);
            removeTask(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveTask(taskText);
        }

        taskInput.value = ""; // Clear input field
    }

    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener("click", () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });
});

