const { LambdaClient } = require('@aws-sdk/client-lambda');
const {
  fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity');
const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');

const { REGION, IDENTITY_POOL_ID } = require('./shared-consts');

// Create an AWS Lambda client service object that initializes
//the Amazon Cognito credentials provider.

const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

module.exports = {
  lambdaClient,
};
