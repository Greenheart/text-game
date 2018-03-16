document.addEventListener('DOMContentLoaded', event => {
    const dictionary = {
        special: [
            'help'
        ],
        actions: [
            'take',
            'drop',
            'destroy',
            'read',
            'use',
            'check',
            'go'
        ],
        directions: [
            'north',
            'south',
            'east',
            'west'
        ],
        directionAliases: {
            'n': 'north',
            's': 'south',
            'e': 'east',
            'w': 'west'
        }
    }

    // Cache for use in autocomplete.
    dictionary.allCommands = [
        ...dictionary.actions,
        ...dictionary.directions,
        ...dictionary.special
    ]

    const game = new Game(window.rooms, dictionary)
})
