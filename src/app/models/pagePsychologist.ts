import {Psychologist} from './user/psychologist';

export interface PagePsychologist {
  content: Psychologist[];
  number: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}
