window.rooms.push({
    title: 'The Bedroom',
    name: 'apartment.bedroom',
    connections: {
        'north': 'apartment.livingRoom.desk',
        'west': 'apartment.bedroom.window',
        'south': 'apartment.bedroom.wardrobe'
    },
    items: [{
        name: 'note',
        id: 'note-3',
        actions: {
            read (room, note) {
                room.game.text(`
                    <p class="note-heading">${note.state.date}</p>
                    <p>It's sometimes hard to think clearly. My memory is failing me and make me forget things.</p>
                    <p>I need to be more careful and start writing more notes. Hopefully, this can help me stay on track.</p>
                `)
            }
        },
        state: {
            date: 'Sunday, April 22nd'
        }
    }],
    description: `<p>Kevin's bedroom is quite a mess. Clothes, books and various things are scattered across the room.
    Sure, he never was an organized person, but this is just too much to be done only by himself.</p>
    <p>The wardrobe along the <b>south</b> wall has its doors wide open. To the <b>west</b>, several notes are attached to the inside of the window. Go <b>north</b> to return to the desk.</p>`
})
