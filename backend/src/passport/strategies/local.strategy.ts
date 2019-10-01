import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { Strategy } from 'passport-local';
// import { Connection } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly connection: Connection
    ) {
    super({
      usernameField: 'username',
    });
  }

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async validateUser(email: string, password: string) {
    // const user: User = await this.connection.manager.findOne(User, {
    //   where: {
    //     email,
    //   },
    // });
    // const passwordToTest = user ? user.password : Math.random().toString(36);
    // const success = await compare(password, passwordToTest);
    // return success ? user : null;
    return true;
  }
}
