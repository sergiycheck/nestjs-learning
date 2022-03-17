import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  USERNAME: string;
  PORT: number;
  DATABASE: string;
  SUPPORT_EMAIL: string;
}

@Injectable()
export class FeatureOneService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>, // private configService: ConfigService, //app.module-load-db-config.ts
  ) {
    const dbUser = this.configService.get('USERNAME', { infer: true });
    const dbName = this.configService.get('DATABASE', { infer: true });

    // // Argument of type '"URL"' is not assignable to parameter of type 'keyof EnvironmentVariables'.
    // // const url = this.configService.get<string>('URL');

    console.log(
      'dbUser ',
      dbUser,
      ' db name',
      dbName,
      ' support email ',
      this.configService.get('SUPPORT_EMAIL'),
    );

    //app.module-load-db-config.ts
    // console.log(
    //   `this.configService.get<string>('database.host') `,
    //   this.configService.get<string>('database.host'),
    // );
  }
}
