#!/bin/bash

echo "========================================="
echo "= compiler.cmd "
echo "========================================="
DIR=$(dirname $1)
echo "Directory = ${DIR}"
echo "Compiling input file $1 and returning as $2"

export PATH=/opt/gcc4mbed/gcc-arm-none-eabi/bin:$PATH
cd ${DIR}
rm *.o *.d *.bin
dos2unix $1
cat /var/www/blockly/compiler/head.inc $1 > ${DIR}/firmware.cpp
python2.6 /opt/mbed/workspace_tools/make.py -p 1 -m LPC11U24 -t GCC_ARM --source=$DIR --build=$DIR --disk=$DIR/firmware.bin

echo "command done"

