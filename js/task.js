class Task {
    constructor (task, game) {
        this.title = task.title
        this.id = task.id
        this.game = game
        this.description = task.description

        // Required methods to handle the lifecycle of the task.
        // Bind them to automatically provide required parameters when they are called.
        // This simplifies usage of these methods for content creators.
        this.isCompleted = task.isCompleted.bind(null, game)
        this.onCompletion = task.onCompletion.bind(null, this)

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

    complete () {
        // NOTE: Maybe force this status to stick around until the task really is completed.
        // Set a flag in `game.status` and conditionally update the status message
        // Or, use another location for showing sticky status messages.
        // Or just force the player to view the task before they can continue - use `Press enter to continue...`
        this.game.status(`<span class="green-highlight">Task completed!</span>`)
        this.game.setPlaceholder('Press enter to see details...')
        this.completed = true
        this.onCompletion()
    }
}
