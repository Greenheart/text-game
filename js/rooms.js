window.rooms = []

/*
    Rooms structure:
        - A folder for each environment, containing a file for every room.
        - Rooms and all their related data (state, items) is stored in one place.
*/


const templateRoom = {
    name: '',                                   // Internal name
    connections: {},                            // Connections to other rooms. Key: `direction`, Value: `room.name`
    items: [],                                  // Array of item objects
    title: '',
    description: `<p></p>`,                     // Text to show in the room.
                                                // Can be both string (static) or callback function (dynamic)
                                                // Function approach is useful for changing text based on state.
    state: {},                                  // Object with custom data related to the room.
    playerCanLeave: (room, direction) => true   // Callback function to determine if the player
}

const itemTemplate = {
    name: '',
    id: '',
    movable: true,      // Can the item be picked up? Default: true
    actions: {},        // Object with all actions that this item can be used for.
                        // Key: name of the action. Value: Callback function.
                        // Define custom logic here. See examples in other items.
    state: {}           // Object with custom data related to the item.
}