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
  selected: string = "id";


  constructor(private postService: PostService) {
    this.postService.getAllPosts(0, this.selected).subscribe((postPage)=>{
      this.posts = postPage.content;
    })
  }

  ngAfterViewInit() {

    this.paginator.page.subscribe(
      (event) => {
        this.postService.getAllPosts(event.pageIndex, this.selected).subscribe((postPage)=>{
          this.posts = postPage.content;
        })
      }
    );
  }

  ngOnInit(): void {
  }

  change() {
    this.postService.getAllPosts(0, this.selected).subscribe((postPage)=>{
      this.posts = postPage.content;
    })
  }
}
