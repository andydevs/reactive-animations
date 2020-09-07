/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import { fromEvent } from 'rxjs';

export default class Box {
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

    getPosition() {
        return {
            x: vector.pixVal(this.element.style.left),
            y: vector.pixVal(this.element.style.top)
        }
    }

    setPosition(pos) {
        this.element.style.left = pos.x + 'px'
        this.element.style.top = pos.y + 'px'
    }
}