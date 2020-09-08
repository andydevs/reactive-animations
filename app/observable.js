/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import { 
    fromEvent,
    of,
    animationFrameScheduler,
    combineLatest
} from 'rxjs';
import { map, repeat, scan, observeOn, startWith } from 'rxjs/operators';

// Clamp function
const clamp = (x, w) => x < 0 ? 0 : (x > w ? w : x)

// Animation observable
export const animationFrames$ = of(0, animationFrameScheduler)
    .pipe(
        repeat(),
        scan(frame => frame + 1)
    )

// Mouse move position observable
export const mouseMovePos$ = fromEvent(document, 'mousemove')
    .pipe(
        observeOn(animationFrameScheduler),
        map(event => ({ 
            x: event.clientX,
            y: event.clientY 
        }))
    )

// Tracks mouse position at every animation frame
export const mousePos$ = combineLatest(
    animationFrames$,
    mouseMovePos$,
    (_, pos) => pos)

// Tracks resize events
export const windowSize$ = fromEvent(window, 'resize')
    .pipe(
        map(event => ({
            width: event.target.innerWidth,
            height: event.target.innerHeight
        })),
        startWith({ 
            width: window.innerWidth,
            height: window.innerHeight 
        })
    )

// Window clamped mouse position
export const windowClampedMousePos$ = combineLatest(
    animationFrames$,
    windowSize$,
    mouseMovePos$,
    (_, window, mouse) => ({
        x: clamp(mouse.x, window.width),
        y: clamp(mouse.y, window.height)
    })
)