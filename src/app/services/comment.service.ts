import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/post/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  public get(postId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('/api/comments/' + postId);
  }

  public saveComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>('/api/comments', comment);
  }

  public deleteComment(postId: string): Observable<Comment> {
    return this.httpClient.delete<Comment>('/api/comments/' + postId);
  }
}
