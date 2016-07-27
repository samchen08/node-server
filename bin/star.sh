#!/bin/sh

cd `dirname $0`
cd ..
basepath=$(pwd)

apppath=${basepath}/app

nohup node ${apppath} command > ${basepath}/logs/log.txt 2>&1 &

echo "app running..."


