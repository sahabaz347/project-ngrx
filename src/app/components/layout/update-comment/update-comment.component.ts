import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { User } from 'src/app/models/user';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';
import { RootReducerState } from 'src/app/reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {
  commentForm!: FormGroup;
  postForm!:FormGroup;
  newId!:number;
  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private youtubeRepoService: YoutubeRepoService,private store: Store<RootReducerState>) { }
  ngOnInit() {
    if(this.data){

      this.commentForm = new FormGroup({
        updateComment: new FormControl(this.data.des, Validators.required)
      })
    }else{
      this.postForm=new FormGroup({
        mypost:new FormControl('',Validators.required)
      })
    }
  }
  oncommentSubmit() {
    this.youtubeRepoService.updateComment(this.commentForm.value.updateComment, this.data.id, this.data.postId).subscribe(res => {
      this.youtubeRepoService.posts.next(JSON.parse(JSON.stringify(res[0])));
      this.dialogRef.close();
    })
  }
  onpostSubmit(){
    this.store.select('postReducer').subscribe(res => {
      this.newId =res.ids[res.ids.length - 1]==undefined?1:res.ids[res.ids.length - 1] + 1;
      
    })
    this.youtubeRepoService.addPost(this.postForm.value.mypost,this.newId).subscribe(res => {
      this.youtubeRepoService.posts.next(JSON.parse(JSON.stringify(res[0])));
      this.dialogRef.close();
    })
  }
}
