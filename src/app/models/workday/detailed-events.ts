import {Prescription} from './prescription';
import {PsychoEventNotes} from './psycho-event-notes';

export interface DetailedEvents {
  id?: string;
  psychologistId: string;
  clientId: string;
  date: Date;
  isEnded?: boolean;
  isConfirmed?: boolean;
  reasonForVisit: string;
  roomId?: String;
  feedback?: string;
  psychologistName?: string;
  clientName?: string;
  isRepeated?: boolean;
  prescription?: Prescription;
  psychoEventNotes?: PsychoEventNotes;
}
