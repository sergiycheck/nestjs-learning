import { RedisPubSub } from 'graphql-redis-subscriptions';
import IoRedis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: 'localhost',
  port: 6340,
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000);
  },
};

const redisPubSub = new RedisPubSub({
  publisher: new IoRedis(options),
  subscriber: new IoRedis(options),

  // Tells RedisPubSub to register callbacks
  // on the messageBuffer and pmessageBuffer EventEmitters
  messageEventName: 'messageBuffer',
  pmessageEventName: 'pmessageBuffer',
});

export default redisPubSub;
