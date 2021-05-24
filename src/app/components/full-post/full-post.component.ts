import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post/post';
import {User} from '../../models/user/user';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private postService: PostService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.postService.getPostById(params.get('postId')).subscribe(post => {
        this.post = post;
        this.userService.getUserById(post.psychologistId).subscribe(user => this.user = user);
        this.currentUserId = authService.getUserIdByToken();
      });
    });
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.email]),
      text: new FormControl('', Validators.required)
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

}
