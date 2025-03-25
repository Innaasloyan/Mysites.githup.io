const fs = require('fs');
const readline = require('readline');

// Класс для представления задачи
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    markAsCompleted() {
        this.completed = true;
    }

    toString() {
        return `${this.description} [${this.completed ? '✓' : '✗'}]`;
    }
}

// Класс для управления списком задач
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
    }

    removeTask(index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log("Задача с таким индексом не найдена.");
            return;
        }
        this.tasks.splice(index, 1);
    }

    markTaskAsCompleted(index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log("Задача с таким индексом не найдена.");
            return;
        }
        this.tasks[index].markAsCompleted();
    }

    listTasks() {
        console.log("Список задач:");
        this.tasks.forEach((task, index) => {
            console.log(`${index}. ${task}`);
        });
    }

    listCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        console.log("Список выполненных задач:");
        completedTasks.forEach((task, index) => {
            console.log(`${index}. ${task}`);
        });
    }

    saveToFile(filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this.tasks));
        console.log("Список задач сохранён в файл.");
    }

    loadFromFile(filePath) {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            this.tasks = JSON.parse(data);
            console.log("Список задач загружен из файла.");
        } else {
            console.log("Файл не найден.");
        }
    }
}

// Основное приложение
const taskManager = new TaskManager();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const showMenu = () => {
    console.log("\nВыберите действие:");
    console.log("1. Добавить задачу");
    console.log("2. Удалить задачу");
    console.log("3. Пометить задачу как выполненную");
    console.log("4. Показать все задачи");
    console.log("5. Показать выполненные задачи");
    console.log("6. Сохранить задачи в файл");
    console.log("7. Загрузить задачи из файла");
    console.log("8. Выход");
};

const handleUserInput = (choice) => {
    switch (choice) {
        case '1':
            rl.question("Введите описание задачи: ", (desc) => {
                taskManager.addTask(desc);
                showMenu();
            });
            break;
        case '2':
            rl.question("Введите индекс задачи для удаления: ", (index) => {
                taskManager.removeTask(Number(index));
                showMenu();
            });
            break;
        case '3':
            rl.question("Введите индекс задачи для пометки как выполненной: ", (index) => {
                taskManager.markTaskAsCompleted(Number(index));
                showMenu();
            });
            break;
        case '4':
            taskManager.listTasks();
            showMenu();
            break;
        case '5':
            taskManager.listCompletedTasks();
            showMenu();
            break;
        case '6':
            rl.question("Введите имя файла для сохранения: ", (filePath) => {
                taskManager.saveToFile(filePath);
                showMenu();
            });
            break;
        case '7':
            rl.question("Введите имя файла для загрузки: ", (filePath) => {
                taskManager.loadFromFile(filePath);
                showMenu();
            });
            break;
        case '8':
            rl.close();
            break;
        default:
            console.log("Неверный выбор. Попробуйте снова.");
            showMenu();
    }
};

// Начало работы приложения
showMenu();
rl.on('line', handleUserInput);
