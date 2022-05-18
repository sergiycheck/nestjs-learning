#!/bin/sh
curl -X POST -F 'name=something' -F 'file=@./video-w-sound.mp4' http://localhost:3000/file/upload-bigger | json_pp