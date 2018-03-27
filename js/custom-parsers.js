// Custom parsers allow different sections of the game to use different forms of user input.
// Separating these custom parsing rules from the main parser increase both
// flexibility and modularity of the codebase.
const CustomParsers = {
    notes (game, rawInput) {
        const input = rawInput.trimLeft().trimRight().toLowerCase()
        game.status('')

        if (input === '') {
            if (game.visibleSection === game.ui.gameContent) {
                Helpers.hide(game.visibleSection)
                game.visibleSection = game.ui.noteCollection
                Helpers.show(game.visibleSection)
                game.title('Note Collection')
                game.setPlaceholder(`Enter a note number`)
            } else if (game.visibleSection === game.ui.noteCollection) {
                game.player.hideNotes()
            }
        } else {
            const note = game.player.notes.find(n => n.id === `note-${input}`)
            if (note) {
                Helpers.hide(game.visibleSection)
                game.visibleSection = game.ui.gameContent
                Helpers.show(game.visibleSection)
                game.player.readItem(note, true)
            } else {
                game.status(`You haven't found that note yet.`)
            }
            game.ui.userInput.value = ''
        }
    }
}
