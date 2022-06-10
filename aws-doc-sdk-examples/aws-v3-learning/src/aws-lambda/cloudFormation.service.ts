import {
  CloudFormationClient,
  DescribeStackResourceCommand,
  CreateStackCommand,
  DescribeStacksCommand,
  DescribeStackResourcesCommand,
} from '@aws-sdk/client-cloudformation';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudFormationService {
  cloudformation: CloudFormationClient;

  private IAM_USER_KEY_ID: string;
  private IAM_USER_SECRET_ACCESS_KEY: string;

  constructor(private configService: ConfigService) {
    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get(
      'IAM_USER_SECRET_ACCESS_KEY',
    );

    this.cloudformation = new CloudFormationClient({
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }

  async describeStack(stackName: string) {
    const describeStackResult = await this.cloudformation.send(
      new DescribeStacksCommand({ StackName: stackName }),
    );

    const partialResults = [];
    const [stack] = describeStackResult.Stacks;

    const successfulStackStatus = 'CREATE_COMPLETE';

    const amPolicyResourceType = 'AWS::IAM::Policy';
    const bucketResourceType = 'AWS::S3::Bucket';
    const amRoleResourceType = 'AWS::IAM::Role';

    if (stack.StackStatus === successfulStackStatus) {
      const descStackResult = await this.cloudformation.send(
        new DescribeStackResourcesCommand({ StackName: stackName }),
      );
      partialResults.push(descStackResult);

      descStackResult.StackResources.forEach((resource) => {
        const resourceType = resource.ResourceType;

        if (resourceType === amPolicyResourceType) {
          const IDENTITY_POOL_ID = resource.LogicalResourceId;
          partialResults.push({
            'IDENTITY_POOL_ID:': IDENTITY_POOL_ID,
            stack_name: resource.StackName,
          });
        } else if (resourceType === bucketResourceType) {
          const BUCKET_NAME = resource.PhysicalResourceId;
          partialResults.push({
            'BUCKET_NAME:': BUCKET_NAME,
            stack_name: resource.StackName,
          });
        } else if (resourceType === amRoleResourceType) {
          const IAM_ROLE = resource.StackId;
          partialResults.push({ 'IAM_ROLE:': IAM_ROLE, stack_name: resource.StackName });
        }
      });
    } else {
      partialResults.push({
        message: 'Stack not ready yet. Try again in a few minutes.',
      });
    }

    return partialResults;
  }
}
