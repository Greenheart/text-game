class Task {
    constructor (task, game) {
        this.title = task.title
        this.id = task.id
        this.game = game
        this.description = task.description

        // Required methods to handle the lifecycle of the task.
        this.isCompleted = task.isCompleted
        this.onCompletion = task.onCompletion

        // Default state
        this.completed = false
        this.active = false
    }

    static initializeTasks (game, taskConfigs) {
        // Prepare all tasks of the game.
        const tasks = {}
        for (const task of taskConfigs) {
            tasks[task.id] = new Task(task, game)
        }
        return tasks
    }
}
