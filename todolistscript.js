let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = {
            id: Date.now(),
            text: taskInput.value.trim(),
            completed: false
        };

        tasks.push(task);
        updateTaskList();
        taskInput.value = '';
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.id = `task_${task.id}`;
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="button-group">
                <button class="complete-button" onclick="completeTask(${task.id})"><i class="fas fa-check"></i></button>
                <button class="edit-button" onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                <button class="delete-button" onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        const deletedElement = document.getElementById(`task_${deletedTask.id}`);

        if (deletedElement) {
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash-alt animate-icon';
            deletedElement.appendChild(trashIcon);

            setTimeout(() => {
                trashIcon.classList.remove('animate-icon');
                setTimeout(() => {
                    deletedElement.classList.add('slide-out');
                    setTimeout(() => {
                        updateTaskList();
                    }, 500);
                }, 500);
            }, 100);
        }
    }
}

function editTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const editedTask = tasks[taskIndex];
        const newText = prompt('Edytuj zadanie:', editedTask.text);

        if (newText !== null) {
            tasks[taskIndex].text = newText.trim();
            updateTaskList();
        }
    }
}

function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        const completedElement = document.getElementById(`task_${id}`);

        if (completedElement) {
            const checkIcon = document.createElement('i');
            checkIcon.className = 'fas fa-check animate-icon';
            completedElement.appendChild(checkIcon);

            setTimeout(() => {
                checkIcon.classList.remove('animate-icon');
                    setTimeout(() => {
                        updateTaskList();
                    }, 500);
            }, 100);
        }
    }
}

function exportTasks() {
    const data = JSON.stringify(tasks);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'zadania.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importTasks() {
    const importInput = document.getElementById('importInput');
    const file = importInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedTasks = JSON.parse(e.target.result);
                tasks = importedTasks;
                updateTaskList();
            } catch (error) {
                alert('Nieprawidłowy format pliku');
            }
        };

        reader.readAsText(file);
    }
}