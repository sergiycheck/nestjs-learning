#!/bin/sh
curl -X POST \
  -F 'firstName=f2' \
  -F 'lastName=l2' \
  -F 'file[]=@./cat1.jpg' \
  -F 'file[]=@./cat2.webp' \
   http://localhost:3000/users/ | json_pp