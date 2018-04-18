class Room {
    constructor (room, game) {
        this.game = game
        this.name = room.name
        this.title = room.title

        function initializeItems (i) {
            // NOTE: If Item related logic is to be refactored to a separate class and file,
            // This mapper function should be part of the constructor - or maybe even similar to Room.initializeRooms().

            // Default: all items are movable. Only those that explicitly say `false` can't be moved.
            if (i.movable !== false) i.movable = true
            // This initializer sets the standard shape of items,
            // to allow item configs to focus on what's interesting: custom data.
            if (!i.state) i.state = {}
            if (!i.actions) i.actions = {}

            // Adding a room name to this array indicates that the item is shown to the player in another way.
            // For example, this could mean the item is shown in the description in the room, instead of the normal item text.
            if (!i.useCustomDescription) i.useCustomDescription = []

            // Actions (like 'use', 'read') added to this array disable default interactions for that action.
            // This allows items to take full control over what happens, and most importantly,
            // allows the same action e.g. 'view' to behave differently for different items.
            if (!i.skipDefaultAction) i.skipDefaultAction = []
            return i
        }

        this.items = (room.items || []).map(initializeItems)
        this.hiddenItems = (room.hiddenItems || []).map(initializeItems)
        this.visited = this.name === 'start' ? true : false
        // Initially, connections are just a map of directions and corresponding room names.
        this.connections = room.connections || {}
        this.description = room.description
        this.state = room.state

        // Optional callbacks, used to limit how and when players are allowed to leave, or interact with objects.
        // Bind them to automatically provide required parameters when they are called.
        // This simplifies usage of these methods for content creators.
        if (room.playerCanLeave) this.playerCanLeave = room.playerCanLeave.bind(null, this)
        if (room.playerCanInteract) this.playerCanInteract = room.playerCanInteract.bind(null, this)
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
        // Filter out items that are shown in a custom way.
        const items = this.items.filter(i => {
            // Default case: Show items in their own section.
            if (i.useCustomDescription.length === 0) return true
            // Else, Show items in their own section - unless the current room is marked.
            return !i.useCustomDescription.includes(this.name)
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
