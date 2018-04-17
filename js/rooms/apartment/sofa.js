window.rooms.push({
    title: 'In the sofa, in front of the TV',
    name: 'apartment.livingRoom.sofa',
    connections: {
        'south': 'apartment.livingRoom'
    },
    // TODO: Maybe change description based on if the player has found out that the friend isn't home.
    // Maybe only allow the player to visit the sofa if they have completed the task to find out their friend's whereabouts.
    // Then add additional description to the livingRoom (or wherever the player currently is)
        // "Maybe I could check relax in the sofa while I wait." This gives incitement to visit the sofa once it's unlocked.
    description: `<p>All the devices and consoles of different shapes and colors tell about his technology interest.
    Some are even partially disassembeled, or have custom hardware modifications.</p>
    <p>You notice that one of the newest media devices is connected to the TV. That couldn't have been cheap.<p>
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
})
