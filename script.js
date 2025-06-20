
  
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (!addButton || !taskInput || !taskList) {
        console.error("Error: Required elements not found in the DOM.");
        return;
    }

    loadTasks(); // Load stored tasks when the page loads

    function addTask(taskText, save = true) {
        taskText = taskText.trim();

        if (!taskText) {
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

        // Save task to Local Storage (only when manually adding a task)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }

        taskInput.value = ""; // Clear input field
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

    // Attach event listeners
    addButton.addEventListener("click", () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });
});

