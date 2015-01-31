define(function (require) {
    'use strict';

    describeMixin('lib/with-rebroadcast', function () {

        beforeEach(function () {
            setupComponent('<div></div>');
        });

        it ('should trigger event with transformed data', function () {
            var spy = spyOnEvent(document, 'eventName');

            var transform = function (e, data) {
                return {
                    value: 'transformed value'
                };
            };

            this.component.on('eventName', this.component.rebroadcast(transform));
            this.component.trigger('eventName', {
                value: 'value'
            })

            expect(spy.calls.length).toBe(1);
            expect(spy.calls[0].data.value).toBe('transformed value');
        });

        it('should have access to original event data', function () {
            var spy = spyOnEvent(document, 'eventName');

            var transform = function (e, data) {
                return {
                    value: data.value + ' transformed'
                };
            };

            this.component.on('eventName', this.component.rebroadcast(transform));
            this.component.trigger('eventName', {
                value: 'value'
            })

            expect(spy.calls.length).toBe(1);
            expect(spy.calls[0].data.value).toBe('value transformed');
        });
    });
});
