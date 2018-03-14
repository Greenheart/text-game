class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title
        this.items = room.items || []
        this.visited = !!room.visited
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state
        this.playerCanLeave = room.playerCanLeave
    }

    show () {
        this.game.title(this.title)
        this.game.text(this.description + this.showItems())
    }

    showItems () {
        // NOTE: Maaaaaaybe fix the correct form of "a/an". Maybe not!
        // Also think about singular/plural.
        if (this.items.length) {
            if (this.items.length === 1) {
                return `There is a ${this.items[0].name} here.`
            }

            return this.items.reduce((items, item, i) => {
                if (i === 0) {
                    items += `a ${item.name}`
                } else if (i < this.items.length - 1) {
                    items += `, a ${item.name}`
                } else {
                    items += ` and a ${item.name} here.`
                }
                return items
            }, 'There is ')
        }

        return ''
    }

    hasItem (object) {
        return this.items.some(i => i.name === object)
    }

    removeItem (object) {
        this.items = this.items.filter(i => i.name !== object)
    }
}
