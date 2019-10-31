import { Body, Controller, ForbiddenException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AuthenticatedUser, RoleGuard, Roles } from '../../passport';
import { SetRoleModel } from '../model/incoming/set-role.model';

@Controller('roles')
export class RolesController {
  public constructor(private readonly connection: Connection) {}

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('isAdmin')
  public async setRoles(
    @Body() setRoleModel: SetRoleModel,
    @AuthenticatedUser() user: User
  ) {
    if (user._id.toString() === setRoleModel.user) {
      throw new ForbiddenException();
    }
    const u = await this.connection.manager.findOne(User, setRoleModel.user);
    u.isAdmin = setRoleModel.isAdmin;
    u.isReviewer = setRoleModel.isReviewer;
    await this.connection.manager.save(User, u);
  }
}
