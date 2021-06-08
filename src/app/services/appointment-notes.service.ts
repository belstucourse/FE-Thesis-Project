import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Prescription} from '../models/workday/prescription';
import {PsychoEventNotes} from '../models/workday/psycho-event-notes';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppointmentNotesService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public savePrescription(prescription: Prescription): Observable<Prescription> {
    return this.httpClient.post<Prescription>(this.baseUrl + '/api/event/prescriptions', prescription);
  }

  public savePsychoNotes(notes: PsychoEventNotes): Observable<PsychoEventNotes> {
    return this.httpClient.post<PsychoEventNotes>(this.baseUrl + '/api/event/notes', notes);
  }

  public getPrescriptionByEventId(eventId: string): Observable<Prescription> {
    return this.httpClient.get<Prescription>(this.baseUrl + '/api/event/prescriptions' + eventId);
  }

  public getPsychoNoteByEventId(eventId: string): Observable<PsychoEventNotes> {
    return this.httpClient.get<PsychoEventNotes>(this.baseUrl + '/api/event/notes' + eventId);
  }
}
