(() => {
    const start = {
        name: 'start',
        connections: {
            'north': 'apartment.outside'
        },
        description: `<p>
            You're on your way to your best friend's place. He tried calling you three times earlier today and eventually left a message.<br>
        </p>
        <p><i>"I can't believe this is happening... I have something important to tell you. Could you come over?"</i></p>
        <p>So here you are on the street, leading <b>north</b> to your friend's apartment.</p>`,
        title: 'The Beginning'
    }

    const apartment = {
        outside: {
            name: 'apartment.outside',
            connections: {
                'north': 'apartment.hallway'
            },
            title: 'The Stairwell',
            items: [{
                name: 'doorbell',
                id: 'doorbell',
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
                        room.showItems()
                        item.state.used++
                    }
                },
                state: {
                    used: 0
                }
            }, {
                name: 'doorhandle',
                id: 'doorhandle',
                movable: false,
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
                'east': 'apartment.bathRoom',
                'north': 'apartment.livingRoom'
            },
            items: [{
                name: 'note',
                id: 'note-1',
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
            description: `<p>In contrast to the hallway, the bathroom is quite large and open. The mix of light colors give you an easing feeling. However, there's just something that's off.</p>
            <p>There seems to be something stained on the glass surface of the shower cabinet.</p>
            <p>Go <b>east</b> to check the shower more closely. The hallway is to the <b>west</b>.</p>`
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
                'west': 'apartment.livingRoom',
                'north': 'apartment.kitchen.fridge',
                'east': 'apartment.kitchen.table'
            },
            items: [],
            title: 'Kitchen',
            description: `<p>The first thing that hits you is the smell. It's most definitely coming from the mountains of unwashed dishes.</p>
            <p>To your <b>north</b>, the fridge's door is full of notes. They seem to be similar to the one from the hallway.</p>
            <p>Table to your <b>east</b>. The living room is to your <b>west</b>.</p>`
        },
        fridge: {
            name: 'apartment.kitchen.fridge',
            connections: {
                'south': 'apartment.kitchen'
            },
            title: 'Fridge Door',
            description: `<p>Some interesting notes. Go <b>south</b> to get to the kitchen entrance.</p>`
        },
        table: {
            name: 'apartment.kitchen.table',
            connections: {
                'west': 'apartment.kitchen'
            },
            title: 'Kitchen Table',
            description: `<p>The table has two small piles of paper. The first has letters and magazines and the second has some notes.</p>
            <p>Go <b>west</b> to get back to the kitchen entrance.</p>`
        },
        livingRoom: {
            name: 'apartment.livingRoom',
            connections: {
                'south': 'apartment.hallway',
                'west': 'apartment.livingRoom.desk',
                'east': 'apartment.kitchen',
                'north': 'apartment.livingRoom.sofa'
            },
            title: 'Living Room',
            description: `<p>Big and open, this room is the centre of the apartment. The late afternoon sun shines through the windows, warming your feet.</p>
            <p>Right in front of you, to the <b>north</b>, is a sofa and TV with all kinds of game consoles.
            You can also go <b>west</b> to the workspace, <b>east</b> to the kitchen, or <b>south</b> to the hallway.</p>`
        },
        sofa: {
            name: 'apartment.livingRoom.sofa',
            connections: {
                'south': 'apartment.livingRoom'
            },
            // TODO: Maybe change description based on if the player has found out that the friend isn't home.
            // Maybe only allow the player to visit the sofa if they have completed the task to find out their friend's whereabouts.
            // Then add additional description to the livingRoom (or wherever the player currently is)
                // "Maybe I could check relax in the sofa while I wait." This gives incitement to visit the sofa once it's unlocked.
            description: `<p>All the devices and consoles of different shapes and colors tell about your friend's technology interest.
            Some are even partially disassembeled, or have custom hardware modifications.</p>
            <p>You notice that one of the newest media devices is connected to the TV. That couldn't have been cheap.<p>
            <p>Sitting in the comfortable sofa, you wonder when your friend will come home. It's starting to get late. Maybe you can do something while waiting.</p>
            <p>The centre of the living room is to your <b>south</b></p>`,
            title: 'In the sofa in front of the TV',
            items: [{
                name: 'photo frame',
                id: 'photo-frame',
                actions: {
                    use: (room, item) => {
                        /* TODO: add support for viewing multiple photos.
                            - Either use `next` and `previous` or `prev` to navigate
                            - Or `use [photo frame]` multiple times, each showing new photos.
                        */
                        room.game.text(`Very nice photos indeed.`)
                        room.game.player.activeItem = item
                        room.game.useContinuePlaceholder()
                    }
                }
                // TODO: make it possible to watch tv.
                    // - Add item, watch action and set movable: false.
                    // - Add Player.watch() and maybe Player.watchItem()

                // IDEA: Maybe only allow watching the TV program when the first task is completed: finding out if the friend is at home or not.
                // For this, some kind of global task system is needed - it needs to keep track of global state that rooms can use to alter their descriptions conditionally
                // For dynamic room descriptions, allow description to either be a string (static) or a function (dynamic).

                // IDEA: make it possible to inspect the devices and consoles - amongh them, there are some interesting papers/notes
                    // The papers reveal that some consoles was gifts from the company.
                    // - "Weird. Why would a company give so many gifts to a single employee?"
                    // These details add to the general idea that the friend got "unbelievable perks" to help him stay motivated (in the though testing he worked with).
            }]
        },
        desk: {
            name: 'apartment.livingRoom.desk',
            connections: {
                'east': 'apartment.livingRoom',
                'west': 'apartment.livingRoom.computer'
            },
            title: 'Desk',
            items: [{
                name: 'note',
                id: 'note-2',
                actions: {
                    read: room => {
                        room.game.text(`
                            <p class="note-heading">Thursday April 14th</p>
                            <p>My headaches are still getting worse. Even worse, my colleagues just keep saying that everything will be fine eventually, that this is just a transitional phase.</p>
                            <p>I don't know anymore.</p>
                        `)
                    }
                }
            }],
            description: `<p>The desk is filled with various notes. One of them catches your eye because it looks similar to the one in the hallway. There's also a computer to your <b>west</b>.</p>
            <p>If you continue past the desk and go <b>south</b>, you will get to the bedroom. Or go <b>east</b> to get back to the centre of the living room</p>`
            // IDEA: perhaps 'use computer' should navigate to the computer
            // For now though, just use normal directions to navigate between the computer and the room itself.
        },
        computer: {
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
            title: 'Computer',
            // `item.useDefaultDisplay` - if item.useDefaultDisplay !== false:
            // IDEA: Make it possible for items to explicitly tell the room to not use the standard showItems().
            // This would allow more customizable description of the items - especially useful for the computer items which essentially represent actions.
            description: `<p>As the computer starts, you realize that your friend has no password. So careful with security in all other ways, yet leaving this detail.</p>
            <p>Just imagine what a burglar, casually walking into his unlocked apartment could do. Hehe...</p>
            <p>Go <b>east</b> to get back to the desk.</p>`
        }
    }

    /*
        templateRoom: {
            name: '',
            connections: {},
            items: [],
            title: '',
            description: `<p></p>`,
            state: {},
            playerCanLeave: () => true
        }
    */

    window.rooms = [
        start,
        ...Object.values(apartment)
    ]
})()
