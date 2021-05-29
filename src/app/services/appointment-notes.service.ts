import { Injectable } from '@angular/core';
import {User} from '../models/user/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Prescription} from '../models/workday/prescription';
import {PsychoEventNotes} from '../models/workday/psycho-event-notes';

@Injectable({
  providedIn: 'root'
})
export class AppointmentNotesService {

  constructor(private httpClient: HttpClient) { }

  public savePrescription(prescription: Prescription): Observable<Prescription> {
    return this.httpClient.post<Prescription>('/api/event/prescriptions', prescription);
  }

  public savePsychoNotes(notes: PsychoEventNotes): Observable<PsychoEventNotes> {
    return this.httpClient.post<PsychoEventNotes>('/api/event/notes', notes);
  }

  public getPrescriptionByEventId(eventId: string): Observable<Prescription> {
    return this.httpClient.get<Prescription>('/api/event/prescriptions' + eventId);
  }
  public getPsychoNoteByEventId(eventId: string): Observable<PsychoEventNotes> {
    return this.httpClient.get<PsychoEventNotes>('/api/event/notes' + eventId);
  }
}
