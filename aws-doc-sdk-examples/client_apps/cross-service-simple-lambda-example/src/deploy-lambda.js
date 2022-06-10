const { CreateFunctionCommand } = require('@aws-sdk/client-lambda');
const { lambdaClient } = require('./libs/lambdaClient');
const {
  BUCKET_NAME,
  LAMBDA_ROLE_FROM_DESCRIBE_STACK,
  LAMBDA_FUNC_NAME,
} = require('./libs/shared-consts');

const params = {
  Code: {
    S3Bucket: BUCKET_NAME,
    S3Key: 'my-lambda-function.zip',
  },
  FunctionName: LAMBDA_FUNC_NAME,
  Handler: 'index.handler',
  Role: LAMBDA_ROLE_FROM_DESCRIBE_STACK, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
  Runtime: 'nodejs16.x',
  Description: 'Creates an Amazon DynamoDB table.',
};

const run = async () => {
  try {
    const data = await lambdaClient.send(new CreateFunctionCommand(params));
    console.log('Success', data); // successful response
  } catch (err) {
    console.log('Error', err); // an error occurred
  }
};
run();
