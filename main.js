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
            'check'
        ],
        directions: [
            'north',
            'south',
            'east',
            'west'
        ]
    }

    const game = new Game(window.rooms, dictionary)
})
