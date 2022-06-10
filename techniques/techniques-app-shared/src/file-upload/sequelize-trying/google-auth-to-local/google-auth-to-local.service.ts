import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthToLocalService {
  client: OAuth2Client;
  clientId: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(this.clientId);
  }

  async verifyIdToken(jwtGoogleToken: string) {
    //https://github.com/googleapis/google-api-nodejs-client/issues/761#issuecomment-311251914

    const ticket = await this.client.verifyIdToken({
      idToken: jwtGoogleToken,
      audience: this.clientId,
    });

    return ticket;
  }
}
