import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post/post';
import {User} from '../../models/user/user';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Mark} from '../../models/post/mark';
import {MarkType} from '../../models/post/mark-type.enum';
import {PostMarkResponse} from '../../models/post/post-mark-response';
import {Comment} from '../../models/post/comment';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {

  public post: Post;
  public user: User;
  public currentUserId: string;
  public isEditable: boolean = false;
  public postForm: FormGroup;
  isAuthenticated: boolean = true;
  likeCount: number = 0;
  dislikeCount: number = 0;
  userChoice: MarkType;
  commentForm: FormGroup;
  comments: Comment[];

  constructor(private postService: PostService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentService: CommentService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.postService.getPostById(params.get('postId')).subscribe(post => {
        this.post = post;
        commentService.get(post.id).subscribe((comments: Comment[]) => {
          this.comments = comments;
        });
        this.postService.getAllMarksOfPost(post.id).subscribe((postMarkResponse: PostMarkResponse) => {
          this.likeCount = postMarkResponse.likeCount;
          this.dislikeCount = postMarkResponse.dislikeCount;
          this.userChoice = postMarkResponse.userMarkType;
        });
        this.userService.getUserById(post.psychologistId).subscribe(user => this.user = user);
        this.currentUserId = authService.getUserIdByToken();
        this.isAuthenticated = authService.getUserIdByToken() !== '';
      });
    });
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', Validators.required)
    });
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }


  edit() {
    this.isEditable = true;
  }

  save() {
    this.post.title = this.postForm.controls['title'].value;
    this.post.text = this.postForm.controls['text'].value;
    this.postService.updatePost(this.post).subscribe((post: Post) => {
      this.post = post;
      this.isEditable = false;
    });
  }

  setLike() {
    let mark: Mark = {
      markType: MarkType.LIKE,
      postId: this.post.id,
      userId: this.authService.getUserIdByToken()
    };
    if (this.userChoice !== MarkType.LIKE) {
      this.postService.saveMark(mark).subscribe((mark: Mark) => {
        if (this.userChoice === MarkType.DISLIKE) {
          this.dislikeCount--;
        }
        this.likeCount++;
        this.userChoice = MarkType.LIKE;
      });
    }
  }

  setDislike() {
    let mark: Mark = {
      markType: MarkType.DISLIKE,
      postId: this.post.id,
      userId: this.authService.getUserIdByToken()
    };
    if (this.userChoice !== MarkType.DISLIKE) {
      this.postService.saveMark(mark).subscribe((mark: Mark) => {
        if (this.userChoice === MarkType.LIKE) {
          this.likeCount--;
        }
        this.dislikeCount++;
        this.userChoice = MarkType.DISLIKE;
      });
    }
  }

  saveComment() {
    let comment: Comment = {
      postId: this.post.id,
      senderId: this.authService.getUserIdByToken(),
      text: this.commentForm.controls['comment'].value
    };
    this.commentService.saveComment(comment).subscribe(comment => {
      this.comments.push(comment);
    });
  }
}
