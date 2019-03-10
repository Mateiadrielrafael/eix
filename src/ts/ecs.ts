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
     * Owner of the component, an entity.
     */
    // owner: Entity
    /**
     * Data the component represents.
     */
    data: any
    /**
     * The unique id of the component
     */
    id: number
}

export class ECS {
    /** 
     * List of all entities and data attached to them
     */
    entities: Map<number, Set<Component>> = new Map()

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
}