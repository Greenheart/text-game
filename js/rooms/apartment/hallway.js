window.rooms.push({
    title: 'The Hallway',
    name: 'apartment.hallway',
    connections: {
        'east': 'apartment.bathroom',
        'north': 'apartment.livingRoom'
    },
    items: [{
        name: 'note',
        id: 'note-1',
        actions: {
            read (room, note) {
                room.game.text(`
                    <p class="note-heading">${note.state.date}</p>
                    <p>I've started feeling a bit dizzy lately. Using this device isn't supposed to feel like this. My boss ensured me that this is nothing harmful though.</p>
                `)
            }
        },
        state: {
            date: 'Wednesday, April 11th'
        }
    }],
    description: `<p>Kevin's hallway is rather small. Barely enough space for two people because of all clothes and shoes.
    There are two doorways: one leading to the <b>north</b> and another to the <b>east</b>.</p>`
})
