import {ChatStatus} from './chat-status.enum';
import {ChatType} from './chat-type.enum';

export interface Chat {
  id: string;
  clientId: string;
  psychologistId: string;
  chatStatus: ChatStatus;
  chatType: ChatType;
}
