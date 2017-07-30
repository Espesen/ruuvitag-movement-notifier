const ruuvi = require('node-ruuvitag');
const Detector = require('./lib/detector');
const pushBullet = require('./lib/pushbullet');

function onFound(ruuviTag) {

  console.log('Found RuuviTag ' + ruuviTag.id + ', starting...');

  ruuviTag.lastMoved = null;

  const accelerationAxii = [ 'accelerationX', 'accelerationY', 'accelerationZ' ];
  const detectors = {};
  accelerationAxii.forEach(axis => {
    const detector = new Detector({ threshold: 100 });
    detector.on('suddenChange', () => {
      if (ruuviTag.lastMoved === null || Date.now() - ruuviTag.lastMoved >= 60000) {
        pushBullet.pushNote('RuuviTag ' + ruuviTag.id + ' was moved!')
          .then(() => console.log('Sent a notification'))
          .catch(err => console.log('Error sending notification: ' + err.message))
        ruuviTag.lastMoved = Date.now();
      }
    });
    detectors[axis] = detector;
  });

  ruuviTag.on('updated', data => {
    accelerationAxii.forEach(axis => {
      if (typeof data[axis] === 'number') {
        detectors[axis].storeValue(data[axis]);
      }
    });
  });

}

console.log('Starting scan...');

ruuvi.on('found', onFound);