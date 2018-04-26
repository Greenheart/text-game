window.rooms.push({
    title: 'Fridge Door',
    id: 'apartment.kitchen.fridge',
    connections: {
        'south': 'apartment.kitchen'
    },
    items: [{
        name: 'TV timetable',
        id: 'tv-timetable',
        actions: {
            read (room, item) {
                room.game.title('TV Timetable')
                room.game.text(`
                    <p>The timetable is hanging on the right side of the fridge door, listing TV programs for the coming week. A few of them are circled in.</p>
                    <p><i>Who even keeps these anymore? There's an app for this - in the TV itself.</i></p>
                `)
            },
            view (room, item) {
                item.actions.read(room, item)
            }
        },
        movable: false
    }],
    // TODO: Add 1 or 2 notes here. Also consider addding a picture of some kind.
    description: `<p>The fridge door is filled with various notes. Go <b>south</b> to get to the kitchen entrance.</p>`
})
