# Example CloudFormation Template for creating a CloudFormation stack comprising of SNS topic, Subscription, Dynamodb table, Lambda persisting event in dynamodb table and IAM role

This [template](cloudformation-template.yaml) creates a CloudFormation stack comprising of -

   * SNS topic
   * Simple Node.js Lambda
   * Dynamodb Table
   * Simple Node.js Lambda persisting event into Dynamodb table  
   * Lambda SNS topic subscription
   * IAM Roles and Policies


This template is intended to jump start Lambda development by putting otherwise extensive and fragmented information together. 
Additional information is available at [Shift from Containers to Serverless Computing using AWS Lambda - Part 2](https://woodo.space/post/shift-from-containers-to-serverless-computing-using-aws-lambda-part-2/)

## How to run?

Prerequisite : [AWS account](https://aws.amazon.com/) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
   
Create a package by running following AWS CLI command

```
aws cloudformation package --template-file cloudformation-template.yaml --s3-bucket <your-bucket-name> 
    --output-template-file packaged-template.yaml
```

Create Stack using following command

```
aws cloudformation deploy --template-file packaged-template.yaml --stack-name <your-stack-name> --capabilities CAPABILITY_IAM
```
## Test

List stack resources using following command 

```
aws cloudformation list-stack-resources --stack-name <your-stack-name>
```

Please copy SNS topic(AWS::SNS::Topic) ARN (PhysicalResourceId) from list of resources. 

Now you can publish a message to SNS topic using following command. Lambda should persist the event in Dynamoddb table.

```
aws sns publish --topic-arn <your-sns-topic-arn> --message '{"name": "Foo", "iban": "NL38FRBK0292964727"}'
```


