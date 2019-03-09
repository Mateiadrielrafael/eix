import { SceneManager } from "./SceneManager.js"
import { TemplateResult } from "lit-html";
import { Observable } from "rxjs";
import { ECS } from "./ecs.js"

type constructable = { new(...args: any[]): {} }
interface SceneOptions {
    template: (active: any) => TemplateResult
    name: string | null
}

/**
 * The main decorator of the engine.
 * @param options the options given to the decorator
 * @returns a Scene decorator
 */
export function Scene(options: SceneOptions) {
    /**
     * the main Scene decorator
     *@param target automatically passed by ts when used as a decorator.
     */
    return function <T extends constructable>(target: T) {
        //add funcionality to the class
        return class extends target {
            //add ecs
            ecs = new ECS()

            //runs when you create a new object
            constructor(...params: any[]) {

                //add the functionality of the base class
                //unkonown number of parameters, so we just pass ..arguments
                super(...params)

                //if name isnt null, automatically register this
                if (options.name)
                    Scene.manager.scenes[options.name] = this
            }

            /**
             * Called to go to the next scene 
             * @param name the name of the scene to transition to
             */
            resolve(name: string) {
                Scene.manager.active = name
            }

            /**
             * renders the ui from the template given to the decorator
             * @returns the TemplateResult to be rendered
             */
            render(): TemplateResult {
                return options.template(this)
            }
        }
    }
}
//the amnager of the scene
Scene.manager = new SceneManager()

/**
 * Used to make data bindings to the html
 * @returns the main decorator
 */
export function Portal<T>() {
    //make the actual value of the property secret
    let secret: T

    //return a decorator
    return function (target: any, key: string): void {

        //start by setting the secret value the old value of the key
        secret = target[key]

        //getter only reveals secret
        const getter = () => secret

        //setter updates he secret and the html.
        //maybe you are thinking this is not too efficient because 
        //im rendering even if the scene isnt even active
        //but lit-html does that for you
        const setter = (next: T) => {
            secret = next //set secret to the value provided
            Scene.manager.render() //update the html
        };

        //add the property to the target
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true, //i have no idea what the last 2 does
            configurable: true
        });
    }
}

/**
 * Used to update the data from an observable
 * @param object the observable to subscribe to
 * @returns the main decorator
 */
export function Follower<T>(object: Observable<T>) {
    return function (target: any, key: string | symbol) {
        object.subscribe(val => {
            target[key] = val
        })
    }
}

// //TODO: remove those
// export * from "lit-html"
// export * from "rxjs"
// export { map } from "rxjs/operators"