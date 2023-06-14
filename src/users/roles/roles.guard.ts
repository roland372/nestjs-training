import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { UsersService } from '../users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const user = this.usersService.findOne('john');

    const hasRequiredRole = Promise.all(
      requiredRoles.map(async (role) => {
        return (await user).roles.includes(role);
      }),
    ).then((roleChecks) => {
      return roleChecks.some((hasRole) => hasRole);
    });

    return hasRequiredRole;
  }
}
