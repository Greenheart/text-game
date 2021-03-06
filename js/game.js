class Game {
    constructor (rooms, dictionary, tasks, events, cutscenes) {
        this.dictionary = dictionary
        this.ui = Game.getDOMReferences()
        this.bindUI()

        this.events = GameEvent.initializeEvents(this, events)
        this.cutscenes = Cutscene.initializeCutscenes(this, cutscenes)
        this.tasks = Task.initializeTasks(this, tasks)
        this.rooms = Room.initializeRooms(this, rooms)
        this.player = new Player(this)
        this.visibleSection = this.ui.mainMenu
        this.gameStarted = false
        this.activeEvent = null
        this.activeCutscene = null

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
        this.player.currentRoom.visited = true
        this.useNormalPlaceholder()
        document.querySelector('.main-footer').classList.remove('center')
        this.showSection(this.ui.gameContent)
        Helpers.show(this.ui.minimap)
        this.player.updateMinimap()
        this.player.currentRoom.show()
    }

    triggerEvent (id) {
        // Start a `GameEvent`.
        this.events[id].start()
    }

    showCutscene (id) {
        this.cutscenes[id].start()
    }

    showNotification (content, seconds = 10) {
        const notification = document.createElement('div')
        notification.innerHTML = content
        this.ui.notifications.appendChild(notification)

        window.setTimeout(() => {
            this.ui.notifications.removeChild(notification)
        }, seconds * 1000)
    }

    onInput (rawInput) {
        // IDEA: This method could be cleaned up by refactoring special cases below as `CustomParser`s.
        const input = Helpers.normalizeString(rawInput)
        if (this.player.activeItem === null) {
            // Default: Only allow new actions to be taken when no item is active.
            if (this.gameStarted) this.status('')
            this.handleInput(input)
        } else if (this.player.lastAction === 'inspect' && !input.startsWith('inspect')) {
            // Allow player to interact with the currently inspected item.
            if (input.endsWith(this.player.activeItem.name.toLowerCase())) {
                // By using `returnToGame()`, we close the `inspect` view before executing the next action.
                this.returnToGame()
                this.handleInput(input)
            }
        } else if (['read', 'take'].includes(this.player.lastAction) && this.player.activeItem.id.startsWith('note')) {
            // Allow players to go directly to the notes view when a new note has been found.
            if (input.match(/read\s+notes/)) {
                this.returnToGame()
                this.handleInput(input)
            }
        }
    }

    handleInput (input) {
        this.parseCommand(input)
        this.updateCommandHistory(input)
    }

    parseCommand (input) {
        const split = input.split(/\s+/)

        if (this.isSpecialCommand(input)) {
            // Special commands include `help`
            this.specialCommand(input)
        } else if (this.gameStarted) {
            if (this.isDirection(input)) {
                this.player.moveInDirection(input)
            } else if (this.isDirectionAlias(input)) {
                this.player.moveInDirection(this.dictionary.directionAliases[input])
            } else if (split.length && this.isAction(split[0])) {
                // This case represents a valid action
                // NOTE: This will not work with multiple-word actions (because of `split[0]`)
                this.player.parseAction(input, split)
            } else if (this.player.currentRoom.hasItem({ name: input })) {
                // If no valid action was given, but a valid item: Ask how the player want to interact.
                this.status(`What do you want to do with <span class="code dark-bg">${input}</span>?`)
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
        this.status('To learn about available actions, type <span class="code dark-bg">help</span> at any time.')
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
            this.status('')
        } else {
            this.title('')
            this.showMainMenu()
        }

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
        // Autocomplete answers to cutscene questions.
        if (this.activeCutscene && this.activeCutscene.activeQuestion) {
            return Object.keys(this.activeCutscene.activeQuestion.answers)
        }

        if (split.length === 1) {
            // First part of a command => autocomplete against actions
            return this.dictionary.allCommands
        }
        // Evetything else: Second part of a command => autocomplete against objects
        const noItemMatch = !(
            this.player.inventory.some(i => i.name.toLowerCase().startsWith(split[1])) ||
            this.player.currentRoom.items.some(i => i.name.toLowerCase().startsWith(split[1]))
        )

        // NOTE: This might not work well for actions that need multiple words
        // The problem would arise because of hard coded indices (split[0]).
        // A possible solution could be to improve how `action` is determined.
        const action = split[0]

        if (action === 'read' && noItemMatch) {
            // Match against keywords such as `notes`. These are used for special interactions.
            return [ ...this.dictionary.keywords ]
        } else {
            const getName = i => i.name.toLowerCase()
            return [
                ...this.player.inventory.map(getName),
                ...this.player.currentRoom.items.map(getName)
            ]
        }
    }

    setUsername (rawInput) {
        if (rawInput.length) {
            this.player.name = rawInput.trimLeft().trimRight()
            this.status('')
            this.showMainMenu()

            // First time main menu is shown, replace some of it's content.
            Helpers.show(this.ui.mainMenu.querySelector('.content'))
            Helpers.hide(this.ui.mainMenu.querySelector('.tagline'))
        }
    }

    handleEnterKey (event) {
        // Custom parsers allow greater creative freedom and increase game modularity.
        // This allows new types of user input that are not possible with the general parser.

        // The edge cases below could probably be implemented using customParsers to move logic out of the game class.
        if (typeof this.customParser === 'function') {
            this.customParser(this, event.target.value)
        } else if (this.player.name === '') {
            this.setUsername(event.target.value)
            event.target.value = ''
        } else if (this.activeEvent !== null) {
            if (event.target.value === '') {
                if (!this.activeEvent.shown) {
                    this.activeEvent.show()
                } else {
                    this.activeEvent.end()
                }
            }
            event.target.value = ''
        } else if (this.activeCutscene !== null) {
            const scene = this.activeCutscene
            const input = Helpers.normalizeString(event.target.value)
            if (scene.activeQuestion) {
                const answer = scene.activeQuestion.validAnswers.find(a => a.startsWith(input))
                if (event.target.value.length && answer) scene.answerQuestion(answer)
            } else if (input === '') {
                scene.nextScene()
            }
            event.target.value = ''
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

            // Don't focus when CTRL is pressed to allow common browser keyboard shortcuts like copy.
            if (!event.ctrlKey && (document.activeElement !== this.ui.userInput || enterOrTabPressed)) {
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
            if (event.key === 'Enter') enterKeyIsDown = false
        })
        this.ui.userInput.focus()
    }

    static getDOMReferences () {
        const find = document.querySelector.bind(document)
        const findAll = document.querySelectorAll.bind(document)
        const leftSidebar = find('aside.left')
        const minimap = find('#minimap')
        return {
            userInput: find('#user-input'),
            gameContent: find('.game-content'),
            gameText: find('#game-text'),
            itemText: find('#item-text'),
            statusText: find('#status-text'),
            titleText: find('#title-text'),
            help: find('#help'),
            mainMenu: find('#main-menu'),
            noteCollection: find('#note-collection'),
            helpPages: Array.from(findAll('#help > section')),
            mainContainer: find('main > .container'),
            leftSidebar,
            sidebarTop: leftSidebar.querySelector('.top'),
            tasks: find('#tasks'),
            sidebarBottom: leftSidebar.querySelector('.bottom'),
            inventory: find('#inventory'),
            noteCount: find('#note-count'),
            minimap,
            mapBorder: minimap.querySelector('.map'),
            minimapDirections: minimap.querySelectorAll('.direction'),
            mapCurrentEnvironment: minimap.querySelector('.current-environment'),
            mapCurrentRoom: minimap.querySelector('.current-room'),
            notifications: find('#notifications')
        }
    }
}
