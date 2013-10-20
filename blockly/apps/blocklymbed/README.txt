BlocklyDuino
=======================

Introduction
-----------------

BlocklyMbed is a derivative of BlocklyDuino
BlocklyDuino is based on blockly, the web-based, graphical programming editor. Provide language blocks and code generators for arduino programming.

BlocklyMbed implements an additional code generator for the MBED libraries.
In addition, it is able to compile the sourcecode and provide a binary download
that can be used on a MBED or LPC11U24 device. This is implemented for the
"fanbot" robot from kekbot.org.

* Blockly http://code.google.com/p/blockly/
* Arduino http://www.arduino.cc/
* Mbed http://www.mbed.org
* kekbot http://kekbot.org

Install
-----------------

BlocklyMbed is a web tool. You can give it a try at http://compiler.kekbot.org. 

If you want to install it locally. Checkout Blockly and BlocklyDuino from github.

$ git clone https://github.com/pbrier/BlocklyDuino.git

in addition you need the MBED libraries:

$ git clone https://github.com/mbedmicro/mbed

And a suitable ARM gcc compiler. See:
https://launchpad.net/gcc-arm-embedded

Unpack, install the compiler 

compile your mbed libraries See:
http://mbed.org/handbook/mbed-tools

Put blockly into a web server and open the url like localhost/public/blockly/apps/blocklymbed/index.html for use.

Usage (3 Step)
-----------------

1. Open browser to BlocklyDuino, Drag and Drop blocks to make a program. 
3. press 'compile' button to download the binary to your mbed or LPC device

Credit
-----------------

Fred Lin is the creator of BlocklyDuino.
Anton Smeenk and Peter Brier added the compile function and MBED blocks.

Thanks Neil Fraser, Q.Neutron from Blockly http://code.google.com/p/blockly/
Arduino and Seeeduino guys for Arduino and Grove blocks.

The project is inspired by arduiblock https://github.com/taweili/ardublock and modkit http://www.modk.it/

License
-----------------
Copyright (C) 2012 Fred Lin gasolin+arduino@gmail.com

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

