#!/bin/sh
aws cloudformation create-stack --stack-name lambda-example-stack --template-body file://$(pwd)/setup.yml --capabilities CAPABILITY_IAM
