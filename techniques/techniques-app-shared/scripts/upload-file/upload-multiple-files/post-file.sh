#!/bin/sh
curl -X POST -F 'name=info about cat images' -F 'image=@./cat1.jpg' -F 'image=@./cat2.webp' -F 'image=@./cat3.jpeg' http://localhost:3000/file/multiple-images/ | json_pp