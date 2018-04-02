class Player {
    constructor (game) {
        this.inventory = []
        this.notes = []
        this.tasks = []
        this.game = game
        this.currentRoom = this.game.rooms['start']
        this.name = ''
        this.moves = 0
        this.activeItem = null
        this.lastAction = ''
    }

    inspect (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to inspect? Usage: <span class="code dark-bg">inspect [object]</span>.')
            return
        }

        const object = this.getItemName(split)
        const item = this.inventory.find(Helpers.itemHasName(object)) || this.currentRoom.items.find(Helpers.itemHasName(object))
        if (item) {
            // list all actions for the item.
            this.game.title('Inspecting ' + item.name)
            const actions = Object.keys(item.actions)
            // Include relevant action if the item is movable.
            if (item.movable) actions.push(this.hasItem(item.name) ? 'drop' : 'take')
            this.game.text(`<p>Available actions:</p>
                <ul>
                    ${actions.map(action => `<li><span class="code dark-bg">${action}</span></li>`).join('')}
                </ul>
            `)
            this.game.status(`Usage: <span class="code dark-bg">[action] [object]</span>`)
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
                this.currentRoom.items.find(Helpers.itemHasName(object))
            )
        } else if (!objectIsInRoom && this.hasItem(object)) {
            this.game.status(`The ${object} is already in your inventory.`)
        } else {
            this.game.status(`There's no ${object} to pick up.`)
        }

        this.updateUI()
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
        const item = this.inventory.find(Helpers.itemHasName(object))
        if (item) {
            this.currentRoom.items.push(item)
            if (this.activeItem && this.activeItem.id === item.id) this.activeItem = null
            this.inventory = this.inventory.filter(i => i.name.toLowerCase() === object)
            this.game.status(`${object} dropped.`)
        } else if (object.startsWith('note')) {
            this.game.status(`Notes in your collection can't be dropped.`)
        } else {
            this.game.status(`You don't have any ${object} in your inventory.`)
        }

        this.updateUI()
        this.currentRoom.show()
    }

    use (input, split) {
        if (split.length < 2) {
            this.game.status('What do you want to use? Usage: <span class="code dark-bg">use [object]</span>.')
            return
        }

        const object = this.getItemName(split)
        const item = this.inventory.find(Helpers.itemHasName(object)) || this.currentRoom.items.find(Helpers.itemHasName(object))
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
        const item = this.inventory.find(Helpers.itemHasName(object)) || this.currentRoom.items.find(Helpers.itemHasName(object))
        if (item) {
            if (item.actions.check) {
                this.currentRoom.game.itemText('')
                item.actions.check(this.currentRoom, item)
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
            const item = this.inventory.find(Helpers.itemHasName(object)) || this.currentRoom.items.find(Helpers.itemHasName(object))
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

    readItem (item) {
        if (!item.state.hasBeenRead) item.state.hasBeenRead = true
        this.activeItem = item
        this.game.itemText('')

        if (item.id.startsWith('note')) {
            this.readNote(item)
        } else {
            item.actions.read(this.currentRoom, item)
            this.game.useContinuePlaceholder()
        }
    }

    readNote (item, returnToNoteCollection = false) {
        this.game.title(`Note #${item.id.split('-')[1]}`)
        const currentRoomHasNote = this.currentRoom.hasItem({ id: item.id }) && item.id.startsWith('note')
        if (currentRoomHasNote) this.takeItem(item)
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

    giveNewTask (taskId) {
        if (!this.tasks.some(t => t.id === taskId)) {
            // Prevent duplicate tasks.
            const task = this.game.tasks.find(t => t.id === taskId)
            task.active = true
            this.tasks.push(task)
            this.updateUI()
        }
    }

    addNote (note) {
        this.notes.push(note)
        const ascendingById = (a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1])
        this.notes.sort(ascendingById)
        this.game.status('You found a new note. Use <span class="code dark-bg">read notes</span> to see your collection.')
        this.updateUI()
    }

    updateNoteCount () {
        this.game.ui.noteCount.querySelector('.count').innerText = this.notes.length
    }

    showNotes () {
        const noteList = this.notes.map(n => `Note #${n.id.split('-')[1]} - ${n.state.date}`)
                            .map(content => `<li>${content}</li>`)
                            .join('')

        this.game.title('Note Collection')
        this.game.status('Enter a note number...')
        this.game.setPlaceholder('... or press enter to get back')
        this.game.customParser = CustomParsers.notes
        this.game.ui.noteCollection.querySelector('ul').innerHTML = noteList
        this.game.showSection(this.game.ui.noteCollection)
    }

    hideNotes () {
        this.game.customParser = null
        this.game.showSection(this.game.ui.gameContent)
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
        return this.inventory.some(Helpers.itemHasName(object))
    }

    updateInventory () {
        // Show all items from your inventory.
        const display = i => `<li>${i.name}</li>`
        const content = this.inventory.map(display).join('')
        this.game.ui.inventory.querySelector('.items').innerHTML = content
    }

    updateTasks () {
        // Show active tasks.
        const display = t => `
            <div class="task">
                <h3>${t.title}</h3>
                <small>${t.description}</small>
            </div>`
        const content = this.tasks.filter(t => t.active).map(display).join('<hr>')
        this.game.ui.tasks.querySelector('.task-list').innerHTML = content
    }

    updateUI () {
        // Always update content
        this.updateInventory()
        this.updateNoteCount()
        this.updateTasks()

        // Determine which components that should be shown.
        const hasTasks = Boolean(this.tasks.length)
        const hasItems = Boolean(this.inventory.length)
        const hasNotes = Boolean(this.notes.length)

        const sections = [{
            element: this.game.ui.sidebarTop,
            condition: hasTasks
        }, {
            element: this.game.ui.sidebarBottom,
            condition: hasItems || hasNotes
        }]

        const components = [{
            condition: hasTasks,
            element: this.game.ui.tasks,
            section: 'top'
        }, {
            condition: hasItems,
            element: this.game.ui.inventory,
            section: 'bottom'
        }, {
            condition: hasNotes,
            element: this.game.ui.noteCount,
            section: 'bottom'
        }]

        // Toggle visibility of all sidebar components and sections
        for (const c of components) {
            const method = c.condition ? 'show' : 'hide'
            Helpers[method](c.element)
        }

        for (const s of sections) {
            const method = s.condition ? 'remove' : 'add'
            s.element.classList[method]('no-border')
        }
    }
}
