import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Post} from '../../models/post/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public length = 1000;
  public pageSize = 20;
  public posts: Post[];


  constructor(private postService: PostService) {
    this.postService.getAllPosts(0).subscribe((postPage)=>{
      this.posts = postPage.content;
    })
  }

  ngAfterViewInit() {

    this.paginator.page.subscribe(
      (event) => {
        this.postService.getAllPosts(event.pageIndex).subscribe((postPage)=>{
          this.posts = postPage.content;
        })
      }
    );
  }

  ngOnInit(): void {
  }
}
