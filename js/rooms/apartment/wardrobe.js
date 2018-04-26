window.rooms.push({
    title: 'The Wardrobe',
    id: 'apartment.bedroom.wardrobe',
    connections: {
        'north': 'apartment.bedroom'
    },
    items: [{
        name: 'jacket',
        id: 'jacket',
        actions: {
            move (room, item, hide = true) {
                if (room.id === 'apartment.bedroom.wardrobe') {
                    room.state.jacketMoved = true
                    room.makeItemVisible('white box')
                    if (hide) room.hideItem('jacket')
                    room.show()
                }
            },
            // Trigger the move action even if the user chooses to take the jacket.
            take (room, item) {
                if (room.id === 'apartment.bedroom.wardrobe') {
                    item.actions.move(room, item, false)
                }
            }
        },
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
                    <p><i>Hmm... I wonder if this could be for the device my friend mentioned in his notes.</i></p>
                `)
            },
            view (room, item) {
                item.actions.read(room, item)
            }
        },
        useCustomDescription: ['apartment.bedroom.wardrobe']
    }],
    description (room) {
        let dynamic = ''

        if (room.hasItem({ name: 'jacket' }) && !room.state.jacketMoved) {
            dynamic = '<p>It seems like something is partially covered beneath a <i>jacket</i>.</p>'
        } else if (room.hasItem({ name: 'white box' })) {
            dynamic = `<p>As you move the jacket, a small, opened <i>white box</i> is revealed. There's something written on it.</p>`
        }

        return `<p>The wardrobe is so full with clothes and other things that much are hanging out thorugh the doors.
        Either Kevin was leaving in a hurry, or someone else have been here, searching for something.</p>
        ${dynamic} <p>The center of the bedroom is to your <b>north</b>.</p>`
    },
    state: {
        jacketMoved: false
    }
})
