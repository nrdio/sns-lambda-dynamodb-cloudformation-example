#!/usr/bin/env bash
aws cloudformation package --template-file cloudformation-template.yaml --s3-bucket <your-bucket-name> --output-template-file packaged-template.yaml
aws cloudformation deploy --template-file packaged-template.yaml --stack-name <your-stack-name> --capabilities CAPABILITY_IAM