import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, req: any) {
    const payload = { username: user.username, sub: user.userId };

    req.session.user = user; // add user to session
    // console.log('login', req.session);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(req) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      console.log('session destroyed');
    });
  }
}
