window.rooms.push({
    title: 'The Bathroom',
    id: 'apartment.bathroom',
    connections: {
        'west': 'apartment.hallway',
        'east': 'apartment.bathroom.shower'
    },
    description: `<p>In contrast to the hallway, the bathroom is quite large and open. The mix of light colors give you an relaxed feeling. However, there's just one detail that's off.</p>
    <p>There seems to be something stained on the glass surface of the shower cabinet.</p>
    <p>Go <b>east</b> to check the shower more closely. The hallway is to the <b>west</b>.</p>`
})
