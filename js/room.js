class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title

        function initializeItems (i) {
            // Default: all items are movable. Only those that explicitly say `false` can't be moved.
            if (i.movable !== false) i.movable = true
            // This initializer sets the standard shape of items,
            // to allow item configs to focus on what's interesting: custom data.
            if (!i.state) i.state = {}
            if (!i.actions) i.actions = {}
            return i
            // NOTE: If Item related logic is to be refactored to a separate class and file,
            // This mapper function should be part of the constructor - or maybe even similar to Room.initializeRooms().
        }

        this.items = (room.items || []).map(initializeItems)
        this.hiddenItems = (room.hiddenItems || []).map(initializeItems)
        this.visited = this.name === 'start' ? true : false
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state

        // Optional callbacks, used to limit how and when players are allowed to leave, or interact with objects.
        this.playerCanLeave = room.playerCanLeave
        this.playerCanInteract = room.playerCanInteract
    }

    static initializeRooms (game, roomConfigs) {
        // Create all rooms of the game.
        const rooms = {}
        for (const room of roomConfigs) {
            rooms[room.name] = new Room(room, game)
        }

        // Connect rooms to each other.
        for (const roomName of Object.keys(rooms)) {
            const room = rooms[roomName]

            // Replace each room name with a reference to the actual room.
            for (const direction of Object.keys(room.connections)) {
                const name = room.connections[direction]
                room.connections[direction] = rooms[name]
            }
        }
        return rooms
    }

    show () {
        this.game.title(this.title)
        // Use dynamic description if the room has one.
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
            this.items.some(item => {
                if (key === 'name') return Helpers.itemHasName(search[key])(item)
                return item[key] === search[key]
            })
        ))
    }

    removeItem (object, itemSource = 'items') {
        this[itemSource] = this[itemSource].filter(i => i.name.toLowerCase() !== object)
    }

    makeItemVisible (object) {
        const item = this.hiddenItems.find(i => i.name === object)
        if (item && !this.items.includes(item)) {
            this.items.push(item)
            this.removeItem(object, 'hiddenItems')

            // Use the regular `show()` here instead of `showItems()`
            // since some items are shown only in the room description.
            this.show()
        }
    }

    hideItem (object) {
        const item = this.items.find(i => i.name === object)
        if (item && !this.hiddenItems.includes(item)) {
            this.hiddenItems.push(item)
            this.removeItem(object)

            // Use the regular `show()` here instead of `showItems()`
            // since some items are shown only in the room description.
            this.show()
        }
    }
}
