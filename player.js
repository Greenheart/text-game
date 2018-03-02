class Player {
    constructor (game) {
        this.inventory = []
        this.game = game
        this.currentRoom = this.game.rooms['start']
        this.name = ''
        this.moves = 0
        this.activeItem = null
    }

    move (direction) {
        // Move in chosen direction if there's a room there.
        if (this.currentRoom.connections[direction]) {
            this.currentRoom = this.currentRoom.connections[direction]
            ++this.moves
            this.currentRoom.show()
        } else {
            this.game.status(`You can't go there.`)
        }
    }

    take (input, split) {
        if (split.length < 2) {
            // TODO: possibly allow multiple inputs in the same action.
            // To allow infomration to be entered in multiple steps.
            this.game.status('What do you want to take up?')
            return
        }

        const object = split[1]
        const objectIsInRoom = this.currentRoom.hasItem(object)
        if (objectIsInRoom) {
            const item = this.currentRoom.items.find(i => i.name === object)
            this.inventory.push(item)
            this.currentRoom.removeItem(object)
            this.game.status(`Picked up ${item.name}.`)

            if (item.actions.read) {
                this.readItem(item)
            }
        } else if (!objectIsInRoom && this.hasItem(object)) {
            this.game.status(`The ${object} is already in your inventory.`)
        } else {
            this.game.status(`There's no ${object} to pick up.`)
        }

        this.displayInventory()
    }

    drop (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to drop?')
            return
        }

        const object = split[1]
        const item = this.inventory.find(item => item.name === object)
        if (item) {
            this.currentRoom.items.push(item)
            this.inventory = this.inventory.filter(item => item.name !== object)
            this.game.status(`${object} dropped.`)
        } else {
            this.game.status(`You don't have any ${object} to drop.`)
        }

        this.displayInventory()
        this.currentRoom.show()
    }

    read (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to read?')
            return
        }

        const object = split[1]
        const item = this.inventory.find(item => item.name === object) || this.currentRoom.items.find(item => item.name === object)
        if (item) {
            if (item.actions.read) {
                this.readItem(item)
            } else {
                this.game.status(`The ${object} can't be read.`)
            }
        } else {
            this.game.status(`There's no ${object} to read.`)
        }
    }

    readItem (item) {
        this.game.title(`A ${item.name}`)
        this.activeItem = item
        item.actions.read(this.currentRoom)
        this.game.useContinuePlaceholder()
    }

    hasItem (object) {
        return this.inventory.some(item => item.name === object)
    }

    displayInventory () {
        const hasItems = this.inventory.length

        if (hasItems) {
            const items = this.game.ui.inventory.querySelector('.items')
            items.innerHTML = ''

            for (const item of this.inventory) {
                const li = document.createElement('li')
                li.innerText = item.name

                items.appendChild(li)
            }
        }

        Helpers[hasItems ? 'show' : 'hide'](this.game.ui.inventory)
    }
}
