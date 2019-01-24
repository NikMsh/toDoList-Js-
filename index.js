const KEY_LS = "list";

window.onload = function() {
    getDataFromLocalStorage();

    document.getElementById('taskInput').addEventListener("keyup", listenInputKeys);
    document.getElementById('addTask').onclick = addItemToList;
    //document.getElementById('remTasks').onclick = removeTasks;
    document.getElementById('clearTasks').onclick = clearTasks;
    document.getElementById("saveTasks").onclick = saveTasksToLS;
};

function addItemToList() {
    const taskName = document.getElementById("taskInput").value;
    if (taskName === "") return;

    const taskId = generateId();

    let selectedDay = document.getElementById('selectDay').value;
    const listId = selectedDay + "List";


    document.getElementById(listId).appendChild(createItem(taskId, taskName));
}

function listenInputKeys(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addTask").click();
    } else if (event.keyCode === 40) {
        let select = document.getElementById("selectDay");
        if (select.options.selectedIndex < select.options.length-1)  {
            select.options.selectedIndex++;
        } else {
            select.options.selectedIndex = 0;
        }

    } else if (event.keyCode === 38) {
        let select = document.getElementById("selectDay");
        if (select.options.selectedIndex>0) {
            select.options.selectedIndex--;
        } else {
            select.options.selectedIndex = select.options.length-1;
        }

    }

}

function clearTasks() {
    let checkboxes = document.querySelectorAll('#toDoListTable input[type=checkbox]')

    for (let i = 0; i < checkboxes.length; i++) {
        let div = document.getElementById("div"+checkboxes[i].id);
        div.parentNode.removeChild(div);
    }
    localStorage.clear();
}

function getDataFromLocalStorage() {
    let listLS = JSON.parse(localStorage.getItem(KEY_LS));
    if (listLS===null || listLS.length === 0) return ;

    for (let i=0; i<listLS.length; i++) {
        document.getElementById(listLS[i].group).appendChild(createItem(listLS[i].id, listLS[i].text, listLS[i].checked));
    }
}

function saveTasksToLS() {
    let checkboxes = document.querySelectorAll('#toDoListTable input[type=checkbox]');
    if (checkboxes === null || checkboxes.length===0) return ;

    let listLS = [];
    for (let i=0;i<checkboxes.length;i++) {
        listLS.push(getObject(checkboxes[i]));
    }
    localStorage.setItem(KEY_LS, JSON.stringify(listLS));
}

function getObject(checkbox) {
    const div = checkbox.parentElement;
    const label = div.getElementsByTagName("label");
    return {
      id: checkbox.id,
      text: label[0].innerText,
      group: div.parentElement.id,
      checked: checkbox.checked,
    };
}

function createItem(id, text, checkedItem) {
    if (text === "" || id==="") return;

    let div = document.createElement("div");
    div.id = "div" + id;
    div.className = "taskDiv";

    let taskCheckBox = document.createElement("input");
    taskCheckBox.onclick = addCheckToLs;
    taskCheckBox.type = "checkbox";
    taskCheckBox.id = id;
    taskCheckBox.checked = checkedItem;

    let taskLabel = document.createElement("label");
    taskLabel.htmlFor = id;
    taskLabel.innerText = text;

    let closeSpan = document.createElement("span");
    closeSpan.className = "closable";
    closeSpan.innerText = "×";
    closeSpan.onclick = removeElement;

    div.appendChild(taskCheckBox);
    div.appendChild(taskLabel);
    div.appendChild(closeSpan);

    return div;
}

function removeElement() {
    let parentElement = this.parentElement;
    parentElement.parentNode.removeChild(parentElement);
}

function generateId () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addCheckToLs() {
    if (this.checked) {

    }
}

// function removeTasks() {
//     let checkboxes = document.querySelectorAll('#toDoListTable input[type=checkbox]:checked');
//
//     for (let i = 0; i < checkboxes.length; i++) {
//         const objId = checkboxes[i].id;
//         console.log(objId);
//         const div = document.getElementById("div"+ objId);
//         div.parentNode.removeChild(div);
//         remFromLocalStorage(objId);
//     }
// }

// function remFromLocalStorage(id) {
//     console.log('working ' + id);
//     const size = keys.length;
//     for (let i=0; i<size; i++) {
//         let array = JSON.parse(localStorage.getItem(keys[i]));
//         if (array===null || array.length === 0) continue ;
//
//         console.log(array);
//         for (let j=0; j<array.length; j++) {
//             console.log(array[j].id + " === " + id);
//             if (array[j].id === id) {
//                 console.log("FOUND");
//                 array.splice(array[j], 1);
//                 console.log("Works! " + array);
//                 console.log(JSON.stringify(array));
//                 localStorage.setItem(keys[i], JSON.stringify(array));
//                 return ;
//             }
//         }
//         //document.getElementById(key).appendChild(fragment);
//     }
// }