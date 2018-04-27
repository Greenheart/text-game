class Room {
    constructor (room, game) {
        this.game = game
        this.id = room.id
        this.title = room.title
        this.visited = false

        // Items that can be found in the room. Contains both movable items that can be picked up as well as immobile objects.
        this.items = (room.items || []).map(item => new Item(game, item))

        // Hidden items aren't visible from the start, but can be shown later.
        // Useful for rooms that need some interaction before showing all content.
        this.hiddenItems = (room.hiddenItems || []).map(item => new Item(game, item))

        // Initially, connections are just a map of directions and corresponding room ids.
        // Keys: `direction`, Values: `room.id`
        // When the game is started, the room ids are replaced with references to the actual rooms.
        this.connections = room.connections || {}

        // A description of the room to show the player, formatted as HTML.
        // Either as a static string, or as a function that can change the room description based on some game state.
        this.description = room.description

        // Room state holds custom variables used to track how the item is used. Useful to for example allow dynamic descriptions.
        this.state = room.state || {}

        // Below are some optional callbacks, automatically bound to this room instance.
        // This will automatically provide the required room parameter when they are called,
        // making it easier for content creators to use them.

        // Executed when a player tries to leave the room in a given direction.
        // Should either return `true` or a string describing the reason the player can't leave.
        if (room.playerCanLeave) this.playerCanLeave = room.playerCanLeave.bind(null, this)

        // Executed when a player tries to interact with an item in the room.
        // Should either return `true` or a string describing the reason the player can't interact.
        if (room.playerCanInteract) this.playerCanInteract = room.playerCanInteract.bind(null, this)

        // Executed when the player enters a room. Useful to trigger game events.
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

            // Replace each room id with a reference to the actual room.
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
