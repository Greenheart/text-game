document.addEventListener('DOMContentLoaded', event => {
    const game = new Game(rooms)
})

const dictionary = {
    special: [
        'help'
    ],
    actions: [
        'take',
        'drop',
        'destroy',
        'read'
    ],
    directions: [
        'north',
        'south',
        'east',
        'west'
    ]
}
