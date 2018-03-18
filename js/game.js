class Game {
    constructor (rooms, dictionary) {
        this.dictionary = dictionary
        this.ui = Game.getDOMReferences()
        this.bindUI()

        // Create all rooms of the game.
        this.rooms = {}
        for (const room of rooms) {
            this.rooms[room.name] = new Room(room, this)
        }

        // Connect rooms to each other.
        for (const roomName of Object.keys(this.rooms)) {
            const room = this.rooms[roomName]

            // Replace each room name with a reference to the actual room.
            for (const direction of Object.keys(room.connections)) {
                const name = room.connections[direction]
                room.connections[direction] = this.rooms[name]
            }
        }
        this.player = new Player(this)
        this.visibleSection = null
        this.status('Enter your name')
        this.gameStarted = false

        // Store latest commands for quick re-use
        // Always keep empty string to allow users to effectively clear their input
        this.commandHistory = ['']
        this.currentCommand = 0

        // To allow greater creative freedom, different sections of the game can use custom parsing.
        // This allows new types of user input that are not possible with the general parser.
        this.customParser = null
    }

    start () {
        this.status('')
        this.gameStarted = true
        this.useNormalPlaceholder()
        document.querySelector('footer').classList.remove('center')
        Helpers.hide(this.ui.mainMenu)
        Helpers.show(this.ui.gameContent)
        this.visibleSection = this.ui.gameContent
        this.player.currentRoom.show()
    }

    onInput (rawInput) {
        this.status('')
        const input = rawInput.trimLeft().trimRight().toLowerCase()

        // Check that this.player.name is set instead of this.gameStarted === true
        // to allow parsing of special commands (like `help`) while in the main menu.
        if (this.player.name) {
            this.parseCommand(input)
            this.updateCommandHistory(input)
        } else {
            if (this.isCommand(input)) {
                this.status(`You can't use a command as your username.`)
            } else {
                this.player.name = rawInput.trimLeft().trimRight()
                this.showMainMenu(true)
            }
        }
    }

    parseCommand (input) {
        const split = input.split(/\s+/)

        if (this.gameStarted && this.visibleSection !== this.ui.help) {
            if (this.isDirection(input)) {
                this.player.move(input)
            } else if (this.isDirectionAlias(input)) {
                this.player.move(this.dictionary.directionAliases[input])
            } else if (split.length && this.isAction(split[0])) {
                // Was an valid action entered?
                // NOTE: This will not work with multiple-word actions (because of `split[0]`)
                this.performAction(input, split)
            } else if (this.isSpecialCommand(input)) {
                // Special commands include `help`
                this.specialCommand(input)
            } else {
                this.status(`I didn't understand that.`)
            }
        } else {
            if (this.isSpecialCommand(input)) {
                this.specialCommand(input)
            }
        }
    }

    isDirection (input) {
        return this.dictionary.directions.includes(input)
    }

    isDirectionAlias (input) {
        return Boolean(this.dictionary.directionAliases[input])
    }

    isAction (input) {
        // IDEA: By using `startsWith()` instead of a regular comparsion,
        // actions with multiple words should be handled as well.
        // return this.dictionary.actions.some(a => a.startsWith(input))
        return this.dictionary.actions.includes(input)
    }

    isSpecialCommand (input) {
        return this.dictionary.special.includes(input)
    }

    isCommand (input) {
        return (
            this.isDirection(input) ||
            this.isAction(input) ||
            this.isSpecialCommand(input) ||
            this.isDirectionAlias(input)
        )
    }

    performAction (input, split) {
        const action = split[0]
        this.player[action](input, split)
    }

    specialCommand (command) {
        this[command]()
    }

    done () {
        if (this.visibleSection === this.ui.help) {
            Helpers.hide(this.ui.help)
            this.title('')
            if (this.gameStarted) {
                this.visibleSection = this.ui.gameContent
                Helpers.show(this.visibleSection)
            } else {
                this.showMainMenu()
                document.querySelector('footer').classList.add('center')
            }
        }

        if (this.gameStarted) {
            if (this.player.activeItem) {
                this.player.activeItem = null
            }

            this.title(this.player.currentRoom.title)
            this.status('')
            this.useNormalPlaceholder()
            this.player.currentRoom.show()
        }
    }

    showMainMenu (replaceDefaultContent) {
        if (replaceDefaultContent) {
            Helpers.show(this.ui.mainMenu.querySelector('.content'))
            Helpers.hide(this.ui.mainMenu.querySelector('.creators'))
        }
        this.visibleSection = this.ui.mainMenu
        Helpers.show(this.visibleSection)
        this.setPlaceholder('Press enter to start the game')
    }

    help () {
        if (!this.gameStarted) {
            document.querySelector('footer').classList.remove('center')
        }
        Helpers.hide(this.visibleSection)
        this.visibleSection = this.ui.help
        this.title('Help')
        this.useContinuePlaceholder()
        Helpers.show(this.ui.help)
    }

    useContinuePlaceholder () {
        this.ui.userInput.placeholder = 'Press enter to continue...'
    }

    useNormalPlaceholder () {
        this.ui.userInput.placeholder = 'What do you want to do?'
    }

    setPlaceholder (text) {
        this.ui.userInput.placeholder = text
    }

    // Show main game text. Used for story and main gameplay.
    text (text) {
        this.ui.gameText.innerHTML = text
    }

    addText (text) {
        this.ui.gameText.innerHTML += text
    }

    itemText (text) {
        this.ui.itemText.innerHTML = text
    }

    // Show a title at the top of the page.
    title (text) {
        this.ui.titleText.innerHTML = text
    }

    // Show status messages. For example reactions to invalid commands.
    status (text) {
        this.ui.statusText.innerHTML = text
    }

    scrollCommandHistory (direction) {
        if (direction === 'up' && this.currentCommand + 1 < this.commandHistory.length) {
            this.currentCommand++
        }

        if (direction === 'down' && this.currentCommand > 0) {
            this.currentCommand--
        }

        this.ui.userInput.value = this.commandHistory[this.currentCommand]
    }

    updateCommandHistory (input) {
        // Add command to history, but let the first entry remain `''`.
        // This allows the user to always go back to a blank state.
        this.commandHistory.splice(1, 0, input)

        // Only store the most recent commands.
        if (this.commandHistory.length > 32) this.commandHistory.pop()
        this.currentCommand = 0
    }

    autocomplete (input) {
        const split = input.split(/\s+/)
        const lastPart = split[split.length - 1]
        const completions = this.getCommandCompletions(split)

        let match = completions.find(c => c.startsWith(lastPart))
        if (match) {
            // Add extra space after the completion if it's a command that need more input.
            // The space doesn't make sense for other completions.
            if (match !== 'help' && !this.dictionary.directions.includes(match) && completions === this.dictionary.allCommands) {
                match += ' '
            }
            split[split.length - 1] = match
            this.ui.userInput.value = split.join(' ')
        }
    }

    getCommandCompletions (split) {
        if (split.length === 1) {
            // First part of a command => autocomplete against actions
            return this.dictionary.allCommands
        }
        // Second part of a command => autocomplete against objects
        // NOTE: This might not work well for actions that need multiple words
        // The problem would arise because of hard coded indices.
        // A possible solution could be to replace `split[0]` with a variable `action`.

        if (split[0] === 'read' && !this.player.currentRoom.items.some(i => i.id.startsWith('note'))) {
            // Match against keywords such as `notes`. These are used for special interactions.
            return [ ...this.dictionary.keywords ]
        } else {
            const getName = i => i.name
            return [
                ...this.player.inventory.map(getName),
                ...this.player.currentRoom.items.map(getName)
            ]
        }
    }

    handleEnterKey (event) {
        // Custom parsers allow greater creative freedom and increase game modularity.
        // This allows new types of user input that are not possible with the general parser.
        if (typeof this.customParser === 'function') {
            this.customParser(this, event.target.value)
        } else {
            if (event.target.value === '') {
                // Press enter to get out of menus quickly.
                if (this.visibleSection === this.ui.mainMenu) {
                    this.start()
                } else if (this.player.activeItem !== null || this.visibleSection === this.ui.help) {
                    this.done()
                }
            } else {
                this.onInput(event.target.value)
                event.target.value = ''
            }
        }
    }

    bindUI () {
        let enterKeyIsDown = false

        window.addEventListener('keydown', event => {
            // Type anywhere on the page to type in the text input.
            const enterOrTabPressed = [13, 9].includes(event.keyCode)
            if (enterOrTabPressed) event.preventDefault()

            if (document.activeElement !== this.ui.userInput || enterOrTabPressed) {
                this.ui.userInput.focus()
            }
        })

        this.ui.userInput.addEventListener('keydown', event => {
            switch (event.key) {
                case 'Enter':
                    // Only allow enter to be pressed once at a time.
                    if (enterKeyIsDown) return
                    enterKeyIsDown = true
                    this.handleEnterKey(event)
                    break

                case 'Tab':
                    event.preventDefault()
                    if (event.target.value && this.visibleSection !== this.ui.help) {
                        this.autocomplete(event.target.value)
                    }
                    break

                case 'ArrowUp':
                    event.preventDefault()
                    this.scrollCommandHistory('up')
                    break

                case 'ArrowDown':
                    event.preventDefault()
                    this.scrollCommandHistory('down')
                    break
            }
        })

        this.ui.userInput.addEventListener('keyup', event => {
            if (event.keyCode === 13) enterKeyIsDown = false
        })
        this.ui.userInput.focus()
    }

    static getDOMReferences () {
        return {
            userInput: document.querySelector('#user-input'),
            gameContent: document.querySelector('.game-content'),
            gameText: document.querySelector('#game-text'),
            itemText: document.querySelector('#item-text'),
            statusText: document.querySelector('#status-text'),
            titleText: document.querySelector('#title-text'),
            help: document.querySelector('#help'),
            inventory: document.querySelector('#inventory'),
            mainMenu: document.querySelector('#main-menu'),
            noteCollection: document.querySelector('#note-collection')
        }
    }
}
