window.gameEvents = [{
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
    }
}]