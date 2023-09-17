import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';
import { UpdateCommentComponent } from '../layout/update-comment/update-comment.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
@Input () posts!: Post[]
constructor(private youtubeRepoService: YoutubeRepoService, private dialog: MatDialog) { }

ngOnInit(){
}
addPost(){
  console.log(111)
  this.dialog.open(UpdateCommentComponent,
    {
      width: '300px',
      height: '300px',
    }
  )
}
}
