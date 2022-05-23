#!/bin/sh
curl -X POST -F 'name=info about cat images' \
  -F 'image=@./cat1.jpg' \
  -F 'image=@./cat2.webp' \
  -F 'image=@./cat3.jpeg' \
   http://localhost:3000/store-locally/multiple-images/ | json_pp