import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './metadata.decorators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //this guard invokes the Passport strategy and kicks off the steps described above
  //( retrieving credentials, running the verify function creating the user property, etc)

  //with @UseGuards(AuthGuard('local')) we are using an AuthGuard that @nestjs/passport automatically
  //provisioned for us
  //our passport local strategy has a default name of 'local'
  //we reference that name in the @UseGuards() decorator and associate it with
  //code supplied by the passport-local package.
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const access_token = await this.authService.login(req.user);
    return {
      message: 'successfully logged in ',
      user_jwt: access_token,
    };
  }

  //when our GET/profile route is hit, the Guard will automatically invoke
  // our passport-jwt custom configured logic, validating the JWT, and assigning the user property to the
  // Request object
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
