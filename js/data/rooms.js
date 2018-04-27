window.rooms = []

/*
    Rooms structure:
        - A folder for each environment, containing one file for every room.
        - Rooms store all their related data (state, items) in a single file, making it easy to get an overview.
*/

const itemTemplate = {
    name: '',
    id: '',
    movable: true,      // Can the item be picked up? Default: true
    actions: {},        // Object with all actions that this item can be used for.
                        // Key: name of the action. Value: Callback function.
                        // Define custom logic here. See examples in other items.
    state: {}           // Object with custom data related to the item.
}
