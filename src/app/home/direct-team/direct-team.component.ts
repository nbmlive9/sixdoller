import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.scss']
})
export class DirectTeamComponent {

data1:any;
  constructor(private api:AuthUserService){}

  ngOnInit(){
    this.getreferrals();
  }

  getreferrals(){
    this.api.Referrals().subscribe((res:any)=>{
        // console.log(res);
        this.data1=res.data.data;
    })
  }
}
