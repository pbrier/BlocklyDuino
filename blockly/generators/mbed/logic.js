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
 * @fileoverview Generating Mbed for logic blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

Blockly.Mbed = Blockly.Generator.get('Mbed');

Blockly.Mbed.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.Mbed.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Mbed.ORDER_EQUALITY : Blockly.Mbed.ORDER_RELATIONAL;
  var argument0 = Blockly.Mbed.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Mbed.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Mbed.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Mbed.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Mbed.ORDER_LOGICAL_AND :
      Blockly.Mbed.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Mbed.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.Mbed.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Mbed.logic_negate = function() {
  // Negation.
  var order = Blockly.Mbed.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Mbed.valueToCode(this, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Mbed.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Mbed.ORDER_ATOMIC];
};

Blockly.Mbed.logic_null = function() {
  var code = 'NULL';
  return [code ,Blockly.Mbed.ORDER_ATOMIC];
};
