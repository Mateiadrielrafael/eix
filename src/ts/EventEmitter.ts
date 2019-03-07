import { Subject, Subscription, Observable } from "rxjs";
import { filter, take, map } from "rxjs/operators";

interface EventData<T> {
    name: any
    data: T
}

export class EventEmitter<T>{

    /**
     * The main subject of the emitter
     */
    core = new Subject<EventData<T>>()

    /**
    * Used fo emitting and reacting to events
    */
    constructor() { }

    /**
     * Binds the handler to the event
     * @param key the name of the event
     * @param callback the handler of the event
     */
    on(key: any, callback: (data?: T) => any): Subscription {
        return this.emitter(key).subscribe(data => callback(data))
    }

    /**Binds the handler to the first occurance of the event
     * @param key the name of the event
     * @param callback the handler of the event
     */
    once(key: any, callback: (data?: T) => any): Subscription {
        return this.emitter(key).pipe(
            take(1)
        ).subscribe(data => callback(data))
    }

    /**
     * Returns an observable streamig the events
     * @param key the name of the event
     */
    emitter(key: any): Observable<T> {
        return this.core.pipe(
            filter(data => data.name == key)
        ).pipe(
            map(val => val.data)
        )
    }

    /**
     * @param name the name of the event
     * @param data the data to be sent to the event
     */
    emit(name: any, data: T) {
        this.core.next({ name, data })
    }
}