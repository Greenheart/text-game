class Player {
    constructor (game) {
        this.inventory = []
        this.notes = []
        this.game = game
        this.currentRoom = this.game.rooms['start']
        this.name = ''
        this.moves = 0
        this.activeItem = null
    }

    inspect (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to inspect? Usage: <span class="code dark-bg">inspect [object]</span>.')
            return
        }

        const object = this.getItemName(split)
        const item = this.inventory.find(item => item.name === object) || this.currentRoom.items.find(item => item.name === object)
        if (item) {
            // list all actions for the item.
            // allow player to press enter to get back to the room.
            // disable other actions - perhaps by setting this.activeItem to the item.
            this.game.title('Inspecting ' + item.name)
            this.game.text(`<p>Available actions:</p>
                <ul>
                    ${Object.keys(item.actions).map(action => `<li>${action}</li>`).join('')}
                </ul>
            `)
            this.game.status(`Usage: <span class="code dark-bg">command [object]</span>`)
            this.activeItem = item
            this.game.itemText('')
            this.game.useContinuePlaceholder()
        } else {
            this.game.status(`There's no ${object} to inspect.`)
        }
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
                this.currentRoom.visited = true
            } else {
                // Show the reason why player can't leave.
                this.game.status(playerCanLeave)
            }
        } else {
            this.game.status(`I can't go there.`)
        }
    }

    go (input, split) {
        // This command allows players who prefer to type `go [direction]` instead of just `[direction]`
        // The thought is to give players options, without breaking the gameplay.
        const direction = split[1]
        this.move(direction)
    }

    take (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to pick up? Usage: <span class="code dark-bg">take [object]</span>.')
            return
        }

        const object = this.getItemName(split)
        const objectIsInRoom = this.currentRoom.hasItem({ name: object })
        if (objectIsInRoom) {
            this.takeItem(
                this.currentRoom.items.find(i => i.name === object)
            )
        } else if (!objectIsInRoom && this.hasItem(object)) {
            this.game.status(`The ${object} is already in your inventory.`)
        } else {
            this.game.status(`There's no ${object} to pick up.`)
        }

        this.showInventory()
    }

    takeItem (item) {
        if (item && item.movable) {
            if (item.id.startsWith('note')) {
                this.addNote(item)
            } else {
                this.inventory.push(item)
                this.game.status(`Picked up ${item.name}.`)
            }
            this.currentRoom.removeItem(item.name)

            if (item.actions) {
                if (item.actions.read && !item.state.hasBeenRead) {
                    this.readItem(item)
                }
            }

            this.currentRoom.showItems()
        } else {
            this.game.status(`I can't pick that up.`)
        }
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
        } else if (object.startsWith('note')) {
            this.game.status(`Notes in your collection can't be dropped.`)
        } else {
            this.game.status(`You don't have any ${object} in your inventory.`)
        }

        this.showInventory()
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
                this.currentRoom.game.itemText('')
                item.actions.use(this.currentRoom, item)
            } else {
                this.game.status(`The ${object} can't be used.`)
            }
        } else {
            this.game.status(`There is no ${object} to use.`)
        }
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
                this.currentRoom.game.itemText('')
                item.actions.check(this.currentRoom)
            } else {
                this.game.status(`The ${object} can't be checked.`)
            }
        } else {
            this.game.status(`There is no ${object} to check.`)
        }
    }

    read (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to read? Usage: <span class="code dark-bg">read [object]</span>.')
            return
        }

        const object = this.getItemName(split)
        if (object === 'notes') {
            this.showNotes()
        } else {
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
    }

    readItem (item, returnToNoteCollection = false) {
        this.game.title(`Note #${item.id.split('-')[1]}`)
        const currentRoomHasNote = this.currentRoom.hasItem({ id: item.id }) && item.id.startsWith('note')
        if (currentRoomHasNote) this.takeItem(item)
        if (!item.state.hasBeenRead) item.state.hasBeenRead = true

        this.activeItem = item
        this.game.itemText('')
        item.actions.read(this.currentRoom, item)

        if (returnToNoteCollection) {
            // This occurs when a note was read from the collection
            this.game.status('Enter a note number...')
            this.game.setPlaceholder('... or press enter to see all notes')
        } else {
            // The note was read from a room.
            this.game.useContinuePlaceholder()
        }
    }

    addNote (note) {
        this.notes.push(note)
        const ascendingById = (a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1])
        this.notes.sort(ascendingById)
        this.game.status('You found a new note. Use <span class="code dark-bg">read notes</span> to see your collection.')
        this.showNoteCount()
    }

    showNoteCount () {
        this.game.ui.noteCount.querySelector('.count').innerText = this.notes.length
        Helpers.show(this.game.ui.leftSidebar)
        Helpers.show(this.game.ui.noteCount)
    }

    showNotes () {
        const noteList = this.notes.map(n => `Note #${n.id.split('-')[1]} - ${n.state.date}`)
                            .map(content => `<li>${content}</li>`)
                            .join('')

        this.game.title('Note Collection')
        this.game.setPlaceholder(`Enter a note number`)
        this.game.customParser = CustomParsers.notes

        Helpers.hide(this.game.visibleSection)
        this.game.visibleSection = this.game.ui.noteCollection
        this.game.ui.noteCollection.querySelector('ul').innerHTML = noteList
        Helpers.show(this.game.visibleSection)
    }

    hideNotes () {
        this.game.customParser = null
        Helpers.hide(this.game.visibleSection)
        this.game.visibleSection = this.game.ui.gameContent
        Helpers.show(this.game.visibleSection)
        this.game.useNormalPlaceholder()
        this.currentRoom.show()
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

    showInventory () {
        const hasItems = this.inventory.length
        if (hasItems) {
            const list = this.game.ui.inventory.querySelector('.items')
            let listContent = ''

            for (const item of this.inventory) {
                listContent += `<li>${item.name}</li>`
            }
            list.innerHTML = listContent
        }

        const action = hasItems ? 'show' : 'hide'
        Helpers[action](this.game.ui.inventory)

        if (this.game.ui.noteCount.classList.contains('hidden')) {
            // As long as the note count is hidden,
            // show and hide the whole sidebar along with the inventory.
            Helpers[action](this.game.ui.leftSidebar)
        }
    }
}
