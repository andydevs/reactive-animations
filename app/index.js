/**
 * Use this template for building basic static websites
 * 
 * Author:  [Your Name Here]
 * Created: [Date of Creation]
 */
import './style/main.scss'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators';

// Get app
let app = document.getElementById('app')

// Create redbox
let redbox = document.createElement('div')
redbox.classList.add('animated-box')
redbox.classList.add('redbox')
app.appendChild(redbox)

// Mouse position observable
let mousePos$ = fromEvent(document, 'mousemove')
    .pipe(
        map(event => ({ x: event.clientX, y: event.clientY }))
    )

// Move dom
mousePos$.subscribe(pos => {
    redbox.style.left = pos.x + 'px'
    redbox.style.top = pos.y + 'px'
})