import {User} from './user';

export interface Support extends User {
  createdAdminId: string;
}
