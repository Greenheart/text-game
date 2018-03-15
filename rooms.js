(() => {
    const start = {
        name: 'start',
        connections: {
            'north': 'apartment.outside'
        },
        description: `<p>
            You're on your way to your best friend's place. He tried calling you three times earlier today and eventually left a message.<br>
        </p>
        <p>"I have something important to tell you. Could you come over?"</p>
        <p>So here you are on the street, leading <b>north</b> to your friend's apartment.</p>`,
        title: 'The Beginning'
    }

    const apartment = {
        outside: {
            name: 'apartment.outside',
            connections: {
                'north': 'apartment.hallway'
            },
            title: 'Outside your friend\'s apartment',
            items: [{
                name: 'doorbell',
                movable: false,
                actions: {
                    use: (room, item) => {
                        switch (item.state.used) {
                            case 0:
                                room.game.addText('<p>The doorbell rings but nothing happens.</p>')
                                break
                            case 1:
                                room.game.addText('<p>Still no reaction.</p><p>Maybe <b>check</b> the doorhandle?</p>')
                                break
                        }

                        item.state.used++
                    }
                },
                state: {
                    used: 0
                }
            }, {
                name: 'doorhandle',
                movable: false,
                actions: {
                    // NOTE: Not ideal to duplicate actions, but until a better solution is found, this allows for fast content creation :D
                    check: room => {
                        room.game.text(`<p>Strange. It's not like your friend to leave the door unlocked.</p>
                        <p>Go <b>north</b> to enter.</p>`)
                        room.state.doorhandleChecked = true
                        room.game.itemText('')
                    },
                    use: room => {
                        room.game.text(`<p>Strange. It's not like your friend to leave the door unlocked.</p>
                        <p>Go <b>north</b> to enter.</p>`)
                        room.state.doorhandleChecked = true
                        room.game.itemText('')
                    }
                }
            }],
            state: {
                doorhandleChecked: false
            },
            playerCanLeave: (room, direction) => {
                if (direction === 'north') {
                    if (room.state.doorhandleChecked) {
                        return true
                    } else {
                        return 'The door is not open.'
                    }
                }
            },
            description: `<p>You're standing outside your friend's door. He lives on the fifth floor in a pretty new house.</p>
            <p>Gosh, it's already been three months since he moved in, even though it feels like yesterday. It was also somewhere around that time that he started his new job.</p>`
        },
        hallway: {
            name: 'apartment.hallway',
            connections: {
                'east': 'apartment.bathRoom',
                'north': 'apartment.livingRoom'
            },
            items: [{
                name: 'note',
                actions: {
                    read: room => {
                        room.game.text('This is a note. Most interesting. Indeed.')
                    }
                }
            }],
            title: 'Hallway',
            description: `<p>Your friend's hallway is rather small. Barely enough space for two people because of all clothes and shoes.
            There are two doorways: One leading to the <b>north</b> and another to the <b>east</b>.</p>`
        },
        bathRoom: {
            name: 'apartment.bathRoom',
            connections: {
                'west': 'apartment.hallway',
                'east': 'apartment.bathRoom.shower'
            },
            title: 'Bathroom',
            description: `<p>In contrast to the hallway, the bathroom is quite large and open. The mix of light colors give a easing feeling. However, there's just something that's off.</p>
            <p>There seems to be something stained on the glass surface of the shower cabinet.</p>
            <p>Go <b>east</b> to check the shower more closely. The hallway is to the <b>west</b></p>`
        },
        shower: {
            name: 'apartment.bathRoom.shower',
            connections: {
                'west': 'apartment.bathRoom'
            },
            title: 'Shower',
            description: `<p>There is blood stained on the glass doors.</p>
            <p>After a closer look, you even notice there's a blood trail on the floor, leading all the way back to the hallway door in the <b>west</b>.</p>
            <p>Wonder if this is what your friend wanted to talk about.</p>`
        },
        kitchen: {
            name: 'apartment.kitchen',
            connections: {
                'west': 'apartment.livingRoom'
            },
            items: [],
            title: 'Kitchen',
            description: `<p>This room has a strange smell. Probably coming from the mountains of unwashed dishes.</p>
                <p>The living room is to your <b>west</b>.</p>`
        },
        livingRoom: {
            name: 'apartment.livingRoom',
            connections: {
                'south': 'apartment.hallway',
                'west': 'apartment.livingRoom.desk',
                'east': 'apartment.kitchen'
            },
            title: 'Living Room',
            description: `<p>A cozy sofa, a TV and a small desk in the corner to the <b>west</b>.</p>`
        },
        desk: {
            name: 'apartment.livingRoom.desk',
            connections: {
                'east': 'apartment.livingRoom'
            },
            title: 'Desk',
            description: `<p>The desk has a open laptop and is full of sticky notes. The sofa is to the <b>east</b>.</p>`
        }
    }

    window.rooms = [
        start,
        ...Object.values(apartment)
    ]
})()
