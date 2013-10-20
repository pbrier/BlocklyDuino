/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Mbed blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

//To support syntax defined in http://arduino.cc/en/Reference/HomePage

//define blocks
if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.base_delay = {
  category: 'Control',
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", Number)
        .appendTitle("Delay")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};

Blockly.Language.base_map = {
  category: 'Math',
  helpUrl: 'http://arduino.cc/en/Reference/map',
  init: function() {
    this.setColour(230);
    this.appendValueInput("NUM", Number)
        .appendTitle("Map ")
        .setCheck(Number);
    this.appendValueInput("DMAX", Number)
        .appendTitle("value to [0-")
        .setCheck(Number);
    this.appendDummyInput("")
	      .appendTitle("]");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Re-maps a number from [0-1024] to another.');
  }
};

Blockly.Language.inout_buildin_led = {
   category: 'In/Out',
   helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
   init: function() {
     this.setColour(190);
     this.appendDummyInput("")
	       .appendTitle("Build-in LED Stat")
	       .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setTooltip('light or off the build-in LED');
   }
};

Blockly.Language.inout_digital_write = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendTitle("DigitalWrite PIN#")
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle("Stat")
      	.appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Language.inout_digital_write_pin = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendTitle("DigitalWrite");
    this.appendValueInput("PIN", Number)
        .setCheck(Number)
        .appendTitle("PIN#");
    this.appendValueInput("STAT", Number)
        //.setCheck(Number)
        .appendTitle("Stat");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Language.inout_digital_read = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendTitle("DigitalRead PIN#")
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Language.inout_analog_write = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("AnalogWrite PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.appendValueInput("NUM", Number)
        .appendTitle("value")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Language.inout_analog_read = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("AnalogRead PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Language.inout_highlow = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/Constants',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};

//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Language.servo_move = {
  category: 'Servo',
  helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Servo")
        .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/a991.jpg", 64, 64))
        .appendTitle("PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Degree (0~180)");
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Delay");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('move between 0~180 degree');
  }
};

Blockly.Language.servo_read_degrees = {
  category: 'Servo',
  helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Servo")
        .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/a991.jpg", 64, 64))
        .appendTitle("PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Read Degrees")
    this.setOutput(true, Number);
    this.setTooltip('return that degree with the last servo move.');
  }
};

Blockly.Language.serial_print = {
  category: 'In/Out',
  helpUrl: 'http://www.arduino.cc/en/Serial/Print',
  init: function() {
    this.setColour(230);
    this.appendValueInput("CONTENT", String)
        .appendTitle("Serial Print");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Prints data to the console/serial port as human-readable ASCII text.');
  }
};

// define generators
Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.base_delay = function() {
  var delay_time = Blockly.Mbed.valueToCode(this, 'DELAY_TIME', Blockly.Mbed.ORDER_ATOMIC) || '1000'
  delay_time = delay_time.replace('(','').replace(')','');
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Mbed.base_map = function() {
  var value_num = Blockly.Mbed.valueToCode(this, 'NUM', Blockly.Mbed.ORDER_NONE);
  var value_dmax = Blockly.Mbed.valueToCode(this, 'DMAX', Blockly.Mbed.ORDER_ATOMIC);
  //value_num = value_num.replace('(','').replace(')','');
  value_dmax = value_dmax.replace('(','').replace(')','');
  var code = 'map('+value_num+', 0, 1024, 0, '+value_dmax+')';
  return [code, Blockly.Mbed.ORDER_NONE];
};

Blockly.Mbed.inout_buildin_led = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Mbed.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(13,'+dropdown_stat+');\n'
  return code;
};

Blockly.Mbed.inout_digital_write = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Mbed.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Mbed.inout_digital_write_pin = function() {
  var dropdown_pin = Blockly.Mbed.valueToCode(this, 'PIN', Blockly.Mbed.ORDER_NONE) || 0;
  var dropdown_stat = Blockly.Mbed.valueToCode(this, 'STAT', Blockly.Mbed.ORDER_ATOMIC) || 0;
  // Blockly.Mbed.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Mbed.inout_digital_read = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Mbed.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.inout_analog_write = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //var dropdown_stat = this.getTitleValue('STAT');
  var value_num = Blockly.Mbed.valueToCode(this, 'NUM', Blockly.Mbed.ORDER_ATOMIC);
  value_num = value_num.replace('(','').replace(')','');
  //Blockly.Mbed.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';
  return code;
};

Blockly.Mbed.inout_analog_read = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Mbed.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.inout_highlow = function() {
  // Boolean values HIGH and LOW.
  var code = (this.getTitleValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

/*
//servo
#include <Servo.h>

Servo servo_11;

void setup() { 
  servo_11.attach(11);
}

void loop() { 
servo_11.write(0);
delay(2000);

servo_11.write(150); //0~180
delay(2000);
}
*/
Blockly.Mbed.servo_move = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_degree = Blockly.Mbed.valueToCode(this, 'DEGREE', Blockly.Mbed.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Mbed.valueToCode(this, 'DELAY_TIME', Blockly.Mbed.ORDER_ATOMIC) || '1000'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Mbed.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Mbed.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Mbed.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Mbed.servo_read_degrees = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  
  Blockly.Mbed.definitions_['define_servo'] = '#include &lt;Servo.h&gt;\n';
  Blockly.Mbed.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Mbed.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return code;
};

Blockly.Mbed.serial_print = function() {
  var content = Blockly.Mbed.valueToCode(this, 'CONTENT', Blockly.Mbed.ORDER_ATOMIC) || '0'
  //content = content.replace('(','').replace(')','');
  
  Blockly.Mbed.setups_['setup_serial_'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');\n';
  
  var code = 'Serial.print('+content+');\nSerial.print(\'\\t\');\n';
  return code;
};
