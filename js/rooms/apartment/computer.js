window.rooms.push({
    title: 'On the Computer',
    name: 'apartment.livingRoom.computer',
    connections: {
        'east': 'apartment.livingRoom.desk'
    },
    items: [{
        // TODO: Add the same feature here as for the sofa: Only allow to visit this room after the first task is completed.
        name: 'browser',
        id: 'browser',
        actions: {
            use: room => {
                // room.game.text('Very nice browser. Indeed.')
            }
        },
        movable: false
    }],
    // `item.useDefaultDisplay` - if item.useDefaultDisplay !== false:
    // IDEA: Make it possible for items to explicitly tell the room to not use the standard showItems().
    // This would allow more customizable description of the items - especially useful for the computer items which essentially represent actions.
    description: `<p>As the computer starts, you realize that Kevin has no password. So careful with security in every way, yet leaving this detail unchecked.</p>
    <p><i>Just imagine what a burglar, casually walking into his unlocked apartment could do...</i></p>
    <p>Go <b>east</b> to get back to the desk.</p>`
})
