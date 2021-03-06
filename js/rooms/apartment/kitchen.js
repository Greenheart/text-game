window.rooms.push({
    title: 'The Kitchen',
    id: 'apartment.kitchen',
    connections: {
        'west': 'apartment.livingRoom',
        'north': 'apartment.kitchen.fridge',
        'east': 'apartment.kitchen.table'
    },
    items: [],
    // IDEA: Maybe add a picture on the fridge door as well.
    // TODO: Update the description of fridge door.
    description: `<p>The first thing that hits you is the smell. It's most definitely coming from the mountains of unwashed dishes.</p>
    <p>To your <b>north</b>, the fridge door is full of notes. They seem to be similar to the one from the hallway.</p>
    <p>There's a kitchen table to the <b>east</b>. The living room is to the <b>west</b>.</p>`
})
