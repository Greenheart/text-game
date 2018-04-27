class Cutscene {
    constructor (cutscene, game) {
        this.game = game
        this.scenes = cutscene.scenes.map(scene => {
            if (scene.question) {
                scene.question.validAnswers = Object.keys(scene.question.answers)
            }
            return scene
        })
        this.id = cutscene.id
        this.currentScene = 0
        this.activeQuestion = null
    }

    start () {
        this.game.activeCutscene = this
        this.game.itemText('')
        this.nextScene()
    }

    nextScene () {
        const scene = this.scenes[this.currentScene]
        if (scene) {
            this.game.useContinuePlaceholder()
            this.game.text(scene.text)
            // Allow the title to updated for individual scenes. Keep previous if nothing new.
            if (scene.title) this.game.title(scene.title)
            if (this.activeQuestion) this.activeQuestion = null
            if (scene.question) this.showQuestion(scene.question)
            this.currentScene++
        } else {
            this.end()
        }
    }

    showQuestion (question) {
        this.activeQuestion = question
        this.game.addText(question.text)
        const answers = question.validAnswers.map(a => `<span class="code dark-bg">${a}</span>`).join(' or ')
        this.game.status('Answers: ' + answers)
        this.game.useNormalPlaceholder()
    }

    answerQuestion (answer) {
        // A question in a scene can define callbacks for what should happen depending on different answers.
        // IDEA: Maybe add this to the player's choices, which could be used to alter gameplay and story in the future.
        if (this.activeQuestion && this.activeQuestion.answers[answer]) {
            this.activeQuestion.answers[answer](this)
        }
    }

    end () {
        this.currentScene = 0
        this.game.activeCutscene = null
        this.game.returnToGame()
    }

    static initializeCutscenes (game, cutsceneConfigs) {
        const cutscenes = {}
        for (const c of cutsceneConfigs) {
            cutscenes[c.id] = new Cutscene(c, game)
        }
        return cutscenes
    }
}
