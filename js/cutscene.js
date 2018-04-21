class Cutscene {
    constructor (cutscene, game) {
        this.game = game
        this.scenes = cutscene.scenes
        this.id = cutscene.id
        this.currentScene = 0
    }

    start () {
        this.game.activeCutscene = this
        this.game.itemText('')
        this.nextScene()
        this.game.useContinuePlaceholder()
    }

    nextScene () {
        const scene = this.scenes[this.currentScene]
        if (scene) {
            this.game.text(scene.text)
            // Allow the title to updated for individual scenes. Keep previous if nothing new.
            if (scene.title) this.game.title(scene.title)
            this.currentScene++
        } else {
            this.end()
        }
    }

    end () {
        this.currentScene = 0
        this.game.activeCutscene = null // NOTE: Maybe move this into game.returnToGame()
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
