class Item {
    constructor (game, itemConfig) {
        this.game = game
        this.id = itemConfig.id
        this.name = itemConfig.name

        // Item state holds custom variables used to track how the item is used.
        // Useful to for example allow dynamic descriptions or change the behavior of the item.
        this.state = itemConfig.state || {}

        // Object with callback functions for all actions this item can be used for.
        // Key: name of the action. Value: Callback function.
        // For example the 'use' action has a 'use()' callback.
        // Callbacks hold custom logic for how player interactions work.
        this.actions = itemConfig.actions || {}

        // Can the item be picked up? Default: true. Only those that explicitly say `false` can't be moved.
        this.movable = itemConfig.movable !== false

        // Adding a room name to this array indicates that the item is shown to the player in another way.
        // For example, this could mean the item is shown in the description in the room, instead of the normal item text.
        this.useCustomDescription = itemConfig.useCustomDescription || []

        // Actions (like 'use', 'read') added to this array disable default interactions for that action.
        // This allows item action callbacks to take full control over what happens, and most importantly,
        // allows the same action e.g. 'view' to behave differently for different items.
        this.skipDefaultAction = itemConfig.skipDefaultAction || []
    }
}
