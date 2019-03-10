import { Observable, Observer } from "rxjs";

/**
 * The interface for the data in the array returned by ecs.all
 */
interface selectedData{
    id:number
    data:Component[]
}

/** 
 * Unique ID that has data (components) attached to it.
 */
type Entity = number

/**
 * Data attached to an entity
 */
type Component = {
    /** 
     * "Type" of the component, e.g. the sort of data it represents.
     */
    type: string
    /**
     * Data the component represents.
     */
    data: any
    /**
     * The unique id of the component
     */
    id: number
}

/**
 * The data used for working with components (the rest is auto-generated)
 */
interface ComponentData{
    /** 
     * "Type" of the component, e.g. the sort of data it represents.
     */
    type: string
    /**
     * Data the component represents.
     */
    data: any
}

export class ECS {
    /** 
     * List of all entities and data attached to them
     */
    private entities: Map<number, Set<Component>> = new Map()
    private id = 0

    /**
     * used to get the needed data from the ecs
     * @param params the data types of the needed components
     * @returns an observable containing objects with an id and a data properties
     */
    all(...params: string[]): Observable<selectedData> {
        //return an observable of <selectData>
        return Observable.create((observer:Observer<selectedData>) => {

            //iterats over all entities
            this.entities.forEach((value,key) => {

                //this is what might be emitted
                const data = {
                    id:key, //the id of the entity
                    data:Array.from(value).filter(
                        (val) => params.indexOf(val.data) != -1 
                    ) //only let components with the data type in params in
                }

                //only return if not empty
                if (data.data.length != 0)
                    observer.next(data)
            })

            //end the stream
            observer.complete()
        })
    }

    /**
     * Adds a new entity to the ecs
     * @param params the components to be added to the new entity
     * @returns the id of the new entity
     */
    addEntity(...params:ComponentData[]):number{
        //unique local id
        let lastId = 0

        //add the entity
        this.entities.set(this.id++,new Set(
            params.map(val => ({
                id:lastId++,
                type:val.type,
                data:val.data
            })) // add an id to the existing data
        ))

        //return the id
        return this.id - 1
    }
}

export * from "./eixEvent.js"