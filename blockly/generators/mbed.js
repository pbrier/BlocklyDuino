/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @author peter@pbrier.nl (Peter Brier)
 * based on sources from gasolin@gmail.com (Fred Lin)
 */
'use strict';

Blockly.Mbed = Blockly.Generator.get('Mbed');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
if (!Blockly.Mbed.RESERVED_WORDS_) {
  Blockly.Mbed.RESERVED_WORDS_ = '';
}

Blockly.Mbed.RESERVED_WORDS_ +=
    // http://mbed.cc/en/Reference/HomePage
'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
;

/**
 * Order of operation ENUMs.
 * 
 */
Blockly.Mbed.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Mbed.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Mbed.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Mbed.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Mbed.ORDER_ADDITIVE = 4;       // + -
Blockly.Mbed.ORDER_SHIFT = 5;          // << >>
Blockly.Mbed.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Mbed.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Mbed.ORDER_BITWISE_AND = 8;    // &
Blockly.Mbed.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Mbed.ORDER_BITWISE_OR = 10;    // |
Blockly.Mbed.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Mbed.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Mbed.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Mbed.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Mbed.ORDER_NONE = 99;          // (...)

/*
 * Mbed Board profiles
 *
 */
var profile = {
	mbed: {
		description: "Mbed standard-compatible board",
		digital : [ ["LED1", "LED1"], ["LED2", "LED2"], ["LED3", "LED3"], ["LED4", "LED4"], ["LED5", "LED5"], ["LED6", "LED6"], ["LED7", "LED7"], ["BUTTON", "BUTTON" ], ["SERVO1", "SERVO1"], ["SERVO2", "SERVO2"] ],
		analog : [ ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    servo : [ ["SERVO1", "SERVO1"], ["SERVO2", "SERVO2"] ],
    input : [ ["BUTTON", "BUTTON" ] ],
    output : [ ["LED1", "LED1"], ["LED2", "LED2"], ["LED3", "LED3"], ["LED4", "LED4"], ["LED5", "LED5"], ["LED6", "LED6"], ["LED7", "LED7"] ],
		
        serial : 9600,
	},
	mbed_mega:{
		description: "Mbed Mega-compatible board",
		//53 digital
		//15 analog
	},
}
//set default profile to mbed standard-compatible board
profile["default"] = profile["mbed"];
//alert(profile.default.digital[0]);

/**
 * Initialise the database of variable names.
 */
Blockly.Mbed.init = function() {
  // Create a dictionary of definitions to be printed before setups.
  Blockly.Mbed.definitions_ = {};
  // Create a dictionary of setups to be printed before the code.
  Blockly.Mbed.setups_ = {};
  
  if (Blockly.Variables) {
    if (!Blockly.Mbed.variableDB_) {
      Blockly.Mbed.variableDB_ =
          new Blockly.Names(Blockly.Mbed.RESERVED_WORDS_);
    } else {
      Blockly.Mbed.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = 'int ' +
          Blockly.Mbed.variableDB_.getDistinctName(variables[x],
          Blockly.Variables.NAME_TYPE) + ';\n';
    }
    Blockly.Mbed.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Mbed.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n}';

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Mbed.definitions_) {
    var def = Blockly.Mbed.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  
  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Mbed.setups_) {
    setups.push(Blockly.Mbed.setups_[name]);
  }
  
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n') + '\nvoid setup() \n{\n  '+setups.join('\n  ') + '\n}'+ '\n\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Mbed.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Mbed string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Mbed string.
 * @private
 */
Blockly.Mbed.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Mbed from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Mbed code created for this block.
 * @return {string} Mbed code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.Mbed.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Generator.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Generator.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Generator.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
