import { Role } from 'src/users/roles/role.enum';

export type Post = {
  id?: number;
  title: string;
  author: string;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
};
