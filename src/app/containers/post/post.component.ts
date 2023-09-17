import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  constructor(private youtubeRepoService: YoutubeRepoService, private dialog: MatDialog) { }

  loading!: boolean;
  loaded!: boolean;
  error!: boolean;
  posts: Post[] = [];
  errorMsg!: string;

  ngOnInit(): void {
    this.fetchData();
    this.youtubeRepoService.posts.subscribe(res => {
      this.posts = res
    })
  }

  fetchData() {
    this.youtubeRepoService.getPostData().subscribe(res => {
      [this.posts, this.loading, this.error, this.errorMsg] = res;
    });
  }
  tryAgain() {
    this.youtubeRepoService.getPostData(true).subscribe(
      res => {
        [this.posts, this.loading, this.error, this.errorMsg] = res
      },
      error => { this.error = true, this.errorMsg = error } // Handle error case
    );
  }
}
