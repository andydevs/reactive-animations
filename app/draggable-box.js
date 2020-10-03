/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import * as vector from './vector';
import * as observables from './observable';
import Box from './box';
import { Subscription, fromEvent } from 'rxjs'
import { scan } from 'rxjs/operators';

/**
 * Box element that is draggable
 */
export default class DraggableBox extends Box {
    /**
     * Construct draggable box
     * 
     * @param {HTMLElement} root element to put box in
     * @param {int} x initial x position
     * @param {int} y initial y position
     * @param {string} color color of box
     * @param {float} dragFactor (how much the box lags behind the mouse, capped 0 to 1)
     */
    constructor(root, x, y, color, dragFactor) {
        super(root, x, y, color)

        // Set drag factor (and cap it)
        this.dragFactor = dragFactor
        if (this.dragFactor < 0) this.dragFactor = 0
        if (this.dragFactor > 1) this.dragFactor = 1

        // Subscription holder
        this.subscription = Subscription.EMPTY

        // Bind methods
        this.handleToggleDrag = this.handleToggleDrag.bind(this)
        this.handleUpdatePosition = this.handleUpdatePosition.bind(this)

        // Subscribe drag toggler to click observer
        this.clicks$ = fromEvent(this.element, 'click')
        this.clicks$.subscribe(this.handleToggleDrag)
    }

    /**
     * Subscribe or unsubscribe from mousePos$ observer if clicked
     */
    handleToggleDrag() {
        if (this.subscription.closed) {
            this.subscription = observables.mousePos$
                .pipe(
                    scan((boxpos, mousepos) => {
                        let distance = vector.distance(boxpos, mousepos)
                        let velocity = vector.scale(distance, this.dragFactor)
                        let nextboxpos = vector.add(boxpos, velocity)
                        nextboxpos = vector.vfloor(nextboxpos)
                        return nextboxpos
                    })
                )
                .subscribe(this.handleUpdatePosition)
        }
        else {
            this.subscription.unsubscribe()
        }
    }

    /**
     * Update position of draggable box
     * 
     * @param {object} boxps next box position
     */
    handleUpdatePosition(boxpos) {
        this.position = boxpos
    }
}