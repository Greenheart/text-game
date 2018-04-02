window.rooms.push({
    title: 'The Living Room',
    name: 'apartment.livingRoom',
    connections: {
        'south': 'apartment.hallway',
        'west': 'apartment.livingRoom.desk',
        'east': 'apartment.kitchen',
        'north': 'apartment.livingRoom.sofa'
    },
    items: [{
        name: 'poster',
        id: 'poster-1',
        actions: {
            read (room) {
                room.game.title('[Y corp] Poster')
                room.game.text(`
                    <p class="poster-heading">Be connected on a whole new level!</p>
                    <p>Thanks to the new [X product], the world has never been closer to you.</p>
                    <p>Imagine the possibilities of accessing information instantaneously. Imagine having your friends with you at all times. Imagine never having to bring another computing device.</p>
                    <p>[Y corp] - <i>connect your future!</i></p>
                `)
            }
        }
    }],
    description: `<p>Big and open, this room is the center of the apartment. The late afternoon sun shines through the windows, warming your feet.</p>
    <p>Right in front of you, to the <b>north</b>, is a sofa and TV with all kinds of game consoles.
    You can also go <b>west</b> to the workspace, <b>east</b> to the kitchen, or <b>south</b> to the hallway.</p>`
})
