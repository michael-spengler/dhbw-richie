import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
export class RolesController {

    @Post()
    @UseGuards(AuthGuard('jwt'))
    //Use guard roles
    public async setRoles() {

    }
}
