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

// Speed Factor
const speedFactor = 0.25

// Get app
let app = document.getElementById('app')

// Create redbox
let redbox = document.createElement('div')
let redClickObserver$ = fromEvent(redbox, 'click')
let redboxAnimationSubscriber = null
let redboxMotionSubscriber = null
let redboxMousePos = {}
redbox.classList.add('redbox')
app.appendChild(redbox)

// Create bluebox
let bluebox = document.createElement('div')
let blueClickObserver$ = fromEvent(bluebox, 'click')
let blueboxAnimationSubscriber = null
let blueboxMotionSubscriber = null
let blueboxMousePos = {}
bluebox.classList.add('bluebox')
app.appendChild(bluebox)

redClickObserver$.subscribe(event => {
    if (redboxAnimationSubscriber || redboxMotionSubscriber) {
        if (redboxMotionSubscriber) {
            redboxMotionSubscriber.unsubscribe()
            redboxMotionSubscriber = null
        }

        if (redboxAnimationSubscriber) {
            redboxAnimationSubscriber.unsubscribe()
            redboxAnimationSubscriber = null
        }
    }
    else {
        redboxMotionSubscriber = mousePos$.subscribe(pos => {
            redboxMousePos = pos
        })

        redboxAnimationSubscriber = animationFrames$.subscribe(() => {
            redbox.style.left = redboxMousePos.x + 'px'
            redbox.style.top = redboxMousePos.y + 'px'
        })
    }
})

blueClickObserver$.subscribe(event => {
    if (blueboxAnimationSubscriber || blueboxMotionSubscriber) {
        if (blueboxMotionSubscriber) {
            blueboxMotionSubscriber.unsubscribe()
            blueboxMotionSubscriber = null
        }

        if (blueboxAnimationSubscriber) {
            blueboxAnimationSubscriber.unsubscribe()
            blueboxAnimationSubscriber = null
        }
    }
    else {
        blueboxMotionSubscriber = mousePos$.subscribe(pos => {
            blueboxMousePos = pos
        })

        blueboxAnimationSubscriber = animationFrames$.subscribe(() => {
            // Get position
            let current = {}
            current.x = vector.pixVal(bluebox.style.left)
            current.y = vector.pixVal(bluebox.style.top)

            // Get distance to mousepos and scale distance down
            let dist = vector.distance(current, blueboxMousePos)
            let velocity = vector.scale(dist, speedFactor)
            let next = vector.add(current, velocity)
            next = vector.vfloor(next)

            // Set position
            bluebox.style.left = next.x + 'px'
            bluebox.style.top = next.y + 'px'
        })
    }
})