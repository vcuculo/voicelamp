# Voice Lamp (Javascript + Arduino)

This application makes possible to interact with a lamp made with **Arduino** by using your voice and a serial connection.

It uses experimental APIs to create **serial communication** and to **record voice** using just **Javascript**.

More info about serial and experimental APIs:  
http://developer.chrome.com/apps/experimental.html  
http://developer.chrome.com/apps/serial.html

Currently it works only for **Italian** and **English** language, and supports the following vocal commands:  
**en** : red, green, blue, yellow, cyan, magenta, white, turn off  
**it** : rosso, verde, blu, giallo, ciano, magenta, bianco, spegni

## Installation

### From source

    git clone git@github.com:vcuculo/voicelamp.git
  
In Chrome, go to `Wrench > Tools > Extensions > Developer Mode`  
Click on `Load unpacked extension` and select voicelamp folder.

### From Chrome Web Store

   Soon...

## Configuration

Enable the experimental API in your browser. You can do this in either of two ways:

1. Go to `chrome://flags`, find "Experimental Extension APIs", click its "Enable" link, and restart Chrome. From now on, unless you return to that page and disable experimental APIs, you'll be able to run extensions and apps that use experimental APIs.

2. Specify the `--enable-experimental-extension-apis` flag each time you launch the browser. On Windows, you can do this by modifying the properties of the shortcut that you use to launch Google Chrome. For example:  
   `path_to_chrome.exe --enable-experimental-extension-apis`


## Arduino

### Schema 
* 3 RGB LEDs connected to PWM outputs

<img src="https://github.com/vcuculo/voicelamp/raw/master/sketch/voicelamp_schema.png" width="600px">

### Sketch

https://github.com/vcuculo/voicelamp/blob/master/sketch/lamp/lamp.pde

