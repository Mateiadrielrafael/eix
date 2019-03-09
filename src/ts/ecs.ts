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
    owner: Entity
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
    private entities: Map<number, Set<Component>>
}