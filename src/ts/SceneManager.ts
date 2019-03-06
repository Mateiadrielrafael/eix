import { render, html } from "lit-html"

type activable = string | null

/**
 * Is displayed if the activeElement name isnt null and there is no scene with that name
 */
const InvalidSceneNameError = new Error("The scene you are trying to render doesnt exist")

/**
 * Renders and transition from scene to scene
 */
class SceneManager {
    /**
     * The name of the activeElement scene
     */
    activeElement: activable

    /**
     * The container for the html
     */
    main: HTMLElement = document.getElementById("main")

    /**
     * Holds all the scenes
     */
    scenes: {
        [key: string]: any
    } = {}

    /**
     * renders the activeElement scene
     */
    render() {
        //check if activeElement isnt null and if there is a scene with that name
        if (this.activeElement && this.scenes[this.activeElement])
            //render the scene in the man element
            render(this.scenes[this.activeElement].render(), this.main)
        //if the activeElement element is null, show an empty page
        else
            render(html``, this.main)

        //throw and error if the name is incorect
        if (this.activeElement && !this.scenes[this.activeElement])
            throw InvalidSceneNameError
    }

    //automatically re-render when a new scene is activated
    set active(value: string) {
        this.activeElement = value
        this.render()
    }
    get active() {
        return this.activeElement
    }
}

//the library cant work without the document
if (!document)
    throw new Error("document does not exist")

export { SceneManager }
