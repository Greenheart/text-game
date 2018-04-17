const Helpers = {
    hide (element) {
        element.classList.add('hidden')
    },
    show (element) {
        element.classList.remove('hidden')
    },
    normalizeString (s) {
        return s.trimLeft().trimRight().toLowerCase()
    },
    keepUnique (value, i, array) {
        return i === array.lastIndexOf(value)
    },
    itemHasName (name) {
        // Use normalized name to allow uppercase letters.
        return item => item.name.toLowerCase() === name
    },
    getNoObjectMessage (action) {
        let displayText
        if (action === 'take') displayText = 'pick up'
        if (action === 'go') return `Where do you want to go? Usage: <span class="code dark-bg">go [direction]</span>.`

        return `What do you want to ${displayText ? displayText : action}? Usage: <span class="code dark-bg">${action} [object]</span>.`
    }
}
