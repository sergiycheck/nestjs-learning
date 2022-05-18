#!/bin/sh
curl -X POST -F 'name=something' -F 'file=@./sample.txt' http://localhost:3000/file/upload | json_pp