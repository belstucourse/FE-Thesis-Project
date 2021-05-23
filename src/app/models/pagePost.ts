import {Post} from './post/post';

export interface PagePost {
  content: Post[];
  number: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}
