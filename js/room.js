class Room {
    constructor (room, game) {
        this.game = game
        this.id = room.id
        this.title = room.title
        this.items = (room.items || []).map(item => new Item(game, item))
        this.hiddenItems = (room.hiddenItems || []).map(item => new Item(game, item))

        this.visited = this.id === 'start'
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state || {}

        // Optional callbacks, automatically bound provide required parameters when they are called.
        // This simplifies usage of these methods for content creators.
        // When a player tries to leave the room.
        if (room.playerCanLeave) this.playerCanLeave = room.playerCanLeave.bind(null, this)
        // When a player tries to interact with an item in the room.
        if (room.playerCanInteract) this.playerCanInteract = room.playerCanInteract.bind(null, this)
        // When a player enters the room.
        if (room.onEnter) this.onEnter = room.onEnter.bind(null, this)
    }

    static initializeRooms (game, roomConfigs) {
        // Create all rooms of the game.
        const rooms = {}
        for (const room of roomConfigs) {
            rooms[room.id] = new Room(room, game)
        }

        // Connect rooms to each other.
        for (const roomId of Object.keys(rooms)) {
            const room = rooms[roomId]

            // Replace each room name with a reference to the actual room.
            for (const direction of Object.keys(room.connections)) {
                const id = room.connections[direction]
                room.connections[direction] = rooms[id]
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
        // Filter out items that are shown in a custom way.
        const items = this.items.filter(i => {
            // Default case: Show items in their own section.
            if (i.useCustomDescription.length === 0) return true
            // Else, Show items in their own section - unless the current room is marked.
            return !i.useCustomDescription.includes(this.id)
        })

        if (items.length) {
            itemText += 'There is '

            if (items.length === 1) {
                itemText += `a <i>${items[0].name}</i> here.`
            } else {
                itemText = items.reduce((text, item, i) => {
                    const name = `<i>${item.name}</i>`
                    if (i === 0) {
                        text += `a ${name}`
                    } else if (i < items.length - 1) {
                        text += `, a ${name}`
                    } else {
                        text += ` and a ${name} here.`
                    }
                    return text
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
