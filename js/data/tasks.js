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
    onCompletion (task) {
        task.game.triggerEvent('anyone-home-completed')
    }
}]
