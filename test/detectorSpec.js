const mockery = require('mockery');
const sinon = require('sinon');
const mocks = require('./mocks');

describe('class Detector', () => {

  const Detector = require('../lib/detector');

  beforeEach(() => {
    mockery.enable();
    //mockery.registerMock() etc...
  });

  describe('method storeValue', () => {

    const exampleValues = [ 1, 3, 2, 5, 4, 2, 5, 4, 23, 19, 16, 18, 22 ];

    it('should store values and calculate _normalLevel', () => {
      const detector = new Detector({ threshold: 15 });
      exampleValues.slice(0, 5).forEach(value => detector.storeValue(value));
      expect(detector._normalLevel).toBe(3);
    });

    it('should change _normalLevel if necessary', () => {
      const detector = new Detector({ threshold: 15 });
      exampleValues.forEach(value => detector.storeValue(value));
      expect(detector._normalLevel).toBeGreaterThan(15);
    });

    describe('emitting "suddenChange"', () => {

      let emitted;

      beforeEach(() => {
        emitted = false;
        jasmine.clock().install();
      });

      it('should happen if there is a big enough sudden change', (done) => {
        const detector = new Detector({ threshold: 15 });
        detector.on('suddenChange', () => emitted = true);
        exampleValues.slice(0, 9).forEach(value => detector.storeValue(value));
        setTimeout(() => {
          if (!emitted) {
            return done.fail('Event was not emitted');
          }
          done();
        }, 100);
        jasmine.clock().tick(100);
      });

      it('shouldn\'t happen if threshold is not exceeded', (done) => {
        const detector = new Detector({ threshold: 25 });
        detector.on('suddenChange', () => emitted = true);
        exampleValues.slice(0, 9).forEach(value => detector.storeValue(value));
        setTimeout(() => {
          if (emitted) {
            return done.fail('Event shouldn\t have been emitted');
          }
          done();
        }, 100);
        jasmine.clock().tick(100);
      });


      afterEach(function () {
        jasmine.clock().uninstall();
      });

    });




    
  });
  afterEach(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

});