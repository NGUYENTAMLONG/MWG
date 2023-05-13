import { PermissionType } from '../../../src/permissions/constants/permission.constant';

export const ROLE_CONST = {
  MODEL_NAME: 'role',
  MODEL_PROVIDER: 'ROLE_MODEL',
};

export enum Role {
  SUPER_ADMIN = 'super-admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export const ROLES_DEFAULT = [
  {
    name: 'super-admin',
    permissions: [...Object.values(PermissionType)],
    type: Role.SUPER_ADMIN,
  },
  {
    name: 'TEACHER',
    permissions: [],
  },
];
