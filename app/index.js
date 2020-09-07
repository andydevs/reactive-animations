/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import * as vector from './vector';
import { fromEvent, of, animationFrameScheduler, animationFrame } from 'rxjs'
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

class Box {
    constructor(root, x, y, color) {
        // Create element
        this.element = document.createElement('div')
        this.element.classList.add('animated-box')
        this.element.style.backgroundColor = color
        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
        root.appendChild(this.element)

        // Bind handler functions
        this.handleClickObserver = this.handleClickObserver.bind(this)

        // Current mouse position
        this.mousepos = {}

        // Click observer and subscriptions
        this.clickObserver$ = fromEvent(this.element, 'click')
        this.clickObserver$.subscribe(this.handleClickObserver)
    }

    handleClickObserver() {
        if (this.subscription) {
            this.subscription.unsubscribe()
            this.subscription = null
        }
        else {
            this.subscription = mousePos$.subscribe(pos => {
                this.mousepos = pos
            })
            this.subscription.add(animationFrames$.subscribe(() => {
                this.updatePosition()
            }))
        }
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

    updatePosition() {
        this.setPosition(this.mousepos)
    }
}

class DraggableBox extends Box {
    constructor(root, x, y, color, dragFactor) {
        super(root, x, y, color)
        this.dragFactor = dragFactor
    }

    updatePosition() {
        let current = this.getPosition()
        
        // Get distance to mousepos and scale distance down
        let dist = vector.distance(current, this.mousepos)
        let velocity = vector.scale(dist, this.dragFactor)
        let next = vector.add(current, velocity)
        next = vector.vfloor(next)

        // Set position
        this.setPosition(next)
    }
}

let redbox = new Box(app, 100, 100, 'red')
let bluebox = new DraggableBox(app, 200, 100, 'blue', 0.25)
let greenbox = new DraggableBox(app, 300, 100, 'green', 0.05)
