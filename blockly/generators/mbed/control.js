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
 * @fileoverview Generating Mbed for control blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Mbed.valueToCode(this, 'IF' + n,
      Blockly.Mbed.ORDER_NONE) || 'false';
  var branch = Blockly.Mbed.statementToCode(this, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Mbed.valueToCode(this, 'IF' + n,
      Blockly.Mbed.ORDER_NONE) || 'false';
    branch = Blockly.Mbed.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.Mbed.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '\n}';
  }
  return code + '\n';
};

Blockly.Mbed.controls_repeat = function() {
  // Repeat n times.
  var repeats = Number(this.getTitleValue('TIMES'));
  var branch = Blockly.Mbed.statementToCode(this, 'DO');
  if (Blockly.Mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.Mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var loopVar = Blockly.Mbed.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Mbed.controls_whileUntil = function() {
  // Do while/until loop.
  var argument0 = Blockly.Mbed.valueToCode(this, 'BOOL',
      Blockly.Mbed.ORDER_NONE) || 'false';
  var branch = Blockly.Mbed.statementToCode(this, 'DO');
  if (Blockly.Mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.Mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (this.getTitleValue('MODE') == 'UNTIL') {
    if (!argument0.match(/^\w+$/)) {
      argument0 = '(' + argument0 + ')';
    }
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Mbed.controls_for = function() {
  // For loop.
  var variable0 = Blockly.Mbed.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Mbed.valueToCode(this, 'FROM',
      Blockly.Mbed.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Mbed.valueToCode(this, 'TO',
      Blockly.Mbed.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Mbed.statementToCode(this, 'DO');
  if (Blockly.Mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.Mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0 + (up ? '++' : '--') + ') {\n' +
        branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.Mbed.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.Mbed.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 + ' += (' + startVar + ' <= ' + endVar +
            ') ? 1 : -1) {\n' +
        branch0 + '}\n';
  }
  return code;
};

Blockly.Mbed.controls_forEach = function() {
  // For each loop.
  var variable0 = Blockly.Mbed.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Mbed.valueToCode(this, 'LIST',
      Blockly.Mbed.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.Mbed.statementToCode(this, 'DO');
  if (Blockly.Mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.Mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code = 'for (var ' + variable0 + ' in  ' + argument0 + ') {\n' +
      branch + '}\n';
  return code;
};

Blockly.Mbed.controls_flow_statements = function() {
  // Flow statements: continue, break.
  switch (this.getTitleValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
