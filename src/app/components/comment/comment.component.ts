import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/post/comment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagePost} from '../../models/pagePost';
import {CommentService} from '../../services/comment.service';
import {UserService} from '../../services/user.service';
import {FileService} from '../../services/file.service';
import {FileUploaderService} from '../../services/file-uploader.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public user: User;
  constructor(private commentService: CommentService,
              public userService: UserService,
              private fileService: FileUploaderService) {
  }

  @Input()
  comment: Comment;

  ngOnInit(): void {
    this.userService.getUserById(this.comment.senderId).subscribe(user=>{
      this.user = user;
    })
  }

  getUrl(userId: string) {
      return `url(\'${this.user.imageUrl}\')`;
  }

}
