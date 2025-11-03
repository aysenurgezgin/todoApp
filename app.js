"use strict";
const txtTaskDescription= document.getElementById("txt-task-description");
const btnAddTask = document.getElementById("btn-add-task");
const taskList = document.getElementById("task-list");
const btnClear = document.querySelectorAll("#filters span");



let isEditMode = false; //Eğer bu değişken false ise Yeni Kayıt modundayız, true ise Düzenleme modundayız.
let editedTaskId; //O anda hangi görev düzenleniyor ise uygulama boyunca geçerli olacak şekilde o görevin id'sini tutmaya yarar.
let filterMode = "all";


let taskListArray = [];



//btnAddTask elementine click yapıldığında çalışacak fonksiyonun adı addTask'tir.
btnAddTask.addEventListener("click", addTask);



//btnClearAll elementine click yapıldığında çalışacak fonksiyonun adı clearAll'dur.
btnClearAll.addEventListener("click", clearAll);



























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