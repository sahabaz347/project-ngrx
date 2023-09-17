import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../layout/update-user/update-user.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  constructor(private youtubeRepoService: YoutubeRepoService, private dialog: MatDialog, private router: Router) { }

  delete() {
    this.youtubeRepoService.deleteUser(this.user.id).subscribe(res => {
      // console.log('res',res)
      this.youtubeRepoService.users.next(res[0])
    })
  }
  update(id: number) {
    this.dialog.open(UpdateUserComponent, {
      width: '300px',
      height: '300px',
      data: this.user
    });
  }

  onClick() {
    this.router.navigate(['/user', this.user.id])
  }

}
