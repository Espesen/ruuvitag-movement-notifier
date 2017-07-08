// Module for detecting sudden changes in numeral input

const EventEmitter = require('events').EventEmitter;

class Detector extends EventEmitter {

  constructor(options) {
    super();
    options = options || {};
    if (!options.threshold) {
      throw new Error('Threshold must be specified');
    }
    this.threshold = options.threshold;
    this._storedValues = [];
    this._normalLevel = null;
  }

  storeValue(value) {
    if (typeof value !== 'number') {
      throw new Error('Not a number!');
    }
    this._storedValues.push(value);

    // emit an event if threshold is exceeded
    if (this._normalLevel !== null && Math.abs(value - this._normalLevel) >= this.threshold) {
      this.emit('suddenChange', value);
    }

    // count _normalLevel
    if (this._storedValues.length > 4) {
      let average = this._storedValues.slice(-5).reduce((a, b) => a + b, 0) / 5;
      if (this._normalLevel === null || Math.abs(average - this._normalLevel) >= this.threshold) {
        this._normalLevel = average;
      }
    }
    
  }
}

module.exports = Detector;