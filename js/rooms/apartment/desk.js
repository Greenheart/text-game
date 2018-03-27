window.rooms.push({
    title: 'The Desk',
    name: 'apartment.livingRoom.desk',
    connections: {
        'east': 'apartment.livingRoom',
        'west': 'apartment.livingRoom.computer'
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
    }],
    description: `<p>The desk is filled with various notes. One of them catches your eye because it looks similar to the one in the hallway. There's also a computer to your <b>west</b>.</p>
    <p>If you continue past the desk and go <b>south</b>, you will get to the bedroom. Or go <b>east</b> to get back to the center of the living room</p>`
    // IDEA: perhaps 'use computer' should navigate to the computer
    // For now though, just use normal directions to navigate between the computer and the room itself.
})
