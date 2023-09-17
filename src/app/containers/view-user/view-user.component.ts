import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { YoutubeRepoService } from 'src/app/services/youtube-repo.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user!:User;
constructor(private youtubeService:YoutubeRepoService,private route: ActivatedRoute){}
ngOnInit(){
 this.fetchData()
}
fetchData(){
 const user$= this.route.params.pipe(map(data=>data['id']),switchMap((id)=>{
    return this.youtubeService.getUserById(id)
  }),filter(res=>!!res));
  user$.subscribe(res=>{
    this.user=res[0]
  })
}
}
