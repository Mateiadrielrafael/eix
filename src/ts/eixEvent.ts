import { fromEvent, Observable } from "rxjs"
// import { Key } from "ts-keycode-enum"
class eixEvent {
    value = false
    keydown: Observable<Event>
    keyup: Observable<Event>

    keys: Array<string>

    private keyStack = 0

    constructor(...params: string[]) {
        this.keys = params

        this.keydown = fromEvent(document, "keydown")
        this.keyup = fromEvent(document, "keyup")

        this.keydown.subscribe((e: KeyboardEvent) => {
            
        })
    }
}

export {eixEvent}