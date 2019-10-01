import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/passport';
import { RegisterModel } from '../models/register.model';

@Controller('login')
export class LoginController {

    @Post()
    @UseGuards(AuthGuard('local'))
    public async login(
        @AuthenticatedUser() user
    ) {
        console.log('login', user)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async refresh() {

    }

    @Post()
    public async register(
        @Body() registerModel: RegisterModel
    ) {
        console.log(registerModel);
    }
}
