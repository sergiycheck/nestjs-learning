const { InvokeCommand } = require('@aws-sdk/client-lambda');
const { lambdaClient } = require('./libs/lambdaClient');
const { LAMBDA_FUNC_NAME } = require('./libs/shared-consts');

const params = {
  // The name of the AWS Lambda function.
  FunctionName: LAMBDA_FUNC_NAME,
  InvocationType: 'RequestResponse',
  LogType: 'None',
};

// Call the Lambda function.
const createTable = async () => {
  try {
    const data = await lambdaClient.send(new InvokeCommand(params));
    console.log('Table Created', data);
    document.getElementById('message').innerHTML = 'Success, table created';
  } catch (err) {
    console.log('Error', err);
  }
};

function component() {
  const element = document.createElement('button');
  element.innerText = 'Create a Table!';

  element.onclick = createTable;

  return element;
}

document.body.appendChild(component());
