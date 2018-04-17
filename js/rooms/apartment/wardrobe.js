window.rooms.push({
    title: 'The Wardrobe',
    name: 'apartment.bedroom.wardrobe',
    connections: {
        'north': 'apartment.bedroom'
    },
    items: [{
        name: 'jacket',
        id: 'jacket',
        actions: {
            move (room, item) {
                room.state.jacketMoved = true
                room.makeItemVisible('white box')
                room.hideItem('jacket')
                room.show()
            }
        },
        // IDEA: Maaaybe rename `item.movable` to `item.collectible` or something similar.
        // Since the adjective movable is related to the action `player.move(object)`, used in this room, it might be confusing.
        // We could replace it with something like `item.collectible`.
        // In that case, this property should keep the same functionality (Can the player pick up this object?), but shouldn't be related to if the item is movable.
        movable: false,
        useCustomDescription: ['apartment.bedroom.wardrobe']
    }],
    hiddenItems: [{
        // The white box is the packaging for the device that the company is testing.
        // This is a detail that players can find if they take time to explore the surroundings.
        name: 'white box',
        id: 'white box',
        actions: {
            read (room, item) {
                room.game.title('The White Box')
                room.game.text(`
                    <p>"[Y corp]: Device Prototype 0x137".</p>
                    <p><i>Hmm... I wonder how the device once inside here is releated to my friend's work.</i></p>
                `)
                room.game.player.activeItem = item
                room.game.useContinuePlaceholder()
            },
            take (room, item) {
                item.actions.read(room, item)
            }
        },
        useCustomDescription: ['apartment.bedroom.wardrobe']
    }],
    description (room) {
        let dynamic = ''

        if (!room.state.jacketMoved) {
            dynamic = '<p>It seems like something is partially covered beneath a <i>jacket</i>.</p>'
        } else if (room.hasItem({ name: 'white box' })) {
            // IDEA: (low prio) Maybe add this during a GameEvent to clarify what happens?
            dynamic = `<p>Moving the jacket reveals a small <i>white box</i> that has been opened. There's something written on it.</p>`
        }

        return `<p>The wardrobe is so full with clothes and other things that much are hanging out thorugh the doors.
        Either Kevin was leaving in a hurry, or someone else have been here, searching for something.</p>
        ${dynamic} <p>The center of the bedroom is to your <b>north</b>.</p>`
    },
    state: {
        jacketMoved: false
    }
})
