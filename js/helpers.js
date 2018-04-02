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
    itemHasName (name) {
        // Use normalized name to allow uppercase letters.
        return item => item.name.toLowerCase() === name
    }
}
