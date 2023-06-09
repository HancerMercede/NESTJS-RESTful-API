/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.getArgByIndex(0);
    const { roles } = req.user;
    console.log('ROLES', roles);
    const isAdmin = roles.includes('administrator'); // if you are administrator you will be able to create a resource.
    return isAdmin;
  }
}
