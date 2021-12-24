/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import {
    createBox,
    clickAndDrag,
    clickAndDragInterpolated
} from './ui.js';

// Create boxes
let redbox = createBox('red', { x: 100, y: 100 })
let bluebox = createBox('blue', { x: 200, y: 100 })
let greenbox = createBox('green', { x: 300, y: 100 })

// Add click and drag
clickAndDrag(redbox)
clickAndDragInterpolated(bluebox, 0.5)
clickAndDragInterpolated(greenbox, 0.03)
