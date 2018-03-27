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
                game.status('Enter a note number...')
                game.setPlaceholder('... or press enter to get back')
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

        if (input === '') {
            game.hideHelp()
        } else {
            const visible = game.ui.helpPages.find(p => !p.classList.contains('hidden'))
            const isInRange = n => n > 0 && n <= game.ui.helpPages.length

            // Try to show the requested help page.
            let newPage = game.ui.helpPages.find(p => p.dataset.pageNumber === input)
            if (!newPage) {
                // If not found, input might be a command to see next or prev page.
                let newPageNumber
                const current = Number(visible.dataset.pageNumber)
                if ('next'.startsWith(input)) {
                    // This check supports multiple inputs: `n`, `next`.
                    newPageNumber = isInRange(current + 1) ? current + 1 : 1
                } else if ('previous'.startsWith(input)) {
                    // This check supports multiple inputs: `p`, `prev` and `previous`
                    newPageNumber = isInRange(current - 1) ? current - 1 : game.ui.helpPages.length
                }
                // For other inputs: Just keep showing how the help pages are used.

                newPage = game.ui.helpPages.find(p => Number(p.dataset.pageNumber) === newPageNumber)
            }

            if (newPage) {
                Helpers.hide(visible)
                Helpers.show(newPage)
                game.title(`Help (Page ${newPage.dataset.pageNumber}/${game.ui.helpPages.length})`)
            }
            game.ui.userInput.value = ''
        }
    }
}
