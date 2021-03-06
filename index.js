const KEY_LS = "list";
let dragSrc;


window.onload = function() {
    getDataFromLocalStorage();

    document.getElementById('taskInput').addEventListener("keyup", listenInputKeys);
    document.getElementById('addTask').onclick = addItemToList;
    document.getElementById('clearTasks').onclick = clearTasks;
    document.getElementById('saveTasks').onclick = saveTasksToLS;
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
    if (event.defaultPrevented) {
        return;
    }
    if (event.key === 'Enter') {
        document.getElementById("addTask").click();
    } else if (event.key === 'ArrowDown') {
        let select = document.getElementById("selectDay");
        if (select.options.selectedIndex < select.options.length-1)  {
            select.options.selectedIndex++;
        } else {
            select.options.selectedIndex = 0;
        }

    } else if (event.key === 'ArrowUp') {
        let select = document.getElementById("selectDay");
        if (select.options.selectedIndex>0) {
            select.options.selectedIndex--;
        } else {
            select.options.selectedIndex = select.options.length-1;
        }

    }

}

function clearTasks() {
    let divs = document.querySelectorAll('.taskDiv')

    for (let i = 0; i < divs.length; i++) {
        divs[i].parentNode.removeChild(divs[i]);
    }
    document.getElementById("taskInput").value = '';
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
    let checkboxes = document.querySelectorAll('.toDoList input[type=checkbox]');
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
    div.className = "taskDiv";
    div.onclick = clickOnCheckBox;
    div.draggable = true;
    addDragDropToChild(div);

    let taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.id = id;
    taskCheckBox.checked = checkedItem;
    taskCheckBox.onclick = checking;

    let taskLabel = document.createElement("label");
    taskLabel.innerText = text;
    if (checkedItem) taskLabel.style.textDecoration = 'line-through';

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

function clickOnCheckBox() {
    let checkbox = this.querySelector("input");
    checkbox.checked =  !checkbox.checked;
    let label = this.querySelector("label");
    if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
    } else {
        label.style.textDecoration = '';
    }
}

function checking(event) {
    let label = this.parentElement.querySelector('label');
    if (this.checked) {
        label.style.textDecoration = 'line-through';
    } else {
        label.style.textDecoration = '';
    }
    event.stopPropagation();
}

function generateId () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addDragDropToChild(div) {
    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragover', dragOver);
    div.addEventListener('drop', dragDrop);
    div.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
    dragSrc = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("taskDiv", this.innerHTML);
}
function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'move';
}

function dragDrop(e) {
    if (dragSrc!==this) {
        let tmpChecking1 = dragSrc.getElementsByTagName("input")[0].checked;
        let tmpChecking2 = this.getElementsByTagName("input")[0].checked;

        dragSrc.innerHTML = this.innerHTML;
        dragSrc.getElementsByTagName("input")[0].checked = tmpChecking2;

        this.innerHTML = e.dataTransfer.getData("taskDiv");
        this.getElementsByTagName("input")[0].checked = tmpChecking1;

    }
    let checkbox = this.getElementsByTagName('input');
    let span = this.getElementsByClassName('closable');
    checkbox[0].onclick = checking;
    span[0].onclick = removeElement;
}

function dragEnd(e) {
    let checkbox = this.getElementsByTagName('input');
    let span = this.getElementsByClassName('closable');
    checkbox[0].onclick = checking;
    span[0].onclick = removeElement;
}