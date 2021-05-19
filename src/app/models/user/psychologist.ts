import {Tag} from './tag';
import {User} from './user';

export interface Psychologist extends User {
  verified?: boolean;
  verifiedDate?: Date;
  mobile: string;
  tags?: Array<Tag>;
  education?: string;
}
