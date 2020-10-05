/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import {
    toggleSubscription,
    interpolate,
    continuousAnimationSignal
} from './operations';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// Get app
const app = document.getElementById('app')

// Mouse position observable
const mousePos$ = fromEvent(document, 'mousemove')
    .pipe(
        map(event => ({ 
            x: event.clientX,
            y: event.clientY 
        })),
        continuousAnimationSignal()
    )

/**
 * Moves box to new position
 * 
 * @param {HTMLElement} box box to move
 * @param {{x: float, y: float}} pos new position of box 
 */
export function moveBox(box, pos) {
    box.style.left = pos.x + 'px'
    box.style.top = pos.y + 'px'
}

/**
 * 
 * @param {string} color color of box
 * @param {{x: float, y: float}} initial initial position
 */
export function createBox(color, initial={x: 0, y: 0}) {
    let box = document.createElement('div')
    box.classList.add('box')
    box.style.backgroundColor = color
    app.appendChild(box)
    moveBox(box, initial)
    return box
}

/**
 * Adds click and drag functionality to box
 * 
 * @param {HTMLElement} box box element
 * 
 * @returns {Subscription} observable subscription for click and drag
 */
export function clickAndDrag(box) {
    return fromEvent(box, 'click').subscribe(
        toggleSubscription(
            mousePos$,
            pos => moveBox(box, pos)
        )
    )
}

/**
 * Adds interpolated click and drag functionality to box
 * 
 * @param {HTMLElement} box box element
 * @param {float} alpha interpolation alpha value
 * 
 * @returns {Subscription} observable subscription for click and drag
 */
export function clickAndDragInterpolated(box, alpha) {
    return fromEvent(box, 'click').subscribe(
        toggleSubscription(
            interpolate(alpha)(mousePos$),
            pos => moveBox(box, pos)
        )
    )
}