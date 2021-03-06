window.rooms.push({
    title: 'The Living Room',
    id: 'apartment.livingRoom',
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
                // IDEA: Make it clear that this poster is inofficial, given to Kevin as part of his work.
                // Maybe move it to the bedroom to make it less revealing.
                room.game.title('[Y corp] Poster')
                room.game.text(`
                    <p class="poster-heading">Be connected on a whole new level!</p>
                    <p>Thanks to the new [X product], the world has never been closer to you.</p>
                    <p>Imagine the possibilities of accessing information instantaneously. Imagine having your friends with you at all times. Imagine never having to bring another computing device.</p>
                    <p>[Y corp] - <i>connect your future!</i></p>
                `)
            },
            view (room, item) {
                item.actions.read(room)
            }
        }
    }],
    description: `<p>Big and open, this room is the center of the apartment. The late afternoon sun shines through the windows, warming your feet.</p>
    <p>Right in front of you, to the <b>north</b>, is a sofa and TV with all kinds of game consoles.
    You can also go <b>west</b> to the workspace, <b>east</b> to the kitchen, or <b>south</b> to the hallway.</p>`,
    playerCanLeave (room, direction) {
        if (direction === 'north') {
            room.game.player.interactions.apartment.triedVisitingSofa = true

            if (!room.game.player.hasCompletedTask('anyone-home')) {
                return 'I should probably see if Kevin is at home before going there.'
            }
        }
        return true
    }
})
