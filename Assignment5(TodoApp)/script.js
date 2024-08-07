let todoitemcontainer = document.getElementById("todoItemsContainer");
let buttonclick = document.getElementById("addListElement");
let savebutton = document.getElementById("saveButton");
let themeToggleButton = document.getElementById("themeToggleButton");
let searchIcon=document.getElementById("search-icon")
let result=document.getElementById("search-result");
result.innerHTML='';
searchIcon.addEventListener("click",function(){
    let value=document.getElementById("search-input").value;
    let check=false;
    for(let todo of todoList){
        if(todo.text.toLowerCase()===value.toLowerCase()){
            let res=document.getElementById(todo.listId);
           result.innerHTML=`<div class="alert alert-success ">${todo.text} is found</div>`;
           check=true;
            break;
        }

    }
    if(!check){
        result.innerHTML = `<div class="alert alert-danger ">Task not found</div>`;
    }

});
themeToggleButton.addEventListener("click",function(){
   if( document.body.classList.contains("light-mode")){
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
   }
   else{
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");

   }
});
function getTodoListFromLocalStorage() {
    let stringTodoList = localStorage.getItem("todoListKey");
    let parsefield = JSON.parse(stringTodoList);
    return parsefield === null ? [] : parsefield;
}
let todoList = getTodoListFromLocalStorage();
console.log(todoList);
let count = todoList.length;
function saveToLocalStorage() {
    let stringTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoListKey", stringTodoList);
}
function deletef(listId) {
    let listElement = document.getElementById(listId);
    todoitemcontainer.removeChild(listElement);
    let deleteItemindex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "list" + eachTodo.uniqueno;
        return eachTodoId === listId;
    });
    todoList.splice(deleteItemindex, 1);
    saveToLocalStorage();
}
function editItem(labelId, listId) {
    let labelElement = document.getElementById(labelId);
    let newText = prompt("Edit your todo item:", labelElement.textContent);


    if (newText !== null && newText.trim() !== "") {
        labelElement.textContent = newText;
        let indexItem = todoList.findIndex(function (eachTodo) {
            let eachTodoId = "list" + eachTodo.uniqueno;
            return eachTodoId === listId;
        });
        let editItem = todoList[indexItem];
        editItem.text = newText;
        saveToLocalStorage();
    }
}
function checkstatus(checkboxId, labelId, listId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let indexItem = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "list" + eachTodo.uniqueno;
        return eachTodoId === listId;
    });
    let checkItem = todoList[indexItem];
    checkItem.isChecked = !checkItem.isChecked;
    saveToLocalStorage();
}
function create(todo) {
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;
    let listId = "list" + todo.uniqueno;
    let list1 = document.createElement("li");
    list1.id = listId;
    list1.classList.add("todo-item-container", "d-flex", "flex-row", "draggable");
    list1.setAttribute("draggable", "true");
    todoitemcontainer.appendChild(list1);
    let inputEle = document.createElement("input");
    inputEle.type = "checkbox";
    inputEle.id = checkboxId;
    inputEle.checked = todo.isChecked;
    inputEle.classList.add("checkbox-input");
    inputEle.onclick = function () {
        checkstatus(checkboxId, labelId, listId);
    };
    list1.appendChild(inputEle);
    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("d-flex", "flex-row", "label-container");
    list1.appendChild(labelcontainer);
    let labelEle = document.createElement("label");
    labelEle.setAttribute("for", checkboxId);
    labelEle.textContent = todo.text;
    labelEle.id = labelId;
    labelEle.classList.add("checkbox-label");
    if (todo.isChecked) {
        labelEle.classList.add("checked");
    }
    labelcontainer.appendChild(labelEle);
   let valueforpriority=document.createElement("span");
    valueforpriority.classList.add("priority-label");
    valueforpriority.textContent=todo.priority;
    labelcontainer.appendChild(valueforpriority);
    let deletecontainer = document.createElement("div");
    deletecontainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deletecontainer);

    let deleteitem = document.createElement("i");
    deleteitem.classList.add("delete-icon", "fa", "fa-trash-alt");
    deleteitem.onclick = function () {
        deletef(listId);
    };
    deletecontainer.appendChild(deleteitem);
    let editcontainer = document.createElement("div");
    editcontainer.classList.add("edit-icon-container");
    labelcontainer.appendChild(editcontainer);
    let edititem = document.createElement("i");
    edititem.classList.add("edit-icon", "fa", "fa-edit");
    edititem.onclick = function () {
        editItem(labelId, listId);
    };
    editcontainer.appendChild(edititem);
    addDragAndDropHandlers(list1);
}
function addto() {
    let elementadd = document.getElementById("todoUserInput");
    let elementvalue = elementadd.value;
    let priorityadd=document.getElementById("source");
    let priorityvalue=priorityadd.value;
    if (elementvalue === "") {
        alert("Enter valid input");
        return;
    }
    count++;
    let newtodo = {
        text: elementvalue,
        priority:priorityvalue,
        uniqueno: count,
        isChecked: false
    };
    todoList.push(newtodo);
    create(newtodo);
    elementadd.value = "";
    priorityadd.value="";
    saveToLocalStorage();
}
buttonclick.onclick = function () {
    addto();
};
for (let todo of todoList) {
    create(todo);
}
function addDragAndDropHandlers(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragend', handleDragEnd);
}
let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function handleDragEnter() {
    this.classList.add('over');
}
function handleDragLeave() {
    this.classList.remove('over');
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        swapElements(dragSrcEl, this);
        updateElementIds(dragSrcEl, this);
        updateListOrder();
        saveToLocalStorage();
    }
    return false;
}
function handleDragEnd() {
    this.classList.remove('dragging');
    let items = document.querySelectorAll('.draggable');
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}
function swapElements(el1, el2) {
    const temp = document.createElement("div");
    el1.parentNode.insertBefore(temp, el1);
    el2.parentNode.insertBefore(el1, el2);
    temp.parentNode.insertBefore(el2, temp);
    temp.parentNode.removeChild(temp);
}
function updateElementIds(el1, el2) {
    [el1.id, el2.id] = [el2.id, el1.id];
    let checkbox1 = el1.querySelector('input[type="checkbox"]');
    let checkbox2 = el2.querySelector('input[type="checkbox"]');
    if (checkbox1 && checkbox2) {
        [checkbox1.id, checkbox2.id] = [checkbox2.id, checkbox1.id];
        checkbox1.setAttribute('for', checkbox1.id);
        checkbox2.setAttribute('for', checkbox2.id);
    }
    let label1 = el1.querySelector('label');
    let label2 = el2.querySelector('label');
    if (label1 && label2) {
        [label1.id, label2.id] = [label2.id, label1.id];
    }
    let deleteIcon1 = el1.querySelector('.delete-icon');
    let deleteIcon2 = el2.querySelector('.delete-icon');
    if (deleteIcon1 && deleteIcon2) {
        deleteIcon1.onclick = function () {
            deletef(el1.id);
        };
        deleteIcon2.onclick = function () {
            deletef(el2.id);
        };
    }
    let editIcon1 = el1.querySelector('.edit-icon');
    let editIcon2 = el2.querySelector('.edit-icon');
    if (editIcon1 && editIcon2) {
        editIcon1.onclick = function () {
            editItem(label1.id, el1.id);
        };
        editIcon2.onclick = function () {
            editItem(label2.id, el2.id);
        };
    }
}
function updateListOrder() {
    let updatedList = [];
    let items = document.querySelectorAll('.todo-item-container');
    items.forEach((item, index) => {
        let label = item.querySelector('label').textContent;
        let isChecked = item.querySelector('input').checked;
        let priority = item.querySelector('.priority-label').textContent;
        updatedList.push({
            text: label,
            priority: priority,
            uniqueno: index + 1,
            isChecked: isChecked
        });
    });
    todoList = updatedList;
    count = updatedList.length;
}
