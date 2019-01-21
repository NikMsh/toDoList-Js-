
window.onload = function() {
    let taskId = 0;

    document.getElementById('taskInput').addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("addTask").click();
            }
            if (event.keyCode === 40) {
                let select = document.getElementById("selectDay");
                if (select.options.selectedIndex < select.options.length-1)  {
                    select.options.selectedIndex++;
                } else {
                    select.options.selectedIndex = 0;
                }

            }
            if (event.keyCode === 38) {
                let select = document.getElementById("selectDay");
                if (select.options.selectedIndex>0) {
                    select.options.selectedIndex--;
                } else {
                    select.options.selectedIndex = select.options.length-1;
                }

            }

        }
    );

    document.getElementById('addTask').onclick = addItemToList;
    document.getElementById('remTasks').onclick = removeTasks;
    document.getElementById('clearTasks').onclick = clearTasks;

    function addItemToList() {
        let taskName = document.getElementById("taskInput").value;
        if (taskName === "") return;

        let selectedDay = document.getElementById('selectDay').value;
        let formGroup = document.getElementById(selectedDay + "List");

        let div = document.createElement("div");
        div.id = "div" + taskId;
        div.className = "taskDiv";

        let taskCheckBox = document.createElement("input");
        taskCheckBox.type = "checkbox";
        taskCheckBox.id = taskId++;

        let taskLabel = document.createElement("label");
        taskLabel.htmlFor = taskCheckBox.id;
        taskLabel.innerText = taskName;

        div.appendChild(taskCheckBox);
        div.appendChild(taskLabel);
        formGroup.appendChild(div);

        //document.getElementById("taskInput").value = "";
    }

    function removeTasks() {
        let checkboxes = document.querySelectorAll('#toDoListTable input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            let div = document.getElementById("div"+checkboxes[i].id);
            div.parentNode.removeChild(div);
        }
    }

    function clearTasks() {
        let checkboxes = document.querySelectorAll('#toDoListTable input[type=checkbox]')

        for (let i = 0; i < checkboxes.length; i++) {
            let div = document.getElementById("div"+checkboxes[i].id);
            div.parentNode.removeChild(div);
        }
    }
}