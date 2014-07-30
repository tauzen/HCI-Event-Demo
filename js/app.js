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
  log('DOMContentLoaded, checking for NFC');
  if (window.navigator.mozNfc) {
    log('NFC found, registering event handler');
    window.navigator.mozNfc.onhcieventtransaction = function(event) {
      firedCount += 1;
      log('HCI Event Transaction handler fired, count ' + firedCount +
          ', event.detil: ' + JSON.stringify(event.detail));

      updateUIText('count', firedCount);
      updateUIText('aid', byteArrayToHex(event.detail.extra.aid));
      updateUIText('data', byteArrayToHex(event.detail.extra.data));
      updateUIText('uri', event.detail.uri);
      updateUIText('time', new Date());
    };
  }
});
