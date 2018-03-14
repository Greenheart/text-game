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
                actions: {
                    use: (room, item) => {
                        // TODO: Implement `use doorhandle` or `open door`
                        if (item.state.used) {
                            room.game.addText('<p>Still no reaction.</p>Maybe <b>check</b> the doorhandle?')
                        } else {
                            room.game.addText('<p>The doorbell rings but nothing happens.</p>')
                        }
                        item.state.used++
                    }
                },
                state: {
                    used: 0
                }
            }, {
                name: 'doorhandle',
                actions: {
                    // NOTE: Not ideal to duplicate actions, but until a better solution is found, this allows for fast content creation :D
                    check: room => {
                        room.game.text(`<p>Strange. It's not like your friend to leave the door unlocked.</p>
                        <p>Go <b>north</b> to enter.</p>`)
                        room.state.doorhandleChecked = true
                    },
                    use: room => {
                        room.game.text(`<p>Strange. It's not like your friend to leave the door unlocked.</p>
                        <p>Go <b>north</b> to enter.</p>`)
                        room.state.doorhandleChecked = true
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
                'east': 'apartment.kitchen',
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
        kitchen: {
            name: 'apartment.kitchen',
            connections: {
                'west': 'apartment.hallway'
            },
            items: [],
            title: 'Kitchen',
            description: `<p>
                This room has a strange smell. Probably coming from mountains of unwashed dishes.<br>
                You have a door leading <b>west</b>.
            </p>`
        },
        livingRoom: {
            name: 'apartment.livingRoom',
            connections: {
                'south': 'apartment.hallway',
                'west': 'apartment.livingRoom.desk'
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
