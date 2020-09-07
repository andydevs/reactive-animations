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
import { map, repeat, scan } from 'rxjs/operators';

// Animation observable
export const animationFrames$ = of(0, animationFrameScheduler)
    .pipe(
        repeat(),
        scan(frame => frame + 1)
    )

// Mouse move position observable
export const mouseMovePos$ = fromEvent(document, 'mousemove')
    .pipe(
        map(event => ({ x: event.clientX, y: event.clientY }))
    )

// Tracks mouse position at every animation frame
export const mousePos$ = combineLatest(animationFrames$, mouseMovePos$)
    .pipe(
        map( ([frame, mousepos]) => mousepos )
    )