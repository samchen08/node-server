#!/bin/sh

cd `dirname $0`
cd ..
basepath=$(pwd)

ID=`ps -ef|grep ${basepath} |grep -v 'grep'|awk '{print $2}'`
for pid in $ID
do
    kill -9 $pid
    echo "kill ${basepath}/app pid:$pid"
done

echo "app stop success"