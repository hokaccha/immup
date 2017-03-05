#!/bin/bash

set -ex

rm -rf lib
babel src --out-dir lib --source-maps
find ./src -name '*.js' | while read filepath; do cp $filepath `echo $filepath | sed 's/\\/src\\//\\/lib\\//g'`.flow; done;
