/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
// Pixel value from string
export const pixVal = val => val === '' ? 0 : parseInt(val)

// Vector distance
export const distance = (a, b) => ({ x: b.x - a.x, y: b.y - a.y })

// Vector addition
export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })

// Vector scale
export const scale = (a, s) => ({ x: a.x * s, y: a.y * s })

// Vector floor
export const vfloor = a => ({ x: Math.floor(a.x), y: Math.floor(a.y) })