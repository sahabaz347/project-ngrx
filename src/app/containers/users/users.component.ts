import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from 'src/app/components/layout/update-user/update-user.component';
import { User } from 'src/app/models/user';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private youtubeRepoService: YoutubeRepoService, private dialog: MatDialog) { }

  loading!: boolean;
  loaded!: boolean;
  error!: boolean;
  users: User[] = [];
  errorMsg!: string;

  ngOnInit(): void {
    this.fetchData();
    this.youtubeRepoService.users.subscribe(res => {
      this.users = res
    })
  }

  fetchData() {
    this.youtubeRepoService.getUserData().subscribe(res => {
      // console.log(res);
      [this.users, this.loading, this.error, this.errorMsg] = res;
    });
  }

  tryAgain() {
    this.youtubeRepoService.getUserData(true).subscribe(
      res => {
        [this.users, this.loading, this.error, this.errorMsg] = res
      }
      ,
      error => { this.error = true, this.errorMsg = error } // Handle error case
    );
  }
  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '300px',
      height: '300px',
      data: []


    });
  }
}

