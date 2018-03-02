class Game {
    constructor (rooms) {
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
        this.visibleSection = this.ui.welcome
    }

    start () {
        this.ui.userInput.placeholder = 'What do you want to do?'
        Helpers.hide(this.ui.welcome)
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
            this.parseCommand(input)

        // Special commands for in game menus.
        } else if (!this.player.name && this.visibleSection === this.ui.welcome) {
            if (this.isCommand(input)) {
                this.status(`You can't use a command as your username.`)
            } else {
                this.setPlayerName(rawInput)
            }
        } else if (input === 'help') {
            this.visibleSection = this.ui.help
            Helpers.hide(this.ui.welcome)
            this.help()
        } else {
            console.warn(`Unable to understand command: ${input}`)
        }
    }

    parseCommand (input) {
        const split = input.split(' ')

        if (dictionary.directions.includes(input)) {
            this.player.move(input)
        } else if (split.length && dictionary.actions.includes(split[0])) {
            this.performAction(input, split)
        } else if (dictionary.special.includes(input)) {
            this.specialCommand(input)
        } else {
            this.status(`I didn't understand that.`)
        }
    }

    isCommand (input) {
        return (
            dictionary.directions.includes(input) ||
            dictionary.actions.includes(input) ||
            dictionary.special.includes(input)
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
            this.visibleSection = this.player.name ? this.ui.gameText : this.ui.welcome
            Helpers.show(this.visibleSection)
            this.title('')
        }

        if (this.player.name) {
            if (this.player.activeItem) {
                this.player.activeItem = null
            }

            this.title(this.player.currentRoom.title)
            this.status('')
            this.useNormalPlaceholder()
            this.player.currentRoom.show()
        }
    }

    help () {
        this.visibleSection = this.ui.help
        this.title('Help')
        this.useContinuePlaceholder()
        Helpers.hide(this.ui.gameText)
        Helpers.show(this.ui.help)
    }

    useContinuePlaceholder () {
        this.ui.userInput.placeholder = 'Press enter to continue...'
    }

    useNormalPlaceholder () {
        this.ui.userInput.placeholder = 'What do you want to do?'
    }
    setPlayerName (input) {
        this.player.name = input
        // NOTE: self-XSS vulnerability right here.
        this.title(`Welcome, ${this.player.name}!`)
        this.start()
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
                    if (this.visibleSection === this.ui.help || this.player.activeItem !== null) {
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
            welcome: document.querySelector('#welcome'),
            inventory: document.querySelector('#inventory')
        }
    }
}
