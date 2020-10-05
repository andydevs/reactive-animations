/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import { toggleSubscription, interpolate } from './operations';
import { mousePos$ } from './observable';
import { fromEvent } from 'rxjs';

// Get app
const app = document.getElementById('app')

/**
 * Moves box to new position
 * 
 * @param {HTMLElement} box box to move
 * @param {{x: float, y: float}} pos new position of box 
 */
function moveBox(box, pos) {
    box.style.left = pos.x + 'px'
    box.style.top = pos.y + 'px'
}

/**
 * 
 * @param {string} color color of box
 * @param {{x: float, y: float}} initial initial position
 */
function createBox(color, initial={x: 0, y: 0}) {
    let box = document.createElement('div')
    box.classList.add('animated-box')
    box.style.backgroundColor = color
    app.appendChild(box)
    moveBox(box, initial)
    return box
}

function clickAndDrag(box) {
    return fromEvent(box, 'click').subscribe(
        toggleSubscription(
            mousePos$,
            pos => moveBox(box, pos)
        )
    )
}

function clickAndDragInterpolated(box, alpha) {
    return fromEvent(box, 'click').subscribe(
        toggleSubscription(
            interpolate(alpha)(mousePos$),
            pos => moveBox(box, pos)
        )
    )
}

// Create boxes
let redbox = createBox('red', { x: 100, y: 100 })
clickAndDrag(redbox)

let bluebox = createBox('blue', { x: 200, y: 100 })
clickAndDragInterpolated(bluebox, 0.75)

let greenbox = createBox('green', { x: 300, y: 100 })
clickAndDragInterpolated(greenbox, 0.03)