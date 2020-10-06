/**
 * Using rxjs to animate javascript components
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 7 - 2020
 */
import { 
    animationFrameScheduler, 
    combineLatest, 
    scheduled, 
    Subscriber, 
    Subscription 
} from 'rxjs'
import { 
    observeOn, 
    repeat, 
    scan, 
    map 
} from 'rxjs/operators'

/**
 * An operator that toggles a boolean on and off when
 * The source observable emits
 * 
 * @param {boolean} initial initial state of toggler
 */
export function toggleState(initial=false) {
    return scan(state => !state, initial)
}

/**
 * Meta subscriber that manages a subscription to an observable
 * Subscribing when the input is true and unsubscribing when it
 * is false
 * 
 * @param {Observable<any>} observable$ the observable to subscribe to
 * @param {Subscriber} subber subscriber that subscribes to the observable
 * 
 * @return {Subscriber} the subscriber that implements toggling
 */
export function conditionalSubscription(observable$, subber) {
    return {
        subscription: Subscription.EMPTY,
        next(state) {
            if (state && this.subscription.closed) {
                this.subscription = observable$.subscribe(subber)
            }
            else if (!this.subscription.closed) {
                this.subscription.unsubscribe()
            }
        },
        error() {
            if (!this.subscription.closed) {
                this.subscription.unsubscribe()
            }
        },
        complete() {
            if (!this.subscription.closed) {
                this.subscription.unsubscribe()
            }
        }
    }
}

/**
 * Operator that maintains a position which is interpolated
 * over time using the distance between the stored position
 * and the next position
 * 
 * @param {float} alpha alpha parameter for interpolation
 * 
 * @return {Operator} interpolation operator
 */
export function interpolate(alpha) {
    let beta = 1 - alpha
    return scan(
        (pos, next) => ({
            x: alpha * next.x + beta * pos.x,
            y: alpha * next.y + beta * pos.y
        })
    )
}

/**
 * Operator that returns an observable that emits the last 
 * emitted value from the given observable every animation 
 * frame.
 * 
 * @return continuous animation operator
 */
export function continuousAnimationSignal() {
    const frameSignal$ = scheduled([null], animationFrameScheduler)
        .pipe(repeat())
    return function(source$) {
        return combineLatest([frameSignal$, source$])
            .pipe(
                map(([_, out]) => out),
                observeOn(animationFrameScheduler)
            )
    }
}