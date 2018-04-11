// Custom parsers allow different sections of the game to use different forms of user input.
// Separating these custom parsing rules from the main parser increase both
// flexibility and modularity of the codebase.
const CustomParsers = {
    notes (game, rawInput) {
        const input = Helpers.normalizeString(rawInput)
        game.status('')

        if (input === '') {
            if (game.isVisible(game.ui.gameContent)) {
                game.showSection(game.ui.noteCollection)
                game.title('Note Collection')
                game.status('Enter a note number...')
                game.setPlaceholder('... or press enter to get back')
            } else if (game.isVisible(game.ui.noteCollection)) {
                game.player.hideNotes()
            }
        } else {
            // Try to show the requested note.
            const note = game.player.notes.find(n => n.id === `note-${input}`)
            if (note) {
                game.showSection(game.ui.gameContent)
                game.player.readNote(note, true)
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
    },
    computer (game, rawInput) {
        // IDEA: The computer might be better suited to implement using a room
        // It's really just the entrypoint "use computer" instead of "go direction" or just "direction"
        // that needs to be changed.
        // By using a room, we'll get a lot of logic for free.

        const input = Helpers.normalizeString(rawInput)
        const computer = game.player.currentRoom.items.find(i => i.id === 'computer')
        const view = computer.state.view

        if (input === '') {
            if (view === 'browser') {
                computer.state.view = 'main'
                game.title('The Computer')
                game.text(`<p>As the computer starts, you realize that Kevin has no password. So careful with security in every way, yet leaving this detail unchecked.</p>
                <p><i>Just imagine what a burglar, casually walking into his unlocked apartment could do...</i></p>`)
                game.itemText(`There is a <i>browser</i> here.`)
            } else if (view === 'main') {
                game.player.activeItem = null
                game.player.currentRoom.show()
                game.status('')
                game.customParser = null
            }
        } else {
            if (computer.state.view === 'main' && input.match(/use\s+browser/)) {
                computer.state.view = 'browser'
                game.title('The Web Browser')
                game.text('Nice browser!')
                game.itemText('')
            }
            game.ui.userInput.value = ''
        }
    }
}
