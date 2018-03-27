// Custom parsers allow different sections of the game to use different forms of user input.
// Separating these custom parsing rules from the main parser increase both
// flexibility and modularity of the codebase.
const CustomParsers = {
    notes (game, rawInput) {
        const input = Helpers.normalizeString(rawInput)
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
            // Try to show the requested note.
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
    },
    help (game, rawInput) {
        const input = Helpers.normalizeString(rawInput)

        // TODO: Remove old help menu logic from other parts of the codebase.
        if (input === '') {
            game.hideHelp()
        } else {
            const visible = game.ui.helpPages.find(p => !p.classList.contains('hidden'))

            // Try to show the help requested help page.
            const requested = game.ui.helpPages.find(p => p.dataset.pageNumber === input)
            if (requested) {
                Helpers.hide(visible)
                Helpers.show(requested)
                const pageNumber = requested.dataset.pageNumber
                game.title(`Help (Page ${pageNumber}/${game.ui.helpPages.length})`)
            } else {
                // Maybe show "That's not a help page"
                // Or just keep showing the instruction- status message.
            }

            game.ui.userInput.value = ''
        }
    }
}
