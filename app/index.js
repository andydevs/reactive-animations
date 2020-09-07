/**
 * Use this template for building basic static websites
 * 
 * Author:  [Your Name Here]
 * Created: [Date of Creation]
 */
import './style/main.scss'
import { fromEvent, of, animationFrameScheduler } from 'rxjs'
import { map, repeat } from 'rxjs/operators';

// Speed Factor
const speedFactor = 0.25

// Get app
let app = document.getElementById('app')

// Create redbox
let redbox = document.createElement('div')
redbox.classList.add('redbox')
app.appendChild(redbox)

// Create bluebox
let bluebox = document.createElement('div')
bluebox.classList.add('bluebox')
app.appendChild(bluebox)

// Capture mousepos
let mousepos = {}

// Pixel value from string
const pixVal = val => val === '' ? 0 : parseInt(val)

// Vector distance
const distance = (a, b) => ({ x: b.x - a.x, y: b.y - a.y })

// Vector addition
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })

// Vector scale
const scale = (a, s) => ({ x: a.x * s, y: a.y * s })

// Vector floor
const vfloor = a => ({ x: Math.floor(a.x), y: Math.floor(a.y) })

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

// Move red box
mousePos$.subscribe(pos => {
    redbox.style.left = pos.x + 'px'
    redbox.style.top = pos.y + 'px'
})

// Set global mousepos
mousePos$.subscribe(pos => {
    mousepos = pos
})

// Move bluebox
animationFrames$.subscribe(() => {
    // Get position
    let current = {}
    current.x = pixVal(bluebox.style.left)
    current.y = pixVal(bluebox.style.top)

    // Get distance to mousepos and scale distance down
    let dist = distance(current, mousepos)
    let velocity = scale(dist, speedFactor)
    let next = add(current, velocity)
    next = vfloor(next)

    // Set position
    bluebox.style.left = next.x + 'px'
    bluebox.style.top = next.y + 'px'
})