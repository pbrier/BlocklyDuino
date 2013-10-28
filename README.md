### Welcome to BlocklyMBED.
BlocklyMBed is a a web-based visual programming editor for [Mbed](http://www.mbed.org/).

BlocklyMbed is based on [Blockly](http://code.google.com/p/blockly/), the web-based, graphical programming editor 
and [BlocklyDuino](https://github.com/gasolin/BlocklyDuino). 
BlocklyMBED Provides static type language blocks and code generators for mbed programming.


[BlocklyDuino has a Google+ Page](https://plus.google.com/111979846292233941175).

### Features

* Programming MBED with visually drag and drop code blocks
* Generate fully compatible mbed source code
* Compile+link the source and provide a binary for download
* Load different on-site examples with url parameters

### Demo

BlocklyMbed is a web tool. You can give it a try at
[Web](http://compiler.kekbot.org) to see the working BlocklyMbed.

### Run locally on your web browser

If you want to install it locally. Get code from github and open blockly/demos/blocklyduino/index.html in your browser.

The preffered way is to put the BlocklyDuino/web folder into a web server and open the url like localhost/public/blockly/demos/blocklyduino/index.html for use.


### Setting up the online compiler

You need a GCC_ARM compiler, mbed library sources installed. [See here](https://github.com/mbedmicro)
Next: configure the paths to your compiler and www folder, in the files compiler/compile.cmd and compiler/compile.py
You also need mod_python setup in Apache. See the compiler/blocklyserver.apache.conf file for an example of such a configuration.
Modyfy the file to set the correct path to the location of your compiler.py script, and install the apache configuration file
 in the appropriate apache directory and restart your server.


### Usage (3 Step, not using the compiler function)

1. Open browser to BlocklyDuino, Drag and Drop blocks to make your program. 
2. Select 'MBED' tab to copy source code to the MBED online compiler, or local file 
3. Compile the code with your local or online compiler and copy the resulting binary to the MBED / LPC hardware

### Usage (2 Step, Using the compiler)

1. Open browser to BlocklyDuino, Drag and Drop blocks to make your program. 
3. Press the "Compile" button and copy the resulting binary to the MBED / LPC hardware

Note: directly saving on your bare LPC hardware may not work directly under Mac/Linux. You may have to use "dd" with the correct options.

  dd if=firmware.bin of=/media/pbrier/CRP\ DISABLD/firmware.bin conv=nocreat,notrunc

### ChangeLog

Check changelog [here](https://github.com/gasolin/BlocklyDuino/blob/master/CHANGELOG.txt)

### Authors and Contributors
Fred Lin (@gasolin) Made the original BlocklyDuino
Peter Brier & Anton Smeenk added the MBED and compiler functions

Thanks Neil Fraser, Q.Neutron from Blockly http://code.google.com/p/blockly/
Thanks Arduino and Seeeduino guys for Arduino and Grove blocks.

The project is also inspired by arduiblock https://github.com/taweili/ardublock and modkit http://www.modk.it/

### License

Copyright (C) 2013 blockly@pbrier.nl
Copyright (C) 2012 Fred Lin gasolin+blockly@gmail.com

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
