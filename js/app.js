window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  function log(msg) {
    console.log(msg);
    var li = document.createElement('li');
    li.textContent = new Date() + ' ' + msg;
    document.getElementById('log').appendChild(li);
  }

  function byteArrayToHex(arr) {
    if (!arr) {
      return '';
    }

    var hexStr = '';
    for (var i = 0; i < arr.length; i++) {
      var hex = (arr[i] & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }
    return hexStr;
  }

  function updateUIText(elementId, text) {
    document.getElementById(elementId).textContent = text;
  }

  var firedCount = 0;
  log('Starting app, setting message handler');
  window.navigator.mozSetMessageHandler("nfc-hci-event-transaction", (msg) => {
    firedCount += 1;
    log('HCI Event Transaction message handler fired, count ' + firedCount +
        ', message : ' + JSON.stringify(msg));

    var data = msg.hciEventTransaction;
    updateUIText('count', firedCount);
    updateUIText('aid', byteArrayToHex(data.aid));
    updateUIText('data', byteArrayToHex(data.payload));
    updateUIText('time', new Date());
  });
});
