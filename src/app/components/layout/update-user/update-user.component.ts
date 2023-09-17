import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { RootReducerState } from 'src/app/reducer';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  newId!: any;
  users!: User;
  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User, private youtubeRepoService: YoutubeRepoService, private store: Store<RootReducerState>) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl(this.data.email ? this.data.email : '', [Validators.required, Validators.email]),
      name: new FormControl(this.data.name ? this.data.name : '', [Validators.required])
    })

  }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      let email = this.userForm.value.email;
      let name = this.userForm.value.name;
      let id = this.data.id;
      if (this.data.id) {
        this.youtubeRepoService.updateUser(id, name, email).subscribe(res => {
          this.youtubeRepoService.users.next(res[0]);
          this.dialogRef.close();
        })
      } else {
        this.store.select('userReducer').subscribe(res => {
          this.newId =res.ids[res.ids.length - 1]==undefined?1:res.ids[res.ids.length - 1] + 1;
          
        })
        this.youtubeRepoService.addUser(this.newId, name, email).subscribe(res => {
          this.youtubeRepoService.users.next(res[0]);
          this.dialogRef.close();
        })
      }
    }
  }

}