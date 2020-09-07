/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import { pixVal } from './vector';
import { fromEvent } from 'rxjs';

/**
 * A box element with a click observer
 */
export default class Box {
    /**
     * Construct box
     * 
     * @param {HTMLElement} root element to put box in
     * @param {int} x initial x position
     * @param {int} y initial y position
     * @param {string} color color of box
     */
    constructor(root, x, y, color) {
        // Create element
        this.element = document.createElement('div')
        this.element.classList.add('animated-box')
        this.element.style.backgroundColor = color
        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
        root.appendChild(this.element)

        // Get click observable
        this.clickObservable$ = fromEvent(this.element, 'click')
    }

    /**
     * Get current box position
     */
    get position() {
        return {
            x: pixVal(this.element.style.left),
            y: pixVal(this.element.style.top)
        }
    }

    /**
     * Sets current box position
     * 
     * @param {object} pos next position
     */
    set position(pos) {
        this.element.style.left = pos.x + 'px'
        this.element.style.top = pos.y + 'px'
    }
}