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

    const game = new Game(window.rooms, dictionary)
})
