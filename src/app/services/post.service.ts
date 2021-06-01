import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post/post';
import {PagePost} from '../models/pagePost';
import {Feedback} from '../models/feedback';
import {Mark} from '../models/post/mark';
import {PostMarkResponse} from '../models/post/post-mark-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  public getPostById(postId: string): Observable<Post> {
    return this.httpClient.get<Post>('api/posts/' + postId);
  }

  public getPsychoPosts(psychoId: string, page: number): Observable<PagePost> {
    return this.httpClient.get<PagePost>('api/posts/psycho/' + psychoId + '?page=' + page + '&size=20&sort=id,DESC');
  }

  public getAllPosts(page: number, sortType: string): Observable<PagePost> {
    return this.httpClient.get<PagePost>('api/posts?page=' + page + '&size=20&sort=' + sortType + ',DESC');
  }

  public savePost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>('/api/posts', post);
  }

  public updatePost(post: Post): Observable<Post> {
    return this.httpClient.put<Post>('/api/posts', post);
  }

  public deletePost(postId: string): void {
    this.httpClient.delete('/api/posts/' + postId);
  }

  public saveApplicationFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpClient.post<Feedback>('/api/feedbacks', feedback);
  }

  public deleteApplicationFeedback(id: string): void {
    this.httpClient.delete('/api/feedbacks/' + id);
  }

  public getAllApplicationFeedbacks(): Observable<Feedback[]> {
    return this.httpClient.get<Feedback[]>('api/feedbacks/');
  }

  public getApplicationFeedbackById(id: string): Observable<Feedback> {
    return this.httpClient.get<Feedback>('api/feedbacks/' + id);
  }

  public getAllMarksOfPost(postId: string): Observable<PostMarkResponse> {
    return this.httpClient.get<PostMarkResponse>('api/posts/marks/' + postId);
  }

  public saveMark(mark: Mark): Observable<Mark> {
    return this.httpClient.post<Mark>('/api/posts/marks/', mark);
  }
}
