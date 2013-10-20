/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Generating Mbed for variable blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.Mbed.variableDB_.getName(this.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Mbed.statementToCode(this, 'STACK');
  if (Blockly.Mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.Mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.Mbed.valueToCode(this, 'RETURN',
      Blockly.Mbed.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? 'Dynamic' : 'void';
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Mbed.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
  code = Blockly.Mbed.scrub_(this, code);
  Blockly.Mbed.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Mbed.procedures_defnoreturn = Blockly.Mbed.procedures_defreturn;

Blockly.Mbed.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.Mbed.variableDB_.getName(this.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Mbed.valueToCode(this, 'ARG' + x,
        Blockly.Mbed.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.Mbed.variableDB_.getName(this.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Mbed.valueToCode(this, 'ARG' + x,
        Blockly.Mbed.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Mbed.procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.Mbed.valueToCode(this, 'CONDITION',
      Blockly.Mbed.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (this.hasReturnValue_) {
    var value = Blockly.Mbed.valueToCode(this, 'VALUE',
        Blockly.Mbed.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
