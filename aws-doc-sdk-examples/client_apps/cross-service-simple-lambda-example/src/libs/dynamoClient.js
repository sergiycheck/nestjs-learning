const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');
const {
  fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { REGION, IDENTITY_POOL_ID } = require('./shared-consts');

// Create an Amazon DynamoDB service client object.
const dynamoClient = new DynamoDBClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

module.exports = {
  dynamoClient,
};
