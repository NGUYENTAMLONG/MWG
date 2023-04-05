import { PermissionType } from '../../../src/permissions/constants/permission.constant';

export const ROLE_CONST = {
  MODEL_NAME: 'role',
  MODEL_PROVIDER: 'ROLE_MODEL',
};

export enum Role {
  SUPER_ADMIN = 'super-admin',
  FOOD_ADMIN = 'food-admin',
  COFFEE_ADMIN = 'coffee-admin',
  SPA_ADMIN = 'spa-admin',
  SUB_ADMIN = 'sub-admin',
  CUSTOMER = 'customer',
}

export const ROLES_DEFAULT = [
  {
    name: 'super-admin',
    permissions: [...Object.values(PermissionType)],
    type: Role.SUPER_ADMIN,
  },
  {
    name: 'food-admin',
    permissions: [
      PermissionType.CREATE_USER,
      PermissionType.READ_USER,
      PermissionType.UPDATE_USER,
      PermissionType.DELETE_USER,
    ],
    type: Role.FOOD_ADMIN,
  },
  {
    name: 'coffee-admin',
    permissions: [],
    type: Role.COFFEE_ADMIN,
  },
  {
    name: 'spa-admin',
    permissions: [],
    type: Role.SPA_ADMIN,
  },
  {
    name: 'sub-admin',
    permissions: [],
    type: Role.SUB_ADMIN,
  },
  {
    name: 'customer',
    permissions: [],
    type: Role.CUSTOMER,
  },
];
