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
            this.game.status('What do you want to take up? Usage: <span class="code dark-bg">take [object]</span>.')
            return
        }

        const object = this.getItemName(split)
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
            this.game.status('What do you want to drop? Usage: <span class="code dark-bg">drop [object]</span>.')
            return
        }

        const object = this.getItemName(split)
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
            this.game.status('What do you want to use? Usage: <span class="code dark-bg">use [object]</span>.')
            return
        }

        const object = this.getItemName(split)
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
        this.currentRoom.game.itemText('')
        item.actions.use(this.currentRoom, item)
    }

    check (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to check? Usage: <span class="code dark-bg">check [object]</span>.')
            return
        }

        const object = this.getItemName(split)
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
        this.currentRoom.game.itemText('')
        item.actions.check(this.currentRoom)
    }

    read (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to read? Usage: <span class="code dark-bg">read [object]</span>.')
            return
        }

        const object = this.getItemName(split)
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
        this.game.itemText('')
        item.actions.read(this.currentRoom)
        this.game.useContinuePlaceholder()
    }

    getItemName (split) {
        // Allow objects to have multiple word names.
        // NOTE: This assumes that commands take the form `[verb] [object]`
        // and always use one word to describe the action.
        // If this becomes a problem,
        // the index where to start looking for the name could be a parameter.
        return split.slice(1).join(' ')
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
