
export default (option, dayjsClass, dayjsFactory) => {

    // Set timezone to guessed one
    if(!window.localStorage.scribeTimeZone) {
        let guessed = dayjsFactory.tz.guess()
        window.localStorage.scribeTimeZone = guessed
    }

    dayjsFactory.normalized = function (date) {
        const cfg = { date, args: arguments }
        let tzLocal = window.localStorage.scribeTimeZone
        try {
            return new dayjsClass(cfg).tz(tzLocal)
        } catch(err) {
            let guessed = dayjsFactory.tz.guess()
            return new dayjsClass(cfg).tz(guessed)
        }
    }

    dayjsClass.prototype.normalized = function() {
        let tzLocal = window.localStorage.scribeTimeZone
        try {
            return this.tz(tzLocal)
        } catch(err) {
            let guessed = dayjsFactory.tz.guess()
            return this.tz(guessed)
        }
    }
}