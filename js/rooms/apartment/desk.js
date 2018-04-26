window.rooms.push({
    title: 'The Desk',
    id: 'apartment.livingRoom.desk',
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
                // Or maybe even better, allow TV and computer to be used in any order,
                // both giving additional content that deepen the story.
                // In this case, the requirement should be that the player has completed task 'anyone-home'.
                room.game.player.moveTo({ roomId: 'apartment.livingRoom.computer' })
            }
        },
        movable: false
    }],
    playerCanInteract (room, { item }) {
        if (item.name === 'computer' && !room.game.player.hasCompletedTask('anyone-home')) {
            // TODO: Check for the watch TV task instead. Player need to see the news on TV before using the computer.
            return 'I should probably see if Kevin is at home first.'
        }
        return true
    },
    description: `<p>The desk is filled with various notes. One of them catches your eye because it looks similar to the one in the hallway.</p>
    <p>If you continue past the desk and go <b>south</b>, you will get to the bedroom. Or go <b>east</b> to get back to the center of the living room.</p>`
})
