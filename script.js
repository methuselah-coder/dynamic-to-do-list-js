 
       
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (!addButton || !taskInput || !taskList) {
        console.error("Error: Required elements not found in the DOM.");
        return; // Exit if required elements are missing
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (!taskText) {
            alert("Please enter a task!");
            return;
        }

        // Create task element
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove task when button is clicked
        removeBtn.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = ""; // Clear input field
    }

    // Attach event listeners
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

 

     

  
  

