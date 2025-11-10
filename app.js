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
    let editedTaskId = clickedButton.previouseElementSibling;
    let checked;
    for(const task of taskListArray){
        if(task.id == editedTaskId){
            checked = task.status;
            break;
        };
    }
    if
}



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