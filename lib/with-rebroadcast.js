define(function () {
    'use strict'

    return withRebroadcast;

    function withRebroadcast() {
        /**
         * Wrap an event handler to allow it to transform the data associated with an event.
         *
         * Takes a function that:
         *     - takes an event and associated data
         *     - returns transformed data
         *
         * The returned data is then rebroadcasted upward.
         *
         * Examples;
         *
         *      this.transformNiceEvent = function (event, data) {
         *          return {
         *              id: data.id,
         *              someOtherData: this.somethingNice
         *          };
         *      };
         *
         *      this.on('someNiceEvent', this.rebroadcast(this.transformNiceEvent));
         *
         * Returns an event-handling function.
         */
        this.rebroadcast = function (transform) {
            return function (event) {
                // If the event is as a result of it's own rebroadcast, then ignore it.
                if (this._isRebroadcasting) {
                    return;
                }
                this._isRebroadcasting = true;
                // Pass all our arguments to the transformer, then fire an event with the
                // returned data
                this.trigger(event, transform.apply(this, [].slice.call(arguments)));
                this._isRebroadcasting = false;
                // This event ain't going nowhere now
                event.stopPropagation();
                return false;
            }.bind(this);
        };
    }
});
