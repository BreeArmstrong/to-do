document.getElementById('form-task').addEventListener('submit', saveTask);

//Build my function to save a task
function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    let task = {
        title,
        description
    };

    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();

    // Reset tasks
    document.getElementById('form-task').reset();
    e.preventDefault();
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
            if (newDesc ? tasks[i].description = newDesc : "No description");
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
        let description = tasks[i].description;

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

getTasks();