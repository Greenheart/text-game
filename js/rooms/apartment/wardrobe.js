window.rooms.push({
    title: 'The Wardrobe',
    name: 'apartment.bedroom.wardrobe',
    connections: {
        'north': 'apartment.bedroom'
    },
    items: [
        // TODO: Add white box
        // TODO: Add support for 'move' action. In dictionary and in player.js
        // TODO: Add jacket item that has to be moved to reveal the white box.
        // Maybe use room.state and only add the white box to room.items once the jacket has been moved.
        // Maybe replace the jacket with white box instead of just adding it, as the jacket has served its purpose.
    ],
    description: `<p>Among clothes and other things , a small white box is partially revealed. Try to <b>move</b> the <i>jacket</i> covering it.</p>
    <p>The center of the bedroom is to your <b>north</b>.</p>`
})
