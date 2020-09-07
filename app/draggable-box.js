/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import * as vector from './vector';
import * as observables from './observable';
import Box from './box';
import { Subscription } from 'rxjs'

export default class DraggableBox extends Box {
    constructor(root, x, y, color, dragFactor) {
        super(root, x, y, color)

        // Set drag factor
        this.dragFactor = dragFactor

        // Subscription holder
        this.subscription = Subscription.EMPTY

        // Bind methods
        this.handleToggleDrag = this.handleToggleDrag.bind(this)
        this.handleUpdatePosition = this.handleUpdatePosition.bind(this)

        // Subscribe drag toggler to click observer
        this.clickObservable$.subscribe(this.handleToggleDrag)
    }

    handleToggleDrag() {
        if (this.subscription.closed) {
            this.subscription = observables
                .mousePos$
                .subscribe(this.handleUpdatePosition)
        }
        else {
            this.subscription.unsubscribe()
        }
    }

    handleUpdatePosition(mousepos) {
        let current = this.getPosition()
        
        // Get distance to mousepos and scale distance down
        let dist = vector.distance(current, mousepos)
        let velocity = vector.scale(dist, this.dragFactor)
        let next = vector.add(current, velocity)
        next = vector.vfloor(next)

        // Set position
        this.setPosition(next)
    }
}