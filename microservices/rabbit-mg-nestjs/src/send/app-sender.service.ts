import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { MATH_SERVICE } from '../constants';

@Injectable()
export class AppSenderService {
  constructor(@Inject(MATH_SERVICE) private client: ClientProxy) {}

  sendReplaceEmojiMsg(message = 'default message') {
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();

    const pattern = 'replace-emoji';

    return this.client.send({ cmd: pattern }, record);
  }
}
