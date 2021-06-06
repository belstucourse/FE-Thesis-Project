import {MarkType} from './mark-type.enum';

export interface PostMarkResponse {
  likeCount: number;
  dislikeCount: number;
  userMarkType: MarkType;
}
