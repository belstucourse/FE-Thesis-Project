import {MarkType} from './mark-type.enum';

export interface Mark {
  id?: string;
  markType: MarkType;
  postId: string;
  userId: string;
}
