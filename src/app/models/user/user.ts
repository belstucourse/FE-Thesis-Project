import {UserRole} from './user-role';

export interface User {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string
  registerDate?: Date;
  deactivated?: boolean;
  deactivatedDate?: Date;
  imageUrl?: string;
  password?: string;
  roles?: Array<UserRole>;
  avatarUrl?: string;
}
