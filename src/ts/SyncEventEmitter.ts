import { Subject, Subscription, Observable } from "rxjs"
import { filter, take, map } from "rxjs/operators"
import { EventEmitter } from "./EventEmitter"

export class SyncEmitter<T>{

    /**
     * The main subject of the emitter
     */
    core: {
        [key: string]: ((data?: T) => any)[]
        [key: number]: ((data?: T) => any)[]
    } = {}

    /**
    * Used fo emitting and reacting to events sinchronously
    */
    constructor() { }

    /**
     * Binds the handler to the event
     * @param key the name of the event
     * @param callback the handler of the event
     */
    on(key: any, callback: (data?: T) => any): void {
        if (!this.core[key]) this.core[key] = []
        this.core[key].push(callback)
    }

    /**Binds the handler to the first occurance of the event
     * @param key the name of the event
     * @param callback the handler of the event
     */
    once(key: any, callback: (data?: T) => any): void {
        if (!this.core[key]) this.core[key] = []
        const func = (data?: T) => {
            callback(data)
            this.core[key].splice(this.core[key].indexOf(func), 1)
        }

        this.core[key].push(func)
    }

    /**
     * @param name the name of the event
     * @param data the data to be sent to the event
     */
    emit(name: any, data: T) {
        this.core[name].forEach(val => val(data))
    }

    /**
     * Retuns the async version of the emitter
     * All "once" events are converted to normal events
     */
    toAsync(): EventEmitter<T> {
        const emitter = new EventEmitter<T>()

        for (let i in this.core)
            for (let j of this.core[i])
                emitter.on(i, j)

        return emitter
    }
}