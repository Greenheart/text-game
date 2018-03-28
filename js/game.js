class Game {
    constructor (rooms, dictionary, tasks) {
        this.dictionary = dictionary
        this.tasks = tasks
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
        this.visibleSection = this.ui.mainMenu
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
        document.querySelector('.main-footer').classList.remove('center')
        this.showSection(this.ui.gameContent)
        this.player.currentRoom.show()
    }

    onInput (rawInput) {
        this.status('')
        const input = Helpers.normalizeString(rawInput)

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
                this.showMainMenu()

                // First time main menu is shown, replace some of it's content.
                Helpers.show(this.ui.mainMenu.querySelector('.content'))
                Helpers.hide(this.ui.mainMenu.querySelector('.creators'))
            }
        }
    }

    parseCommand (input) {
        const split = input.split(/\s+/)

        if (this.isSpecialCommand(input)) {
            // Special commands include `help`
            this.specialCommand(input)
        } else if (this.gameStarted) {
            if (this.isDirection(input)) {
                this.player.move(input)
            } else if (this.isDirectionAlias(input)) {
                this.player.move(this.dictionary.directionAliases[input])
            } else if (split.length && this.isAction(split[0])) {
                // Was an valid action entered?
                // NOTE: This will not work with multiple-word actions (because of `split[0]`)
                this.performAction(input, split)
            } else {
                this.status(`I didn't understand that.`)
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
        // Used for commands in this.dictionary.special
        this[command]()
    }

    returnToGame () {
        this.player.activeItem = null
        this.status('')
        this.useNormalPlaceholder()
        this.player.currentRoom.show()
    }

    showMainMenu () {
        this.showSection(this.ui.mainMenu)
        this.setPlaceholder('Press enter to start the game')
        document.querySelector('.main-footer').classList.add('center')
    }

    help () {
        this.customParser = CustomParsers.help
        this.status(`Enter a page number (E.g. <span class="code dark-bg">2</span>) or <span class="code dark-bg">n</span> for next page, <span class="code dark-bg">p</span> for previous`)
        this.setPlaceholder('... or press enter to get back')

        // Toggle classes to better use screen real estate.
        this.ui.mainContainer.classList.add('wide')
        document.querySelector('.main-footer').classList.remove('center')

        this.showSection(this.ui.help)

        // Set help title to show the page number of the current help page.
        const visible = this.ui.helpPages.find(p => !p.classList.contains('hidden'))
        this.title(`Help (Page ${visible.dataset.pageNumber}/${this.ui.helpPages.length})`)
    }

    hideHelp () {
        if (this.gameStarted) {
            this.showSection(this.ui.gameContent)
            this.useNormalPlaceholder()
            this.player.currentRoom.show()
        } else {
            this.title('')
            this.showMainMenu()
        }

        this.status('')
        this.ui.mainContainer.classList.remove('wide')
        this.customParser = null
    }

    showSection (gameSection) {
        // Replace currently visible section with another one.
        Helpers.hide(this.visibleSection)
        this.visibleSection = gameSection
        Helpers.show(this.visibleSection)
    }

    isVisible (gameSection) {
        return gameSection === this.visibleSection
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

    autocomplete (rawInput) {
        const split = Helpers.normalizeString(rawInput).split(/\s+/)
        const completions = this.getCommandCompletions(split)

        // Thanks to this ternary, this also handles multiple word objects or commands like `photo frame`.
        const search = split.length > 2 ? split.slice(1).join(' ') : split[split.length - 1]

        let match = completions.find(c => c.startsWith(search))
        if (match) {
            // Add extra space after the completion if it's a command that need more input.
            // The space doesn't make sense for other completions.
            if (match !== 'help' && !this.dictionary.directions.includes(match) && completions === this.dictionary.allCommands) {
                match += ' '
            }

            // Reformat the input differently depending on if the match is multiple words or not.
            this.ui.userInput.value = split.length > 1 ? `${split[0]} ${match}` : match
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
                // Press enter to get out of menus quickly. This behavior is also used in custom parsers.
                if (this.isVisible(this.ui.mainMenu)) {
                    this.start()
                } else if (this.player.activeItem !== null) {
                    this.returnToGame()
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
                    if (event.target.value && !this.isVisible(this.ui.help)) {
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
        const leftSidebar = document.querySelector('aside.left')
        return {
            userInput: document.querySelector('#user-input'),
            gameContent: document.querySelector('.game-content'),
            gameText: document.querySelector('#game-text'),
            itemText: document.querySelector('#item-text'),
            statusText: document.querySelector('#status-text'),
            titleText: document.querySelector('#title-text'),
            help: document.querySelector('#help'),
            mainMenu: document.querySelector('#main-menu'),
            noteCollection: document.querySelector('#note-collection'),
            helpPages: Array.from(document.querySelectorAll('#help > section')),
            mainContainer: document.querySelector('main > .container'),
            leftSidebar,
            sidebarTop: leftSidebar.querySelector('.top'),
            tasks: document.querySelector('#tasks'),
            sidebarBottom: leftSidebar.querySelector('.bottom'),
            inventory: document.querySelector('#inventory'),
            noteCount: document.querySelector('#note-count')
        }
    }
}
