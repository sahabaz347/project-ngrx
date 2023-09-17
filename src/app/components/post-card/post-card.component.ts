import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post';
import { RootReducerState } from 'src/app/reducer';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';
import { UpdateCommentComponent } from '../layout/update-comment/update-comment.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post
  commentForm!: FormGroup;
  commentId!: number;
  constructor(private youtubeRepoService: YoutubeRepoService, private dialog: MatDialog, private router: Router, private store: Store<RootReducerState>) { }

  ngOnInit() {
    // console.log(this.post)
    this.commentForm = new FormGroup({
      addComment: new FormControl('', Validators.required)
    })
  }
  commentSubmit(postId: number) {
    this.store.select('postReducer').subscribe(res => {
      this.commentId = +res.entities[postId].comments.length + 1;
    })
    this.youtubeRepoService.addComment(postId, this.commentId, this.commentForm.value.addComment).subscribe(res => {
      this.youtubeRepoService.posts.next(JSON.parse(JSON.stringify(res[0])))
    })
  }
  onDelete(id: number) {
    this.youtubeRepoService.deletePost(id, this.post.id).subscribe(res => {
      this.youtubeRepoService.posts.next(res[0])
    })
  }
  onEdit(id: number) {
    this.dialog.open(UpdateCommentComponent,
      {
        width: '300px',
        height: '300px',
        data: { des: this.post.comments.find(data=>data.id==id)?.description, id: id, postId: this.post.id }
      }
    )
  }
}
