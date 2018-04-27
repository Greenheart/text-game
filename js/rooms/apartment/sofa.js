window.rooms.push({
    title: 'The Sofa',
    id: 'apartment.livingRoom.sofa',
    connections: {
        'south': 'apartment.livingRoom'
    },
    description: `<p>All the devices and consoles of different shapes and colors tell about his technology interest.
    Some are even partially disassembeled, or have custom hardware modifications. You also notice that one of the newest media devices is connected to the TV. That couldn't have been cheap.<p>
    <p>Sitting in the comfortable sofa, you wonder when Kevin will come home. It's starting to get late. Maybe you can do something while waiting.</p>
    <p>The center of the living room is to your <b>south</b></p>`,
    items: [{
        name: 'photo frame',
        id: 'photo-frame',
        actions: {
            view (room, item) {
                room.game.title('The Photo Frame')
                room.game.text(`
                    <p>You remember this photo. It's from one of your and Kevin's adventures a couple of years ago.</p>
                    <p><i>Ah... The feeling of exploring new places, of being so small compared to the vast nature.</i></p>
                    <p><i>Sure, your work takes a lot of time these days. But why aren't we doing these things anymore? Seriously Kevin, what have you gotten yourself into?</i></p>
                `)
            }
        }

        // IDEA: make it possible to inspect the devices and consoles - amongh them, there are some interesting papers/notes
            // The papers reveal that some consoles was gifts from the company.
            // - "Weird. Why would a company give so many gifts to a single employee?"
            // These details add to the general idea that the friend got "unbelievable perks" to help him stay motivated (in the though testing he worked with).
    }, {
        name: 'TV',
        id: 'tv',
        actions: {
            watch (room, item) {
                room.game.player.moveTo({ roomId: 'apartment.livingRoom.tv', showRoom: false })
            },
            use (room, item) {
                item.actions.watch(room, item)
            },
            view (room, item) {
                item.actions.watch(room, item)
            },
        },
        movable: false,
        skipDefaultAction: ['watch', 'use', 'view']
    }]
})
