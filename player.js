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
            // Room.playerCanLeave should return true if a player can leave, otherwise a string with the reason.
            const playerCanLeave = this.currentRoom.playerCanLeave ? this.currentRoom.playerCanLeave(this.currentRoom, direction) : true
            if (playerCanLeave === true) {
                this.currentRoom = this.currentRoom.connections[direction]
                ++this.moves
                this.currentRoom.show()
            } else {
                // Show the reason why player can't leave.
                this.game.status(playerCanLeave)
            }
        } else {
            this.game.status(`You can't go there.`)
        }
    }

    go (input, split) {
        // This command allows players who prefer to type `go [direction]` instead of just `[direction]`
        // The thought is to give players options, without breaking the gameplay.
        this.move(split[1])
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

            if (item.movable) {
                this.inventory.push(item)
                this.currentRoom.removeItem(object)
                this.game.status(`Picked up ${item.name}.`)

                if (item.actions) {
                    if (item.actions.read) {
                        this.readItem(item)
                    }
                }

                this.currentRoom.showItems()
            } else {
                this.game.status(`You can't take that.`)
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

    use (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to use?')
            return
        }

        const object = split[1]
        const item = this.inventory.find(item => item.name === object) || this.currentRoom.items.find(item => item.name === object)
        if (item) {
            if (item.actions.use) {
                this.useItem(item)
            } else {
                this.game.status(`The ${object} can't be used.`)
            }
        } else {
            this.game.status(`There is no ${object} to use.`)
        }
    }

    useItem (item) {
        item.actions.use(this.currentRoom, item)
    }

    check (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to check?')
            return
        }

        const object = split[1]
        const item = this.inventory.find(item => item.name === object) || this.currentRoom.items.find(item => item.name === object)
        if (item) {
            if (item.actions.check) {
                this.checkItem(item)
            } else {
                this.game.status(`The ${object} can't be checked.`)
            }
        } else {
            this.game.status(`There is no ${object} to check.`)
        }
    }

    checkItem (item) {
        item.actions.check(this.currentRoom)
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
