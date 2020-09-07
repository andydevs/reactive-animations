/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import './style/main.scss'
import DraggableBox from './draggable-box';

// Get app
let app = document.getElementById('app')

// Create draggable boxes
let redbox = new DraggableBox(app, 100, 100, 'red', 0.5)
let bluebox = new DraggableBox(app, 200, 100, 'blue', 0.25)
let greenbox = new DraggableBox(app, 300, 100, 'green', 0.05)
