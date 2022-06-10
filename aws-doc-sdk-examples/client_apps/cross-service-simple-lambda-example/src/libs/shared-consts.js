const REGION = 'eu-central-1';
const IDENTITY_POOL_ID = 'eu-central-1:e98722d3-a175-4267-b68f-070e9c9fca45'; // An Amazon Cognito Identity Pool ID.
const BUCKET_NAME = 'lambda-example-stack-mybucket160f8132-15zfmtw4n0lk4';
const LAMBDA_ROLE_FROM_DESCRIBE_STACK =
  'arn:aws:cloudformation:eu-central-1:581425740433:stack/lambda-example-stack/6dda3840-e8c2-11ec-8e3f-06b2f2834cfa';
const DYNAMODB_TABLE = 'test12table';
const LAMBDA_FUNC_NAME = 'createTableCrossServiceSimple';

module.exports = {
  REGION,
  IDENTITY_POOL_ID,
  BUCKET_NAME,
  LAMBDA_ROLE_FROM_DESCRIBE_STACK,
  DYNAMODB_TABLE,
  LAMBDA_FUNC_NAME,
};
