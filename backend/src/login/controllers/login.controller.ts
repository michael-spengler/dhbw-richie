import { Controller, Post, UseGuards, Get, Body, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../../passport';
import { RegisterModel } from '../models/register.model';

@Controller('auth')
export class LoginController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
      // initiates the Google OAuth2 login flow

      console.log('TEAT')
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req: any, @Res() res: any) {
      const jwt: string = (req.user as any).jwt;
      res.cookie('token', jwt);
      res.redirect('http://localhost:4200/');

      // if (jwt) {
      //   return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:4200')</script></body></html>`;
      // } else {
      //   return 'There was a problem signing in...';
      // }
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
      return 'JWT is working!';
    }

    // @Post()
    // @UseGuards(AuthGuard('local'))
    // public async login(
    //     @AuthenticatedUser() user
    // ) {
    //     console.log('login', user)
    // }

    // @Get()
    // @UseGuards(AuthGuard('jwt'))
    // public async refresh() {

    // }

    // @Post()
    // public async register(
    //     @Body() registerModel: RegisterModel
    // ) {
    //     console.log(registerModel);
    // }
}
