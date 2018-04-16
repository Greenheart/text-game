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
                // TODO: Add item directly to the room, but make it hidden by default.
                room.items.push({
                    name: 'white box',
                    id: 'white box',
                    actions: {
                        take () {
                            // TODO: Allow items that are picked up to execute a callback
                            room.game.text(`
                                <p>As you pick up the box, you notice something is printed on it. "[Y corp]: [X product] - Prototype 0137".</p>
                                <p><i>I wonder if this package is releated to my friend's work.</i></p>
                            `)
                            room.game.player.activeItem = item
                            room.game.useContinuePlaceholder()
                        }
                    },
                    movable: true
                })
                room.show()

                // TODO: Find some way to hide/remove the jacket from this room. Make it impossible to see or interact with.
                item.hidden = true
            }
            // TODO: Add support for `item.useCustomDescription = [room.name]`
            // `room.name` indicates where the item shouldn't be shown with the regular method.
            // In other rooms, the regular method will be used.`
        },
        // TODO: Rename `item.movable` to `item.collectible`
        // Since the adjective movable isn't perfect, it should probably be replaced with `collectible`.
        // This property should keep the same functionality (Can the player pick up this object?), but shouldn't be related to if the item is movable.
        movable: false
    }],
    // IDEA: The white box is the packaging for the device that the company is testing.
    // This is a detail that players can find if they take time to explore the surroundings.
    description (room) {
        let dynamic

        if (!room.state.jacketMoved) {
            dynamic = '<p>It seems like something is partially covered beneath a <i>jacket</i>.</p>'
        } else {
            // IDEA: Maybe add this during a GameEvent to clarify what happens?
            dynamic = '<p>Moving the jacket reveals a small white box.</p>'
        }

        return `<p>The wardrobe is so full with clothes and other things that much are hanging out thorugh the doors.
        Either Kevin was leaving in a hurry, or someone else have been here, searching for something.</p>
        ${dynamic} <p>The center of the bedroom is to your <b>north</b>.</p>`
    },
    state: {
        jacketMoved: false
    }
})
