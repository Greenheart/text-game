class Item {
    constructor (game, itemConfig) {
        this.game = game
        this.id = itemConfig.id
        this.name = itemConfig.name

        // Item state is custom variables used to track how the item is used. Useful to for example allow dynamic descriptions.
        this.state = itemConfig.state || {}

        // Actions are callback functions with custom logic for when the player uses a certain interaction.
        // For example the 'use' action has a 'use()' callback.
        this.actions = itemConfig.actions || {}

        // Default: all items are movable. Only those that explicitly say `false` can't be moved.
        this.movable = itemConfig.movable !== false

        // Adding a room name to this array indicates that the item is shown to the player in another way.
        // For example, this could mean the item is shown in the description in the room, instead of the normal item text.
        this.useCustomDescription = itemConfig.useCustomDescription || []

        // Actions (like 'use', 'read') added to this array disable default interactions for that action.
        // This allows items to take full control over what happens, and most importantly,
        // allows the same action e.g. 'view' to behave differently for different items.
        this.skipDefaultAction = itemConfig.skipDefaultAction || []
    }
}
