window.rooms.push({
    title: 'The Stairwell',
    id: 'apartment.outside',
    items: [{
        name: 'doorbell',
        id: 'doorbell',
        movable: false,
        actions: {
            use (room, item) {
                switch (item.state.used) {
                    case 0:
                        room.game.addText('<p>The doorbell rings but nothing happens.</p>')
                        break
                    case 1:
                        room.game.addText('<p>Still no reaction.</p><p>Maybe <b>check</b> the <i>doorhandle</i>?</p>')
                        break
                }
                room.showItems()
                item.state.used++
            }
        },
        state: {
            used: 0
        }
    }, {
        name: 'doorhandle',
        id: 'doorhandle',
        movable: false,
        actions: {
            check (room, item) {
                room.game.triggerEvent('enter-apartment')
            },
            use (room, item) {
                item.actions.check(room, item)
            }
        }
    }],
    description: `<p>You're standing outside Kevin's door. He lives on the fifth floor in a pretty new house.</p>
    <p>Gosh, it's already been three months since he moved in, even though it feels like yesterday. It was also somewhere around that time that he started his new job.</p>`
})
