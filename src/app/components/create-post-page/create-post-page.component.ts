import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploaderService} from '../../services/file-uploader.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post/post';
import {AuthService} from '../../services/auth.service';
import {FileType} from '../../models/file-type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {
  postForm: FormGroup;
  fileToUpload: File = null;

  constructor(private fileUploaderService: FileUploaderService,
              private postService: PostService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])
    });
  }

  onFileChange(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    let post: Post = {
      title: this.postForm.controls['title'].value,
      text: this.postForm.controls['text'].value,
      psychologistId: this.authService.getUserIdByToken()
    };
    this.postService.savePost(post).subscribe((post: Post) => {
      if (this.fileToUpload !== null) {
        this.fileUploaderService.saveFile(this.fileToUpload, post.id, FileType.POST).subscribe((url: string)=>
        {
          this.router.navigate(['/psychoAppointments']);
        });
      }
    });
  }
}
