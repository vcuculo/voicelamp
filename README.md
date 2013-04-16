# Voice Lamp for Google Chrome

This application makes possible to interact with a lamp made with Arduino by using your voice and serial connection.

## Installation

### From source

    git clone git@github.com:vcuculo/voicelamp.git
  
In Chrome, go to `Wrench > Tools > Extensions > Developer Mode`
Click on `Load unpacked extension` and select voicelamp folder.

### From Chrome Web Store

   soon...

## Configuration

Enable the experimental API in your browser. You can do this in either of two ways:

1. Go to `chrome://flags`, find "Experimental Extension APIs", click its "Enable" link, and restart Chrome. From now on, unless you return to that page and disable experimental APIs, you'll be able to run extensions and apps that use experimental APIs.

2. Specify the `--enable-experimental-extension-apis` flag each time you launch the browser. On Windows, you can do this by modifying the properties of the shortcut that you use to launch Google Chrome. For example:

    path_to_chrome.exe --enable-experimental-extension-apis

More info about serial and experimental API:

http://developer.chrome.com/apps/experimental.html
http://developer.chrome.com/apps/serial.html
