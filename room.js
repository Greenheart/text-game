class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title
        // IDEA: Maybe use an array to store items to increase easy of use?
        this.items = room.items
        this.visited = !!room.visited
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections
        this.description = room.description
    }

    show () {
        if (this.game.player.moves > 0) {
            this.game.title(this.title)
        }
        this.game.text(this.description + this.showItems())
    }

    showItems () {
        return this.items.map(i => `There is a ${i.name} here.`).join('\n')
    }

    hasItem (object) {
        return this.items.some(i => i.name === object)
    }

    removeItem (object) {
        this.items = this.items.filter(i => i.name !== object)
    }
}
