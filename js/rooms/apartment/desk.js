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
            use (room, item) {
                room.game.customParser = CustomParsers.computer
                room.game.player.activeItem = item

                game.title('The Computer')
                room.game.text(`<p>As the computer starts, you realize that Kevin has no password. So careful with security in every way, yet leaving this detail unchecked.</p>
                <p><i>Just imagine what a burglar, casually walking into his unlocked apartment could do...</i></p>`)
                room.game.itemText(`There is a <i>browser</i> here.`)
                room.game.status('Press enter to get back.')
            }
        },
        state: {
            view: 'main'
        },
        movable: false
    }],
    description: `<p>The desk is filled with various notes. One of them catches your eye because it looks similar to the one in the hallway. There's also a computer to your <b>west</b>.</p>
    <p>If you continue past the desk and go <b>south</b>, you will get to the bedroom. Or go <b>east</b> to get back to the center of the living room.</p>`
    // IDEA: perhaps 'use computer' should navigate to the computer
    // For now though, just use normal directions to navigate between the computer and the room itself.
    // This could be implemented using a `CustomParser`, which would be activated once `use computer` is entered by the player.
})
