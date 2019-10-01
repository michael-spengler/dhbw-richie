import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalStrategy } from '../../passport';

@Controller('login')
export class LoginController {

    @Post()
    @UseGuards(LocalStrategy)
    public async login() {
        console.log('login')
    }
}
