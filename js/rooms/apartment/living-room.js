window.rooms.push({
    title: 'The Living Room',
    name: 'apartment.livingRoom',
    connections: {
        'south': 'apartment.hallway',
        'west': 'apartment.livingRoom.desk',
        'east': 'apartment.kitchen',
        'north': 'apartment.livingRoom.sofa'
    },
    description: `<p>Big and open, this room is the center of the apartment. The late afternoon sun shines through the windows, warming your feet.</p>
    <p>Right in front of you, to the <b>north</b>, is a sofa and TV with all kinds of game consoles.
    You can also go <b>west</b> to the workspace, <b>east</b> to the kitchen, or <b>south</b> to the hallway.</p>`
})
