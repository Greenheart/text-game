class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title
        this.items = (room.items || []).map(i => {
            // Default: all items are movable. Only those that explicitly say `false` can't be moved.
            if (i.movable !== false) i.movable = true
            return i
        })
        this.visited = this.name === 'start' ? true : false
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state
        this.playerCanLeave = room.playerCanLeave
    }

    show () {
        this.game.title(this.title)
        this.game.text(typeof this.description === 'function' ? this.description(this) : this.description)
        this.showItems()
    }

    showItems () {
        // NOTE: Maaaaaaybe fix the correct form of "a/an". Maybe not!
        // Also think about singular/plural.
        let itemText = ''

        if (this.items.length) {
            itemText += 'There is '

            if (this.items.length === 1) {
                itemText += `a <i>${this.items[0].name}</i> here.`
            } else {
                itemText = this.items.reduce((items, item, i) => {
                    const name = `<i>${item.name}</i>`
                    if (i === 0) {
                        items += `a ${name}`
                    } else if (i < this.items.length - 1) {
                        items += `, a ${name}`
                    } else {
                        items += ` and a ${name} here.`
                    }
                    return items
                }, itemText)
            }
        }
        this.game.itemText(itemText)
    }

    hasItem (search) {
        // Search: Object with { key: value } that we search for in an item.
        // NOTE: Only compares value types such as strings or numbers at this time.
        return Object.keys(search).some(key => (
            this.items.some(i => i[key] === search[key])
        ))
    }

    removeItem (object) {
        this.items = this.items.filter(i => i.name !== object)
    }
}