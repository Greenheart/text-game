window.tasks = [{
    title: 'Anyone home?',
    description: 'Find out if Kevin is at home. Why did he leave the door open?',
    id: 'anyone-home',
    isCompleted (game) {
        // The player has to visit all significant rooms of the apartment to complete this first task.
        const requiredRooms = ['hallway', 'bathroom', 'livingRoom', 'kitchen', 'desk', 'bedroom']

        return Object.keys(game.rooms)
                .filter(name => (
                    name.startsWith('apartment') &&
                    requiredRooms.some(roomName => name.endsWith(roomName))
                ))
                .map(name => game.rooms[name])
                .every(room => room.visited)
    },
    onCompletion (game, task) {
        console.log('You completed your task!', task.id)

        // TODO: Trigger a GameEvent to tell the user that they've completed their task.
        // TODO: Figure out a good way to show this to the user.
            // Probably not immediately when they visit the last room they need.
            // Probably let them read the room, but maybe "Press enter to see more about your task..."
            // Or just let it pop up immediately/ or even after a few seconds.
        task.completed = true
        task.active = false
    }
}]
