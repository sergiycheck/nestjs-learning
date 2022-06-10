'use strict';
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { dynamoClient } = require('../libs/dynamoClient');
const { DYNAMODB_TABLE } = require('../libs/shared-consts');

// Set the parameters.
const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'Season', //ATTRIBUTE_NAME_1
      AttributeType: 'N', //ATTRIBUTE_TYPE
    },
    {
      AttributeName: 'Episode', //ATTRIBUTE_NAME_2
      AttributeType: 'N', //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: 'Season', //ATTRIBUTE_NAME_1
      KeyType: 'HASH',
    },
    {
      AttributeName: 'Episode', //ATTRIBUTE_NAME_2
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: DYNAMODB_TABLE, //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

module.exports = handler = async (event, context, callback) => {
  try {
    const data = await dynamoClient.send(new CreateTableCommand(params));
    console.log('Table Created', data);
  } catch (err) {
    console.log('Error', err);
  }
};
