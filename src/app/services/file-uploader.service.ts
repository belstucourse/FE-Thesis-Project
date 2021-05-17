import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileType} from '../models/file-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private httpClient: HttpClient) {
  }

  public saveFile(file: File, objectId: string, fileType: FileType): Observable<String> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('objectId', objectId);
    formData.append('type', FileType[fileType]);
    return this.httpClient.post<String>('/api/storage', formData);
  }
}
