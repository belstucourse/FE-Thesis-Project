import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/post/comment';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {
  }

  public get(postId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.baseUrl +'/api/comments/' + postId);
  }

  public saveComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.baseUrl +'/api/comments', comment);
  }

  public deleteComment(postId: string): Observable<Comment> {
    return this.httpClient.delete<Comment>(this.baseUrl +'/api/comments/' + postId);
  }
}
