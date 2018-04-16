window.rooms.push({
    title: 'The Desk',
    name: 'apartment.livingRoom.desk',
    connections: {
        'east': 'apartment.livingRoom',
        'south': 'apartment.bedroom'
    },
    items: [{
        name: 'note',
        id: 'note-2',
        actions: {
            read (room, note) {
                room.game.text(`
                    <p class="note-heading">${note.state.date}</p>
                    <p>My headaches are still getting worse. Even worse, my colleagues just keep saying that everything will be fine eventually, that this is just a transitional phase.</p>
                    <p>I don't know anymore.</p>
                `)
            }
        },
        state: {
            date: 'Friday, April 20th'
        }
    }, {
        name: 'computer',
        id: 'computer',
        actions: {
            use (room) {
                // IDEA: Only allow player to use the computer when they've watched TV.
                room.game.player.moveTo(
                    room.game.rooms['apartment.livingRoom.computer']
                )
            }
        },
        movable: false
    }],
    playerCanInteract ({ room, item }) {
        if (item.name === 'computer') {
            // TODO: Check for the watch TV task. Player need to see the news on TV before using the computer.
            if (!room.game.tasks['anyone-home'].completed) {
                return 'I should probably see if Kevin is at home first.'
            }
        }
        // Allow other interactions.
        return true
    },
    description: `<p>The desk is filled with various notes. One of them catches your eye because it looks similar to the one in the hallway.</p>
    <p>If you continue past the desk and go <b>south</b>, you will get to the bedroom. Or go <b>east</b> to get back to the center of the living room.</p>`
})
