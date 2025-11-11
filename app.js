"use strict";
const txtTaskDescription= document.getElementById("txt-task-description");
const btnAddTask = document.getElementById("btn-add-task");
const taskList = document.getElementById("task-list");
const btnClear = document.querySelectorAll("#filters span");

let isEditMode = false;
let editedTaskId;
let filterMode ="all";
let taskListArray=[];

btnAddTask.addEventListener("click", addTask);

btnClear.addEventListener("click",clearAll);

//Yeni görev ekleme;
function addTask(event){
    event.preventDefault();
    let value = txtTaskDescription.value.trim();
    if (value !=""){
        let id =taskListArray.length== 0?1: taskListArray[taskListArray.length-1].id+1;
        taskList.push(
            {
                "id":id,
                "taskDescription":value,
                "status":"pending"
            }
        );
        displayTasks(filterMode);
        setTasks();
    }else{
        alert("Görev açıklamasını boş bırakmayınız")
    }
    txtTaskDescription.value ="";
    txtTaskDescription.focus();
}

//yeniden okuma;
function displayTasks(filter){
    taskList.innerHTML= "";
    if(taskListArray.length == 0){
        taskList.innerHTML = `<div class="alert alert-warning mb-o">Tanımlı görev yoktur</div>`;
    }else{
        for(const task of taskListArray){
            if(filter =="all"|| filter == task.status){
                let completed =task.status == "completed"? "checked": "";
                let taskLi=`
                <li class="task list-gruop-item" id="${task.id}">
                <div class=form-check d-flex justify-content-between align-items-center>         
                 <input onclick="updateStatus(this);" type="checkbox" id="${task.id}" class="form-check-input" ${completed}>
                        <div class="input-group">
                            <input id="${task.id}" class="form-control ${completed}" type="text" value="${task.taskDescription}"
                                disabled />
                            <button onclick="editTask(this);" id="${task.id}" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteTask(this);" id="${task.id}" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </li>
                ` ;
                taskList.insertAdjacentElement("beforeend", taskLi);
            };
        };
    };
};


//tamamlandı/devam ediyor

function updateStatus(activeTask){
    let newStatus = activeTask.checked ? "compluted" : "pending";
    for (const task of taskListArray){
        if (activeTask.id == task.id){
            task.status = newStatus;
            break;
        }
    }
    setTasks();
    displayTasks(filterMode);
}

// görev düzenlenmesi;

function editTask(clickedButton){
     editedTaskId = clickedButton.id;
    let editedTask = clickedButton.previousElementSibling;
    let checked;
    for (const task of taskListArray) {
        if (task.id == editedTaskId) {
            checked = task.status;
            break;
        };
    }
    if (!isEditMode) {
        editedTask.removeAttribute("disabled");
        if (checked == "completed") editedTask.classList.remove("checked");
        clickedButton.classList.remove("btn-warning");
        clickedButton.classList.add("btn-info");
        isEditMode = true;
    } else {
        editedTask.setAttribute("disabled", "disabled");
        if (checked == "completed") editedTask.classList.add("checked");
        clickedButton.classList.remove("btn-info");
        clickedButton.classList.add("btn-warning");
        clickedButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        for (const task of taskListArray) {
            if (editedTaskId == task.id) {
                task.taskDescription = editedTask.value;
                break;
            }
        }
        isEditMode = false;
        setTasks();
        displayTasks(filterMode);
    }

}

// görevi siler
function deleteTask(clickedButton) {
    let deletedTaskId = clickedButton.id;
    let deletedTask = taskListArray.filter(function (task) {
        if (deletedTaskId == task.id) return true;
    });
    let deletedTaskDescription = deletedTask[0].taskDescription;
    let answer = confirm(`'${deletedTaskDescription}' görevi silinecektir!`);
    if (answer) {
        let index = taskListArray.indexOf(deletedTask[0]);
        taskListArray.splice(index, 1);
        setTasks();
        displayTasks(filterMode);
        alert("Silme işlemi başarıyla tamamlanmıştır.");
    }
}
//tüm görevleri siler
function clearAll(){
    let answer =confirm("Tüm görevler silinecektir!");
    if (answer){
        taskListArray.splice(0);
        setTasks();
        displayTasks(filterMode);
    }
}


// Filters içindeki spanlara click eventlerini atar.
function assignSpansEvents() {
    for (const span of filters) {
        span.addEventListener("click", function () {
            let activeSpan = document.querySelector("span.active");
            activeSpan.classList.remove("active");
            span.classList.add("active");
            filterMode = span.id;
            displayTasks(filterMode);
        });
    };
};
document.getElementById("all").addEventListener("click",function(){

});
document.getElementById("completed").addEventListener("click", function () {

});
document.getElementById("pending").addEventListener("click", function () {

});

// LocalStorage'deki datamızı okuyup dizimizin içine aktaracak.
function getTasks() {
    // Task'lerimiz LocalStorage'de TaskList adında bir key'in içinde tutulacak.
    let TaskListItem = localStorage.getItem("TaskList");

    if (TaskListItem != null) {
        taskListArray = JSON.parse(TaskListItem);
    };
};

function setTasks() {
    localStorage.setItem("TaskList", JSON.stringify(taskListArray));
    console.log(JSON.stringify(taskListArray), typeof JSON.stringify(taskListArray));
};

getTasks();
assignSpansEvents();
displayTasks(filterMode);



// LocalStorage'deki datamızı okuyup dizimizin içine aktaracak.
function getTasks() {
    // Task'lerimiz LocalStorage'de TaskList adında bir key'in içinde tutulacak.
    let TaskListItem = localStorage.getItem("TaskList");

    if (TaskListItem != null) {
        taskListArray = JSON.parse(TaskListItem);
    };
};

function setTasks() {
    localStorage.setItem("TaskList", JSON.stringify(taskListArray));
    console.log(JSON.stringify(taskListArray), typeof JSON.stringify(taskListArray));
};

getTasks();
assignSpansEvents();
displayTasks(filterMode);
// const txtTaskDescription =document.getElementById("txt-task-description");
// const btnAddTask =document.getElementById("btn-add-task");
// const taskList = document.getElementById("task-list");

// let taskListArray =[
//     {id: 1, taskDescription:"okula git", status:"completed"},
//     {id: 2, taskDescription:"sınava gir", status:"pending"},
//     {id: 3, taskDescription:"kitap oku", status:"pending"},
//     {id: 4, taskDescription:"haftayı planla", status:"completed"},
//     {id: 26, taskDescription:"defter al!", status:"pending"}
// ];

// btnAddTask.addEventListener("click",function(event){
//     event.preventDefault();//ilgili olayın default davranışlarını iptal ediyor
//     let value =txtTaskDescription.value.trim();
//     if (value != ""){
//         let id=taskListArray.length== 0 ? 1 :taskListArray[taskListArray.length -1].id +1;
//         taskListArray.push(
//             {
//                 "id":id,
//                 "taskDescription":value,
//                 "status":"pending"
//             }
//         );
//         console.log(taskListArray);
//     }else{
//         alert("lütfen açıklaması ekleyin")
//     }
//     txtTaskDescription.value= "";
//     txtTaskDescription.focus();
// });
 
// function displayTasks(){
//     //bu function, her ihtiyaç duyulduğunda tüm görevleri yeniden okuyup ekranda göstermesi için.
//     taskList.innerHTML= "";
//     if (taskListArray.length == 0){
//         taskList.innerHTML= `<div class="alert alert-warning mb-0">Tanımlı görev yoktur</div>`;
//     } else{

//     }
// }
// displayTasks();