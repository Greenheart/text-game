(() => {
    const startRoom = {
        name: 'start',
        connections: {
            'east': 'kitchen'
        },
        items: [{
            name: 'note',
            actions: {
                read: room => {
                    room.game.text('This is a note. Most interesting. Indeed.')
                }
            }
        }],
        title: 'The Beginning',
        description: `<p>You are standing in a room with a door to the <b>east</b>.</p>`
    }

    const kitchen = {
        name: 'kitchen',
        connections: {
            'west': 'start'
        },
        items: [],
        title: 'Kitchen',
        description: `<p>
            This room has a strange smell. Probably coming from mountains of unwashed dishes.<br>
            You have a door leading <b>west</b>.
        </p>`
    }

    window.rooms = [
        startRoom,
        kitchen
    ]
})()
