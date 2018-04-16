window.rooms.push({
    title: 'The Computer',
    name: 'apartment.livingRoom.computer',
    connections: {
        'back': 'apartment.livingRoom.desk'
    },
    items: [{
        name: 'browser',
        id: 'browser',
        actions: {
            use (room, item) {
                room.game.text('Very nice browser. Indeed.')
                room.game.useContinuePlaceholder()
                room.game.player.activeItem = item
            }
        },
        movable: false
    }],
    // `item.useDefaultDisplay` - if item.useDefaultDisplay !== false:
    // ALternative syntax: `item.useCustomDescription = [Array with `room.name`s where the custom description should be used]`
    // IDEA: Make it possible for items to explicitly tell the room to not use the standard showItems().
    // This would allow more customizable description of the items - especially useful for the computer items which essentially represent actions.
    description: `<p>As the computer starts, you realize that Kevin has no password. So careful with security in every way, yet leaving this detail unchecked.</p>
    <p><i>Just imagine what a burglar, casually walking into his unlocked apartment could do...</i></p>
    <p>Go <b>back</b> to return to the desk.</p>`
    // IDEA: This would be a good place to use a dynamic description, to show something else once the first text has been read.
})
