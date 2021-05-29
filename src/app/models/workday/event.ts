export interface Event {
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
}
