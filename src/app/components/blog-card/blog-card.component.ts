import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input()
  public post: Post;

  constructor() {
  }

  ngOnInit(): void {
  }

}
