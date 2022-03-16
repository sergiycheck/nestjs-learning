import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlContextType } from '@nestjs/graphql';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      console.log('http host');
    } else if (host.getType() === 'rpc') {
      console.log('rpc host');
    } else if (host.getType() === 'ws') {
      console.log('ws host');
    } else if (host.getType<GqlContextType>() === 'graphql') {
      console.log('graphql host');
    }

    const [req, res, next] = host.getArgs();
    console.log(`req: ${typeof req}, res: ${typeof res}, next: ${typeof next}`);

    const request = host.getArgByIndex(0);
    const response = host.getArgByIndex(1);
    console.log(`request ${typeof request}`);
    console.log(`response ${typeof response}`);

    const RpcHost = host.switchToRpc();
    console.log(`RpcHost ${RpcHost}`);
    console.log(`RpcHost.getData() ${RpcHost.getData()}`);

    const HttpHost = host.switchToHttp();
    console.log(`HttpHost ${HttpHost}`);

    const httpRequest = HttpHost.getRequest<Request>();
    console.log(`httpRequest ${httpRequest}`);

    const httpResponse = HttpHost.getResponse<Request>();
    console.log(`httpResponse ${httpResponse}`);

    const WsHost = host.switchToWs();
    console.log(`WsHost ${WsHost}`);

    super.catch(exception, host);
  }
}
