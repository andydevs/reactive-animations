/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import * as vector from './vector';
import { fromEvent, of, animationFrameScheduler } from 'rxjs'
import { map, repeat } from 'rxjs/operators';

// Speed Factor
const speedFactor = 0.25

// Capture mousepos
let mousepos = {}

// Get app
let app = document.getElementById('app')

// Create redbox
let redbox = document.createElement('div')
let redClickObserver$ = fromEvent(redbox, 'click')
let redboxAnimationSubscriber = null
redbox.classList.add('redbox')
app.appendChild(redbox)

// Create bluebox
let bluebox = document.createElement('div')
let blueClickObserver$ = fromEvent(bluebox, 'click')
let blueboxAnimationSubscriber = null
bluebox.classList.add('bluebox')
app.appendChild(bluebox)

// Animation observable
let animationFrames$ = of(null, animationFrameScheduler)
    .pipe(
        repeat()
    )

// Mouse position observable
let mousePos$ = fromEvent(document, 'mousemove')
    .pipe(
        map(event => ({ x: event.clientX, y: event.clientY }))
    )
    
// Set global mousepos
mousePos$.subscribe(pos => {
    mousepos = pos
})

redClickObserver$.subscribe(event => {
    if (redboxAnimationSubscriber) {
        redboxAnimationSubscriber.unsubscribe()
        redboxAnimationSubscriber = null
    }
    else {
        redboxAnimationSubscriber = animationFrames$.subscribe(() => {
            redbox.style.left = mousepos.x + 'px'
            redbox.style.top = mousepos.y + 'px'
        })
    }
})

blueClickObserver$.subscribe(event => {
    if (blueboxAnimationSubscriber) {
        blueboxAnimationSubscriber.unsubscribe()
        blueboxAnimationSubscriber = null
    }
    else {
        blueboxAnimationSubscriber = animationFrames$.subscribe(() => {
            // Get position
            let current = {}
            current.x = vector.pixVal(bluebox.style.left)
            current.y = vector.pixVal(bluebox.style.top)

            // Get distance to mousepos and scale distance down
            let dist = vector.distance(current, mousepos)
            let velocity = vector.scale(dist, speedFactor)
            let next = vector.add(current, velocity)
            next = vector.vfloor(next)

            // Set position
            bluebox.style.left = next.x + 'px'
            bluebox.style.top = next.y + 'px'
        })
    }
})