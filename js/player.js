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

    parseAction (input, split) {
        const action = split[0]
        // Handle incomplete arguments, if only action is passed.
        if (split.length < 2) {
            this.game.status(Helpers.getNoObjectMessage(action))
            return
        }
        this.lastAction = action
        const args = {
            object: '',
            direction: '',
            action
        }

        if (action === 'go') {
            args.direction = split[1]
        } else {
            args.object = this.getItemName(split)
            const { item, itemSource } = this.findItem(args.object)
            args.item = item
            args.itemSource = itemSource

            if (!this.canInteract({ item, itemSource, action })) return
        }

        // Allow items to override the default behavior and only run their custom logic.
        const skipDefaultAction = args.item && args.item.skipDefaultAction.includes(action) && args.item.actions[action]
        if (skipDefaultAction) {
            args.item.actions[action](this.currentRoom, args.item)
        } else {
            this[action](args)
        }
    }

    findItem (object) {
        const sources = [{
            itemSource: 'room',
            items: this.currentRoom.items
        }, {
            itemSource: 'inventory',
            items: this.inventory
        }]

        for (const source of sources) {
            const item = source.items.find(Helpers.itemHasName(object))
            if (item) return { item, itemSource: source.itemSource }
        }
        return { item: null, itemSource: null }
    }

    canInteract ({ item, itemSource, action }) {
        let playerCanInteract = true
        if (item) {
            // Room.playerCanInteract() should return true if a player can interact with an object, otherwise a string with the reason.
            playerCanInteract = this.currentRoom.playerCanInteract ? this.currentRoom.playerCanInteract({ item, itemSource, action }) : true
            if (playerCanInteract !== true) {
                // Show the reason why player can't interact.
                this.game.status(playerCanInteract)
            }
        }

        // If no item, let the default error handling kick in.
        return playerCanInteract === true
    }

    inspect ({ object, item }) {
        if (item) {
            // List all actions related to the item.
            this.game.title('Inspecting ' + item.name)
            const actions = Object.keys(item.actions)
            // Include relevant action if the item is movable. But avoid duplicate action names.
            if (!actions.some(a => ['take', 'drop'].includes(a)) && item.movable) {
                actions.push(this.hasItem(item.name) ? 'drop' : 'take')
            }
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

    view ({ object, item, action }) {
        if (item) {
            if (item.actions[action]) {
                this.viewItem(item, action)
            } else {
                this.game.status(`I can't ${action} that.`)
            }
        } else {
            this.game.status(`There's no ${object} to ${action}.`)
        }
    }

    viewItem (item, action = 'view') {
        item.state.seenByPlayer = true
        this.activeItem = item
        this.game.itemText('')
        this.game.useContinuePlaceholder()

        // Let the item's callback handle what should happen.
        item.actions[action](this.currentRoom, item)
    }

    watch (args) {
        // Currently, this is just used as an alias for view.
        // Items that allow this interaction has to specify both actions though.
        this.view(args)
    }

    move ({ object, item, itemSource }) {
        // Prevent moving items in the inventory.
        if (this.hasItem(object)) {
            this.game.status(`I can only move things in the room.`)
            return
        }

        if (item && itemSource === 'room') {
            if (item.actions && item.actions.move) {
                // Let the item's callback handle what should happen.
                item.actions.move(this.currentRoom, item)
            } else {
                this.game.status(`I can't move that.`)
            }
        } else {
            this.game.status(`There's no ${object} to move.`)
        }
    }

    moveInDirection (direction) {
        // Move in chosen direction if there's a room there.
        if (this.currentRoom.connections[direction]) {
            // Room.playerCanLeave() should return true if a player can leave, otherwise a string with the reason.
            const playerCanLeave = this.currentRoom.playerCanLeave ? this.currentRoom.playerCanLeave(direction) : true
            if (playerCanLeave === true) {
                this.moveTo(this.currentRoom.connections[direction])
            } else {
                // Show the reason why player can't leave.
                this.game.status(playerCanLeave)
            }
        } else {
            this.game.status(`I can't go there.`)
        }
    }

    moveTo (room, showNewRoom = true) {
        this.currentRoom = room
        this.currentRoom.visited = true
        if (this.currentRoom.onEnter) this.currentRoom.onEnter()
        this.moves++

        if (showNewRoom) {
            this.currentRoom.show()
            this.game.status('')
            this.updateTasks()
            this.updateMinimap()
        }
    }

    go ({ direction }) {
        // This command allows players who prefer to type `go [direction]` instead of just `[direction]`
        // The thought is to give players options, without breaking the gameplay.
        this.moveInDirection(direction)
    }

    take ({ object, item, itemSource }) {
        if (item) {
            if (itemSource === 'room') {
                this.takeItem(item)
            } else if (itemSource === 'inventory') {
                this.game.status(`The ${object} is already in your inventory.`)
            } else {
                this.game.status(`There's no ${object} to pick up.`)
            }

            this.updateUI()
        }
    }

    takeItem (item) {
        if (item && item.movable) {
            if (item.id.startsWith('note')) {
                this.addNote(item)
            } else {
                this.inventory.push(item)
                this.game.status(`Picked up ${item.name}.`)
            }

            // Allow items to perfom some task when they are picked up.
            if (item.actions.take) item.actions.take(this.currentRoom, item)

            this.currentRoom.removeItem(item.name)

            if (item.actions.read && !item.state.seenByPlayer) {
                this.readItem(item)
            } else if (item.actions.view && !item.state.seenByPlayer) {
                this.viewItem(item)
            } else if (item.useCustomDescription.length) {
                this.currentRoom.show()
            } else if (!['view', 'read', 'watch'].some(action => item.actions[action])) {
                // Only show rooms when we're not reading or watching an object.
                this.currentRoom.showItems()
            }
        } else {
            this.game.status(`I can't pick that up.`)
        }
    }

    drop ({ object, item, itemSource }) {
        if (item && itemSource === 'inventory') {
            this.currentRoom.items.push(item)
            if (this.activeItem && this.activeItem.id === item.id) this.activeItem = null

            // Allow items to perfom some task when they are dropped.
            if (item.actions.drop) item.actions.drop(this.currentRoom, item)

            this.inventory = this.inventory.filter(i => i.name.toLowerCase() !== object)
            this.game.status(`${object} dropped.`)
        } else if (object.startsWith('note')) {
            this.game.status(`Notes in your collection can't be dropped.`)
        } else {
            this.game.status(`You don't have any ${object} in your inventory.`)
        }

        this.updateUI()
        this.currentRoom.show()
    }

    use ({ object, item }) {
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

    check ({ object, item }) {
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

    read ({ object, item }) {
        if (item) {
            if (item.actions.read) {
                this.readItem(item)
            } else {
                this.game.status(`The ${object} can't be read.`)
            }
        } else {
            // If no readable items present, and user meant to type `notes`, automatically show notes for them.
            if (object.startsWith('note')) {
                this.showNotes()
            } else {
                this.game.status(`There's no ${object} to read.`)
            }
        }
    }

    readItem (item) {
        item.state.seenByPlayer = true
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

    giveNewTask (taskId) {
        // Prevent duplicate tasks.
        if (!this.tasks.some(t => t.id === taskId)) {
            const task = this.game.tasks[taskId]
            task.active = true
            this.tasks.push(task)
            this.updateUI()
            this.game.status('<span class="green-highlight">New task recieved!<span>')
        }
    }

    hasCompletedTask (taskId) {
        const task = this.tasks.find(t => t.id === taskId)
        return task && task.completed
    }

    updateTasks () {
        for (const task of this.tasks.filter(t => t.active)) {
            if (window.DEBUG) {
                console.log(task.id + ':', task.isCompleted())
            }
            if (!task.completed && task.isCompleted()) {
                task.complete()
            }
        }
        this.showTasks()
    }

    showTasks () {
        // Show active tasks.
        const display = t => `
            <div class="task${t.completed ? ' completed' : ''}">
                <h3>${t.title}</h3>
                <p>${t.description}</p>
            </div>`
        const content = this.tasks.filter(t => t.active).map(display).join('<hr>')
        this.game.ui.tasks.querySelector('.task-list').innerHTML = content
    }

    updateMinimap () {
        this.game.ui.mapCurrentEnvironment.innerHTML = this.currentRoom.name.split('.')[0]
        this.game.ui.mapCurrentRoom.innerHTML = Helpers.removeTitlePrefix(this.currentRoom.title)

        // Highlight directions on minimap border
        for (const direction of this.game.ui.minimapDirections) {
            // if available: green + border width 2px
            // if direction player came from: orange + border width 2px
            // else: border-width 0px
            const hasConnection = Boolean(this.currentRoom.connections[direction.dataset.direction])
            const playerCanLeave = this.currentRoom.playerCanLeave ? this.currentRoom.playerCanLeave(direction) : true
            const directionIsOpen = hasConnection && playerCanLeave === true


            const border = directionIsOpen ? '2px solid green' : '0'
            // Use negative margin to prevent the changing border width from moving the map around.
            // Along with box-sizing: content-box, this ensures the element always take up the same space.
            const margin = directionIsOpen ? '-2px' : '0'
            this.game.ui.mapBorder.style['border' + direction.dataset.side] = border
            this.game.ui.mapBorder.style['margin' + direction.dataset.side] = margin
        }
    }

    updateUI () {
        // Always update content
        this.updateInventory()
        this.updateNoteCount()
        this.updateTasks()
        this.updateMinimap()

        // Determine which components that should be shown.
        const hasActiveTasks = Boolean(this.tasks.filter(t => t.active).length)
        const hasItems = Boolean(this.inventory.length)
        const hasNotes = Boolean(this.notes.length)

        const sections = [{
            element: this.game.ui.sidebarTop,
            condition: hasActiveTasks
        }, {
            element: this.game.ui.sidebarBottom,
            condition: hasItems || hasNotes
        }]

        const components = [{
            condition: hasActiveTasks,
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
