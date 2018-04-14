class GameEvent {
    constructor (event, game) {
        this.title = event.title
        this.description = event.description
        this.id = event.id
        this.game = game

        // IDEA: Optional method - used to determine if this event should be activated.
        // This could be useful for backgrund events that modify the game state without showing the event to the user.
        // Called from some kind of general update() method, in Game or in Player.
        // this.shouldTrigger = event.shouldTrigger

        // Optional methods - used to update game state when the event starts or ends.
        this.onStart = event.onStart
        this.onEnd = event.onEnd

        // Flag used to determine if the event has been shown to the player.
        this.shown = false
    }

    static initializeEvents (game, eventConfigs) {
        const events = {}
        for (const e of eventConfigs) {
            events[e.id] = new GameEvent(e, game)
        }
        return events
    }

    start () {
        this.game.activeEvent = this
        if (typeof this.onStart === 'function') this.onStart(this)
    }

    show () {
        this.game.title(this.title)
        this.game.text(this.description)
        this.shown = true
        this.game.useContinuePlaceholder()
    }

    end () {
        this.game.activeEvent = null
        this.game.returnToGame()
        if (typeof this.onEnd === 'function') this.onEnd(this)
        this.game.player.updateUI()
    }
}
