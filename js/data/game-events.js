window.gameEvents = [{
    id: 'enter-apartment',
    title: 'The door opens...',
    description: `<p><i>Strange. It's not like Kevin to leave his door unlocked.</i></p>`,
    showOnStart: true,
    onEnd (event) {
        event.game.player.moveTo({ roomId: 'apartment.hallway' })
        event.game.player.giveNewTask('anyone-home')
    }
}, {
    id: 'anyone-home-completed',
    title: 'Kevin is not at home',
    description: `
        <p><i>I've been to all rooms now and he's not here.</i></p>
        <p><i>Maybe he went outside and just forgot to lock the door. He could be back any moment.</i></p>
        <p><i>I guess I could look around while waiting for him. Or just watch some TV.</i></p>
    `,
    onEnd (event) {
        event.game.player.tasks.find(t => t.id === 'anyone-home').active = false
        // TODO: Give next task to player -> explore the apartment and watch TV.
        // event.game.player.giveNewTask()
        if (event.game.player.interactions.apartment.triedUsingComputer) {
            event.game.showNotification('You can now use the computer.')
        }

        if (event.game.player.interactions.apartment.triedVisitingSofa) {
            event.game.showNotification('You can now go to the sofa and watch TV.', 15)
        }
    }
}]
