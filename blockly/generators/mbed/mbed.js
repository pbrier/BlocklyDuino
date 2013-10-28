/**
 * Visual Blocks Language
 *
 * Copyright 2013 Peter Brier
 * Based upon BlocklyDuino (c) 2012 Fred Lin.
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
 * @fileoverview Helper functions for generating MBED blocks.
 * @author peter@pbrier.com (Peter Brier)
 */
'use strict';

//To support syntax defined in http://mbed.org

//define blocks
if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.base_wait = {
  category: 'Control',
  helpUrl: 'http://mbed.org/handbook/Wait',
  init: function() {
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", Number)
        .appendTitle("Wait")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Wait specific time');
  }
};

Blockly.Language.inout_pinName = {
  category: 'In/Out',
  helpUrl: '',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Pin name');
  }
};


Blockly.Language.inout_DigitalIn = {
  category: 'In/Out',
  helpUrl: 'http://mbed.org/handbook/DigitalIn',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendTitle("DigitalIn PIN#")
	      .appendTitle(new Blockly.FieldDropdown(profile.default.input), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('Read the state of a pin (HIGH/LOW)');
  }
};

Blockly.Language.inout_DigitalOut = {
  category: 'In/Out',
  helpUrl: 'http://mbed.org/handbook/DigitalOut',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendTitle("DigitalOut PIN#")
	      .appendTitle(new Blockly.FieldDropdown(profile.default.output), "PIN")
      	.appendTitle("Stat")
      	.appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Language.fanbot_face = {
  category: 'In/Out',
  helpUrl: 'http://kekbot.org',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle(" ")
      	.appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED1" )
        .appendTitle("                 ")
        .appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED2" )
        .appendTitle(" ");
    this.appendDummyInput("")
        .appendTitle("        ")
        .setAlign(Blockly.ALIGN_CENTER)
        .appendTitle(new Blockly.FieldDropdown([["LEFT", "LEFT"], [" MID ", "MID"], ["RIGHT", "RIGHT"]]), "POS")
        .setAlign(Blockly.ALIGN_CENTER);
    this.appendDummyInput("");
    this.appendDummyInput("")
        .appendTitle("   ") 
      	.appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED3" )
        .appendTitle("              ") 
        .appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED7" ) 
        .appendTitle("    ");
    this.appendDummyInput("")
        .appendTitle("      ") 
        .appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED4" ) 
        .appendTitle(" ") 
        .appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED5" )
        .appendTitle(" ") 
        .appendTitle( new Blockly.FieldCheckbox('TRUE'), "LED6" )
        .appendTitle("  ");
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write face leds');
  }
};


//servo block, using PWMOUT
Blockly.Language.servo = {
  category: 'Servo',
  helpUrl: 'http://mbed.org/handbook/PwmOut',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Servo")
        .appendTitle("PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.servo), "PIN")
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Degree (0~180)");
    this.appendValueInput("WAIT_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Wait");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('move between 0~180 degree');
  }
};

// define generators
Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.inout_pinName = function() {
  // Returns pin name (actually an int number)
  var code = this.getTitleValue('PIN');
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.base_wait = function() {
  var delay_time = Blockly.Mbed.valueToCode(this, 'DELAY_TIME', Blockly.Mbed.ORDER_ATOMIC) || '1000'
  delay_time = delay_time.replace('(','').replace(')','');
  var code = 'wait_ms(' + delay_time + ');\n';
  return code;
};


Blockly.Mbed.inout_DigitalIn = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Mbed.definitions_['var_DigitalIn'+dropdown_pin] = 'DigitalIn DigitalIn_'+dropdown_pin+'('+dropdown_pin+');\n';
  Blockly.Mbed.setups_['setup_DigitalIn_'+dropdown_pin] = 'DigitalIn_'+dropdown_pin+'.mode(PullUp);\n';
  var code = 'DigitalIn_'+dropdown_pin
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.inout_DigitalOut = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Mbed.definitions_['var_DigitalOut'+dropdown_pin] = 'DigitalOut DigitalOut_'+dropdown_pin+'('+dropdown_pin+');\n';
  var code = 'DigitalOut_'+dropdown_pin+'='+dropdown_stat+';\n'
  return code;
};

Blockly.Mbed.fanbot_face = function() {
  var led_stat = 0;
  var value_degree = 90;
  var delay_time = 300;
  if ( this.getTitleValue('POS') == 'LEFT') value_degree = 70;
  if ( this.getTitleValue('POS') == 'MID') value_degree = 90;
  if ( this.getTitleValue('POS') == 'RIGHT') value_degree = 110;
  if ( this.getTitleValue('LED1') == 'TRUE') led_stat += 1;
  if ( this.getTitleValue('LED2') == 'TRUE') led_stat += 2;
  if ( this.getTitleValue('LED3') == 'TRUE') led_stat += 4;
  if ( this.getTitleValue('LED4') == 'TRUE') led_stat += 8;
  if ( this.getTitleValue('LED5') == 'TRUE') led_stat += 16;
  if ( this.getTitleValue('LED6') == 'TRUE') led_stat += 32;
  if ( this.getTitleValue('LED7') == 'TRUE') led_stat += 64;
  Blockly.Mbed.definitions_['fanbot_servo'] = 'PwmOut fanbot_servo(SERVO1);\n';
  Blockly.Mbed.definitions_['fanbot_leds'] = 'BusOut fanbot_leds(P1_19, P1_25, P0_8, P0_9, P0_22, P0_13, P0_14); // Face Leds;\n';
  Blockly.Mbed.setups_['fanbot_servo'] = 'fanbot_servo.period(0.020);\n';
  var code = 'fanbot_leds =' + led_stat + ';\n' +
  'fanbot_servo.pulsewidth(0.0005 + (' + value_degree + '/90000.0));\n' + 'wait_ms(' + delay_time + ');\n';
  return code;
};

/*
servo, uses PwmOut() object

PwmOut servo(p21);
 servo.period(0.020); 
  servo.pulsewidth(0.001 + offset);
}
*/
Blockly.Mbed.servo = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_degree = Blockly.Mbed.valueToCode(this, 'DEGREE', Blockly.Mbed.ORDER_ATOMIC) || '90';
  var delay_time = Blockly.Mbed.valueToCode(this, 'WAIT_TIME', Blockly.Mbed.ORDER_ATOMIC) || '1000'
  
  Blockly.Mbed.definitions_['var_servo'+dropdown_pin] = 'PwmOut servo_'+dropdown_pin+'(' + dropdown_pin + ');\n';
  Blockly.Mbed.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.period(0.020);\n';
  
  var code = 'servo_'+dropdown_pin+'.pulsewidth(0.0005 + (' + value_degree + '/90000.0));\n' + 'wait_ms(' + delay_time + ');\n';
  return code;
};
