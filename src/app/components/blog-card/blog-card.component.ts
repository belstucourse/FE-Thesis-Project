import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input()
  public post: Post;
  public user: User;

  constructor(private postService: PostService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.postService.getPostById(params.get('postId')).subscribe(post => {
        this.post = post;
        this.userService.getUserById(post.psychologistId).subscribe(user => this.user = user);
      });
    });
  }

  ngOnInit(): void {
  }

  changeBackground(): any {
    return `url(assets/man.png)`;
  }
}
