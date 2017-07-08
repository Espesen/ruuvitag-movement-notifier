# ruuvitag-movement-notifier

Use [RuuviTag](https://tag.ruuvi.com/) to detect movement and send
notification to your phone with [Pushbullet](https://www.pushbullet.com/)!

This app was tested on Raspberry Pi 3 and NodeJS version 7.10.0. See
[instructions](https://github.com/sandeepmistry/noble) on
how to enable BLE on Raspbian and how to run without root.

### Usage

Clone the repo.

Run
```
npm install --production
```

Edit ```tokens.json``` to add your personal Pushbullet
access token ([How to find it?](https://docs.pushbullet.com/#api-quick-start))

Run
```
node index.js
```