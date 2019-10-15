import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '../../config';
import { User } from '../../entities/user.entity';
import { AuthenticatedUser } from '../../passport';

@Controller('auth')
export class LoginController {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  public googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  public googleLoginCallback(
    @Res() res: Response,
    @AuthenticatedUser() user: User
  ): void {
    const jwt = this.jwtService.sign({ ...user });
    res.cookie('token', jwt);
    res.redirect(this.configService.get('FRONTEND_CALLBACK'));
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public refresh(@Res() res: Response, @AuthenticatedUser() user: User): void {
    this.googleLoginCallback(res, user);
  }
}
