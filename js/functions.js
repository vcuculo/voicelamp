/*
 * Voice Lamp application.
 * Copyright (C) 2013  Vittorio Cuculo <me@vcuculo.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

var connectionId = -1;
var language = 'it';

function log(msg) {
  var buffer = document.querySelector('#buffer');
  buffer.innerHTML = msg;
}

function showBar(color) {
  switch (color){
  case 'r':
     background = "red";
     break;
  case 'g':
     background = "green";
     break;
  case 'b':
     background = "blue";
     break;
  case 'y':
     background = "yellow";
     break;
  case 'c':
     background = "cyan";
     break;
  case 'm':
     background = "magenta";
     break;
  case 'w':
     background = "white";
     break;
  default:
     background = "black";
     break;
  }

  var cv  = document.getElementById('bar');
  ctx = cv.getContext('2d');
  var grd=ctx.createLinearGradient(0,0,200,0);
  grd.addColorStop(0,"#ababab");
  grd.addColorStop(1,background);
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,200,10);
  log ("");
}

function listPorts() {
  var popUpDiv = document.getElementById('popUpDiv');
  var selectBox = document.getElementById('popupSelect');
  selectBox.length = 0;
  selectBox.add(new Option(window[language].select, window[language].select));
  popUpDiv.style.display = 'block';

  selectBox.onchange = function() {
    popUpDiv.style.display = 'none';
    var serialPort = selectBox[selectBox.selectedIndex].value;
    openPort(serialPort);
  }

  var onGetPorts = function(ports) {
    for (var i = 0; i < ports.length; i++) {
      selectBox.add(new Option(ports[i],ports[i]));
    }
  }
  chrome.serial.getPorts(onGetPorts);
}

function openPort(port){
  var onOpen = function(connectionInfo) {
    if (!connectionInfo || connectionInfo.connectionId == -1) {
      log(window[language].connerror);
      return;
    }
    connectionId = connectionInfo.connectionId;
    document.querySelector('#port').innerHTML = window[language].connected +"<b>"+ port +"</b>";
    document.querySelector('#disconnect').disabled = false;
  }
  chrome.serial.open(port, {bitrate: 9600}, onOpen);
}

function closePort() {
  if (connectionId == -1) {
    log(window[language].notconn);
    return;
  }

  var onDisconnect = function(connectionInfo) {
    connectionId = -1;
    document.querySelector('#port').innerHTML = "";
    document.querySelector('#disconnect').disabled = true;
    log("");
    listPorts();
  }
  chrome.serial.close(connectionId, onDisconnect);
}

function sendData(str){
  showBar(str);
  chrome.serial.write(connectionId, str2ab(str), function(){});
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function startRec() {
  chrome.experimental.speechInput.onError.addListener(function(error) {
    document.querySelector('#voice').innerHTML = window[language].voice;
    if(error.code == 'noResults')
      log(window[language].what);
    else
      log(window[language].error + error.code);
  });

  chrome.experimental.speechInput.onResult.addListener(function(result) {
    var result = result.hypotheses[0].utterance;
    console.log(result);
    document.querySelector('#voice').innerHTML = window[language].voice;

    switch (result.toLowerCase()){
    case window[language].words.red:
      sendData('r');
      break;
    case window[language].words.green:
      sendData('g');
      break;
    case window[language].words.blue:
      sendData('b');
      break;
    case window[language].words.yellow:
      sendData('y');
      break;
    case window[language].words.cyan:
      sendData('c');
      break;
    case window[language].words.magenta:
      sendData('m');
      break;
    case window[language].words.white:
      sendData('w');
      break;
    case window[language].words.shut:
      sendData('n');
      break;
    default:
      log(window[language].unknown +'<b>'+ result + '</b><br><span class="hint--top hint--rounded" data-hint="'+replacer(window[language].words)+'">' + window[language].listofcolors);
      break;
    }
  });

  chrome.experimental.speechInput.isRecording(function(recording) {
    if (!recording) {
      chrome.experimental.speechInput.start({'language': language }, function() {
        log(window[language].say);
      });
    } else {
      chrome.experimental.speechInput.stop(function() { 
        log("");
        document.querySelector('#voice').innerHTML = window[language].voice;
      });
    }
  });
}

function replacer(words) {
    result = "";
    for (var value in words)
      result += words[value][0].toUpperCase() + words[value].slice(1) + ", ";
    return result.slice(0, -2);
}

function localize () {
  document.querySelector('#disconnect').innerHTML = window[language].disconnect;
  document.querySelector('#voice').innerHTML = window[language].voice;
  document.querySelector('#red').innerHTML = window[language].red;
  document.querySelector('#green').innerHTML = window[language].green;
  document.querySelector('#blue').innerHTML = window[language].blue;
}

document.querySelector('#disconnect').addEventListener('click', function() {
  closePort();
});

document.querySelector('#voice').addEventListener('click', function() {
  startRec();
  this.innerHTML = 'Stop';
});

document.querySelector('#red').addEventListener('click', function() {
  sendData('r');
});

document.querySelector('#green').addEventListener('click', function() {
  sendData('g');
});

document.querySelector('#blue').addEventListener('click', function() {
  sendData('b');
});

document.querySelector('#language').addEventListener('change', function() {
  language = this[this.selectedIndex].value;
  log("");
  localize();
});

localize();
listPorts();
