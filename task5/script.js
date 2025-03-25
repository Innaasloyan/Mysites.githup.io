function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskInput.value;
        taskItem.addEventListener("click", function() {
            this.remove();
        });

        taskList.appendChild(taskItem);
        taskInput.value = "";
    } else {
        alert("Пожалуйста, введите задачу!");
    }
}
