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
 * @fileoverview Generating Mbed for text blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.text = function() {
  // Text value.
  var code = Blockly.Mbed.quote_(this.getTitleValue('TEXT'));
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.text_join = function() {
  // Create a string made up of any number of elements of any type.
  var code;
  if (this.itemCount_ == 0) {
    return ['\'\'', Blockly.Mbed.ORDER_ATOMIC];
  } else if (this.itemCount_ == 1) {
    var argument0 = Blockly.Mbed.valueToCode(this, 'ADD0',
        Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0;
    return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
  } else {
    code = [];
    code[0] = (Blockly.Mbed.valueToCode(this, 'ADD0',
        Blockly.Mbed.ORDER_NONE) || '\'\'');
    for (var n = 1; n < this.itemCount_; n++) {
      code[n] = '+' + (Blockly.Mbed.valueToCode(this, 'ADD' + n,
          Blockly.Mbed.ORDER_NONE) || '\'\'');
    }
    code = code.join('');
    return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Mbed.text_append = function() {
  // Append to a variable in place.
  var varName = Blockly.Mbed.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Mbed.valueToCode(this, 'TEXT',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  return varName + ' = new StringBuffer(' + varName +
      ').add(' + argument0 + ').toString();\n';
};

Blockly.Mbed.text_length = function() {
  // String length.
  var argument0 = Blockly.Mbed.valueToCode(this, 'VALUE',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + '.length', Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.Mbed.valueToCode(this, 'VALUE',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + '.isEmpty()', Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_endString = function() {
  // Return a leading or trailing substring.
  var first = this.getTitleValue('END') == 'FIRST';
  var code;
  if (first) {
    var argument0 = Blockly.Mbed.valueToCode(this, 'NUM',
        Blockly.Mbed.ORDER_NONE) || '1';
    var argument1 = Blockly.Mbed.valueToCode(this, 'TEXT',
        Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument1 + '.substring(0, ' + argument0 + ')';
  } else {
    if (!Blockly.Mbed.definitions_['text_tailString']) {
      var functionName = Blockly.Mbed.variableDB_.getDistinctName(
          'text_tailString', Blockly.Generator.NAME_TYPE);
      Blockly.Mbed.text_endString.text_tailString = functionName;
      var func = [];
      func.push('String ' + functionName + '(n, myString) {');
      func.push('  // Return a trailing substring of n characters.');
      func.push('  return myString.substring(myString.length - n);');
      func.push('}');
      Blockly.Mbed.definitions_['text_tailString'] = func.join('\n');
    }
    var argument0 = Blockly.Mbed.valueToCode(this, 'NUM',
        Blockly.Mbed.ORDER_NONE) || '1';
    var argument1 = Blockly.Mbed.valueToCode(this, 'TEXT',
        Blockly.Mbed.ORDER_NONE) || '\'\'';
    code = Blockly.Mbed.text_endString.text_tailString +
        '(' + argument0 + ', ' + argument1 + ')';
  }
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_indexOf = function() {
  // Search the text for a substring.
  var operator = this.getTitleValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.Mbed.valueToCode(this, 'FIND',
      Blockly.Mbed.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Mbed.valueToCode(this, 'VALUE',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_charAt = function() {
  // Get letter at index.
  var argument0 = Blockly.Mbed.valueToCode(this, 'AT',
      Blockly.Mbed.ORDER_NONE) || '1';
  var argument1 = Blockly.Mbed.valueToCode(this, 'VALUE',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  // Blockly uses one-based arrays.
  if (argument0.match(/^-?\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code = argument1 + '[' + argument0 + ']';
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_changeCase = function() {
  // Change capitalization.
  var mode = this.getTitleValue('CASE');
  var operator = Blockly.Mbed.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into Dart.
    var argument0 = Blockly.Mbed.valueToCode(this, 'TEXT',
        Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0 + operator;
  } else {
    if (!Blockly.Mbed.definitions_['toTitleCase']) {
      // Title case is not a native Dart function.  Define one.
      var functionName = Blockly.Mbed.variableDB_.getDistinctName(
          'text_toTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.Mbed.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('String ' + functionName + '(str) {');
      func.push('  RegExp exp = const RegExp(r\'\\b\');');
      func.push('  List<String> list = str.split(exp);');
      func.push('  String title = \'\';');
      func.push('  for (String part in list) {');
      func.push('    if (part.length > 0) {');
      func.push('      title.add(part[0].toUpperCase());');
      func.push('      if (part.length > 0) {');
      func.push('        title.add(part.substring(1).toLowerCase());');
      func.push('      }');
      func.push('    }');
      func.push('  }');
      func.push('  return title.toString();');
      func.push('}');
      Blockly.Mbed.definitions_['toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.Mbed.valueToCode(this, 'TEXT',
        Blockly.Mbed.ORDER_NONE) || '\'\'';
    code = Blockly.Mbed.text_changeCase.toTitleCase + '(' + argument0 + ')';
  }
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_changeCase.OPERATORS = {
  UPPERCASE: '.toUpperCase()',
  LOWERCASE: '.toLowerCase()',
  TITLECASE: null
};

Blockly.Mbed.text_trim = function() {
  // Trim spaces.
  var mode = this.getTitleValue('MODE');
  var operator = Blockly.Mbed.text_trim.OPERATORS[mode];
  var argument0 = Blockly.Mbed.valueToCode(this, 'TEXT',
      Blockly.Mbed.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + operator, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};

Blockly.Mbed.text_trim.OPERATORS = {
  LEFT: '.replaceFirst(new RegExp(r\'^\\s+\'), \'\')',
  RIGHT: '.replaceFirst(new RegExp(r\'\\s+$\'), \'\')',
  BOTH: '.trim()'
};

Blockly.Mbed.text_print = function() {
  // Print statement.
  var argument0 = Blockly.Mbed.valueToCode(this, 'TEXT',
      Blockly.Mbed.ORDER_NONE) || '\'\'';
  return 'print(' + argument0 + ');\n';
};

Blockly.Mbed.text_prompt = function() {
  // Prompt function.
  Blockly.Mbed.definitions_['import_dart_html'] = '#import(\'dart:html\');';
  var msg = Blockly.Mbed.quote_(this.getTitleValue('TEXT'));
  var code = 'window.prompt(' + msg + ', \'\')';
  var toNumber = this.getTitleValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'Math.parseDouble(' + code + ')';
  }
  return [code, Blockly.Mbed.ORDER_UNARY_POSTFIX];
};
