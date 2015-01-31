# flight-with-rebroadcast

[![Build Status](https://secure.travis-ci.org/ahume/flight-with-rebroadcast.svg)](http://travis-ci.org/ahume/flight-with-rebroadcast)

A [Flight](https://github.com/flightjs/flight) mixin for rebroadcasting an event having applyed a transformation to the event data.

This is useful when a component wishes to add data to an event triggered by a child component before it continues to bubble up the document.

## Installation

```bash
bower install --save flight-with-rebroadcast
```

## Example

Here's an example of a component definition that uses `withRebroadcast`.

```js
function Component() {
    this.transformNiceEvent = function (event, data) {
        return {
            id: data.id,
            someOtherData: this.somethingNice
         };
    };
    this.on('someNiceEvent', this.rebroadcast(this.transformNiceEvent));
}

```


## API

### `rebroadcast`

The mixin provides the `rebroadcast` method which takes a function that:
    * takes an event and associated data
    * returns transformed data

`rebroadcast` returns an event handling method that will be used to handle the original event, transform the data and then retrigger it on the component node.

## Development

Development of this component requires [Bower](http://bower.io) to be globally
installed:

```bash
npm install -g bower
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install & bower install
```

To continuously run the tests in Chrome during development, just run:

```bash
npm run watch-test
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
