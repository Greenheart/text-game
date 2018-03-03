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

        // Connect rooms to eachother.
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
    }

    start () {
        this.gameStarted = true
        this.useNormalPlaceholder()
        Helpers.hide(this.ui.mainMenu)
        Helpers.show(this.ui.gameText)
        this.visibleSection = this.ui.gameText
        this.player.currentRoom.show()
    }

    onInput (rawInput) {
        if (this.visibleSection !== this.ui.help) {
            this.status('')
        }
        const input = rawInput.trimLeft().trimRight().toLowerCase()

        if (this.player.name) {
            if (input === 'help') {
                this.help()
            } else {
                this.parseCommand(input)
            }
        } else {
            if (this.isCommand(input)) {
                this.status(`You can't use a command as your username.`)
            } else {
                this.player.name = rawInput
                this.showMainMenu()
            }
        }
    }

    parseCommand (input) {
        const split = input.split(/\s+/)

        if (this.dictionary.directions.includes(input)) {
            this.player.move(input)
        } else if (split.length && this.dictionary.actions.includes(split[0])) {
            this.performAction(input, split)
        } else if (this.dictionary.special.includes(input)) {
            this.specialCommand(input)
        } else {
            this.status(`I didn't understand that.`)
        }
    }

    isCommand (input) {
        return (
            this.dictionary.directions.includes(input) ||
            this.dictionary.actions.includes(input) ||
            this.dictionary.special.includes(input)
        )
    }

    performAction (input, split) {
        const action = split[0]
        if (this.player[action]) {
            this.player[action](input, split)
        } else {
            this.status(`I didn't understand that.`)
        }
    }

    specialCommand (command) {
        this[command]()
    }

    done () {
        if (this.visibleSection === this.ui.help) {
            Helpers.hide(this.ui.help)
            this.title('')
            if (this.gameStarted) {
                this.visibleSection = this.ui.gameText
                Helpers.show(this.visibleSection)
            } else {
                this.showMainMenu()
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

    showMainMenu () {
        this.visibleSection = this.ui.mainMenu
        Helpers.show(this.visibleSection)
        this.useStartPlaceholder()
    }

    help () {
        Helpers.hide(this.visibleSection)
        this.visibleSection = this.ui.help
        this.title('Help')
        this.useContinuePlaceholder()
        Helpers.show(this.ui.help)
    }

    useContinuePlaceholder () {
        this.ui.userInput.placeholder = 'Press enter to continue...'
    }

    useStartPlaceholder () {
        this.ui.userInput.placeholder = 'Press enter to start the game'
    }

    useNormalPlaceholder () {
        this.ui.userInput.placeholder = 'What do you want to do?'
    }

    // Show main game text. Used for story and main gameplay.
    text (text) {
        this.ui.gameText.innerHTML = text
    }

    // Show a title at the top of the page.
    title (text) {
        this.ui.titleText.innerHTML = text
    }

    // Show status messages. For example reactions to invalid commands.
    status (text) {
        this.ui.statusText.innerHTML = text
    }

    bindUI () {
        this.ui.userInput.addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                // Press enter to get out of menus quickly.
                if (event.target.value === '') {
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
        })
        this.ui.userInput.focus()
    }

    static getDOMReferences () {
        return {
            userInput: document.querySelector('#user-input'),
            gameText: document.querySelector('#game-text'),
            statusText: document.querySelector('#status-text'),
            titleText: document.querySelector('#title-text'),
            help: document.querySelector('#help'),
            inventory: document.querySelector('#inventory'),
            mainMenu: document.querySelector('#main-menu')
        }
    }
}
