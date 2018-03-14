class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title
        this.items = (room.items || []).map(i => {
            // Default: all items are movable. Only those that explicitly say `false` can't be moved.
            if (i.movable === undefined) i.movable = true
            return i
        })
        this.visited = !!room.visited
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state
        this.playerCanLeave = room.playerCanLeave
    }

    show () {
        this.game.title(this.title)
        this.game.text(this.description)
        this.showItems()
    }

    showItems () {
        // NOTE: Maaaaaaybe fix the correct form of "a/an". Maybe not!
        // Also think about singular/plural.
        let itemText = ''

        if (this.items.length) {
            itemText += 'There is '

            if (this.items.length === 1) {
                itemText += `a ${this.items[0].name} here.`
            } else {
                itemText = this.items.reduce((items, item, i) => {
                    if (i === 0) {
                        items += `a ${item.name}`
                    } else if (i < this.items.length - 1) {
                        items += `, a ${item.name}`
                    } else {
                        items += ` and a ${item.name} here.`
                    }
                    return items
                }, itemText)
            }
        }
        this.game.itemText(itemText)
    }

    hasItem (object) {
        return this.items.some(i => i.name === object)
    }

    removeItem (object) {
        this.items = this.items.filter(i => i.name !== object)
    }
}
