const PushBullet = require('pushbullet');
const pusher = new PushBullet(require('../tokens.json').accessToken);

const pushBullet = module.exports = {

  pushNote: (options, title, message) => new Promise((resolve, reject) => {

    // Pushes a note to all devices.
    //
    // options: (can be omitted)
    // title: string
    // message: string
    //
    // Returns a promise

    if (!message && typeof options === 'string') {
      message = title;
      title = options;
      options = {};
    }

    pusher.note({}, title, message, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });

  })

};