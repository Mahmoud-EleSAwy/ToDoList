let tasks = [
    {
        "title": "الورد اليومي",
        "date": "10/2/2026",
        "isDone": false
    },
    {
        "title": "الجيم",
        "date": "10/2/2026",
        "isDone": false
    },
    {
        "title": "الأذكار",
        "date": "10/2/2026",
        "isDone": false
    },
    
]

//---------------
function getTasksFromStorge() {
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    tasks = retrievedTasks ?? []
    // if (retrievedTasks == null) {
    //     tasks = []
    // }
    // else {
    //     tasks = retrievedTasks
    // }
}
getTasksFromStorge()

function fillTaskOnThePage() {
    
    document.getElementById("tasks-list").innerHTML = ""
    let index = 0

    for (task of tasks) {
    document.getElementById("tasks-list").innerHTML += `
        <div class="task-item ${task.isDone? 'done': ''}">
            <div class="task-info">
                <h2>${task.title}</h2>
                <span class="task-date"> <i class="fa-regular fa-calendar"></i> ${task.date}</span>
            </div>

            <div class="actions">
                
                <button onclick="deleteTask(${index})" class="btn delete"> <i class="fa-solid fa-trash"></i> </button>
                ${task.isDone? `
                    <button onclick="doneTask(${index})" class="btn check"> <i class="fa-solid fa-rotate-left"></i> </button>
                ` : `
                    <button onclick="doneTask(${index})" class="btn check"> <i class="fa-solid fa-check"></i> </button>
                `}
                <button onclick="editTask(${index})" class="btn edit"> <i class="fa-solid fa-pen"></i> </button>

            </div>

        </div>
        `
        index++
    }
}
fillTaskOnThePage()

// --------Add btn-----------------
document.getElementById("add-btn").addEventListener("click",function() {
    Swal.fire({
        title: 'مهمة جديدة',
        input: 'text',
        inputPlaceholder: 'اكتب عنوان المهمة هنا...',
        background: '#1e1e1e',      
        color: '#ffffff',        
        confirmButtonColor: '#8a2be2',
        confirmButtonText: 'إضافة',
        cancelButtonText: 'إلغاء',
        showCancelButton: true,
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            let taskName =  result.value
            let now = new Date()
            let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
            tasks.push({
                "title": taskName,
                "date": date,
                "isDone": false
            });
            storeTasks()
            fillTaskOnThePage()
        }
    })
})
// -----------------------------------------------
//------ Delete btn --------------
function deleteTask(index) {
    Swal.fire({
        title: 'هل انت متأكد من حذف مهمة',
        icon: 'warning',
        background: '#1e1e1e', 
        color: '#ffffff',           
        confirmButtonColor: '#8a2be2',
        confirmButtonText: 'تأكيد',
        cancelButtonText: 'إلغاء',
        showCancelButton: true,
        reverseButtons: true
    }).then((result) => {
        let check = result.value
        if (check == true) {
            tasks.splice(index, 1)
            storeTasks()
            fillTaskOnThePage()
        }
    })
}
// ----------------------------------------------

// ------ Edit btn --------------
function editTask(index) {
    Swal.fire({
        title: 'تعديل المهمة',
        input: 'text',
        inputValue: tasks[index].title,
        inputPlaceholder: 'اكتب عنوان المهمة هنا...',
        background: '#1e1e1e',    
        color: '#ffffff',         
        confirmButtonColor: '#8a2be2', 
        confirmButtonText: 'تحديث',
        cancelButtonText: 'إلغاء',
        showCancelButton: true,
        reverseButtons: true       
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            let newTitle = result.value
            tasks[index].title = newTitle
            storeTasks()
            fillTaskOnThePage()
        }
    })
}
// ----------------------------------------------

//------ Done btn --------------
function doneTask(index) {
    tasks[index].isDone = !tasks[index].isDone
    storeTasks()
    fillTaskOnThePage()
}

// ------- Storage Function ------------
function storeTasks() {
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksString)
}