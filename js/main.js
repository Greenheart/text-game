document.addEventListener('DOMContentLoaded', event => {
    const dictionary = {
        special: [
            'help'
        ],
        actions: [
            'inspect',
            'take',
            'drop',
            'read',
            'use',
            'check',
            'go'
        ],
        directions: [
            'north',
            'south',
            'east',
            'west',
            'back'
        ],
        directionAliases: {
            'n': 'north',
            's': 'south',
            'e': 'east',
            'w': 'west',
            'b': 'back'
        },
        keywords: [
            'notes'
        ]
    }

    // Cache for use in autocomplete.
    dictionary.allCommands = [
        ...dictionary.actions,
        ...dictionary.directions,
        ...dictionary.special
    ]

    const game = new Game(window.rooms, dictionary, window.tasks)
    // TODO: Set DEBUG to false when a release version is ready.
    window.DEBUG = true

    if (window.DEBUG) {
        // Expose game instance to aid debugging.
        window._game = game

        // Override default start location to easily test specific rooms.
        game.player.currentRoom = game.rooms['apartment.livingRoom.desk']

        game.player.name = 'Playtester'
        game.player.giveNewTask('anyone-home')
        game.start()
    }
})
