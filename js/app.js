const saveButton = document.getElementById('form-task');
saveButton.addEventListener('submit', saveTask);
getTasks();

//Build my function to save a task
function saveTask(e){
    e.preventDefault();
    let todoTitle = document.getElementById('title').value;
    let todoDesc = document.getElementById('description').value;

    console.log(todoTitle)
    console.log(todoDesc)

    let newTask = {
        title: todoTitle,
        desc: todoDesc
    };

    console.log(newTask)

    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();

    // Reset tasks
    document.getElementById('form-task').reset();
    
}

// Function to delete
function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

//Edit a task

function editTask(title){
    let newDesc = prompt("Please change the Description","New Description Here");

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            newDesc ? tasks[i].desc = newDesc : "No description";
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

//Show the to-do list
function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    tasksView.innerHTML = '';

    // Replace 'X' with trashcan
    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].desc;

        tasksView.innerHTML += 
        `<div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-3 text-start">
                        <p>${title}</p>
                    </div>
                    <div class="col-sm-6 text-start">
                        <p>${description}</p>
                    </div>
                    <div class="col-sm-3 text-end">
                    <i class="far fa-edit" onclick="editTask('${title}')"></i>
                    <i class="fas fa-trash-alt" style="color: red;" onclick="deleteTask('${title}')"></i>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

// getTasks();