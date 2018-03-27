const Helpers = {
    hide (element) {
        element.classList.add('hidden')
    },
    show (element) {
        element.classList.remove('hidden')
    },
    normalizeString (s) {
        return s.trimLeft().trimRight().toLowerCase()
    }
}
