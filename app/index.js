/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import * as vector from './vector';
import { 
    fromEvent,
    of,
    animationFrameScheduler,
    combineLatest,
    Subscription
} from 'rxjs'
import {
    map,
    repeat,
    scan 
} from 'rxjs/operators';

// Animation observable
let animationFrames$ = of(0, animationFrameScheduler)
    .pipe(
        repeat(),
        scan(frame => frame + 1)
    )

// Mouse move position observable
let mouseMovePos$ = fromEvent(document, 'mousemove')
    .pipe(
        map(event => ({ x: event.clientX, y: event.clientY }))
    )

// Tracks mouse position at every animation frame
let mousePos$ = combineLatest(animationFrames$, mouseMovePos$)
    .pipe(
        map( ([frame, mousepos]) => mousepos )
    )

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

class DraggableBox extends Box {
    constructor(root, x, y, color, dragFactor) {
        super(root, x, y, color)

        // Set drag factor
        this.dragFactor = dragFactor

        // Subscription holder
        this.subscription = Subscription.EMPTY

        // Bind methods
        this.handleToggleDrag = this.handleToggleDrag.bind(this)
        this.handleUpdatePosition = this.handleUpdatePosition.bind(this)

        // Subscribe drag toggler to click observer
        this.clickObservable$.subscribe(this.handleToggleDrag)
    }

    handleToggleDrag() {
        if (this.subscription.closed) {
            this.subscription = mousePos$.subscribe(this.handleUpdatePosition)
        }
        else {
            this.subscription.unsubscribe()
        }
    }

    handleUpdatePosition(mousepos) {
        let current = this.getPosition()
        
        // Get distance to mousepos and scale distance down
        let dist = vector.distance(current, mousepos)
        let velocity = vector.scale(dist, this.dragFactor)
        let next = vector.add(current, velocity)
        next = vector.vfloor(next)

        // Set position
        this.setPosition(next)
    }
}

let redbox = new DraggableBox(app, 100, 100, 'red', 0.5)
let bluebox = new DraggableBox(app, 200, 100, 'blue', 0.25)
let greenbox = new DraggableBox(app, 300, 100, 'green', 0.05)
