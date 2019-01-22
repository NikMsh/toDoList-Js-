
window.onload = function() {
    let taskId = 0;

    //getDataFromLocalStorage();

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

        console.log(div);
        //addDataToLocalStorage(selectedDay + "List", div.value.toString());
        //document.getElementById("taskInput").value = "";
    }
};

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
    localStorage.clear()
}

function saveToLocalStorage(taskSection, tasksArray) {
    if (tasksArray.length === 0) {
        return ;
    }
    localStorage.setItem(taskSection, JSON.stringify(tasksArray));
}


function getDataFromLocalStorage() {
    let keys = ["todayList", "tomorrowList", "nextTimeList"];
    keys.forEach(function (key) {
            let array = JSON.parse(localStorage.getItem(key));
            if (array===null || array.length === 0) return ;

            let arrPlace = document.getElementById(key);
            console.log(array);
            for (let i=0; i<array.length; i++) {
                console.log(array[i]);
                arrPlace.appendChild(array[i]);
            }
        }
    );
}

function addDataToLocalStorage(key, item) {
    let tasks = JSON.parse(localStorage.getItem(key));
    console.log(tasks);
    if (tasks === null) {
        tasks = [];
    }
    console.log(item);
    tasks.push(item);
    localStorage.setItem(key, JSON.stringify(tasks));
}