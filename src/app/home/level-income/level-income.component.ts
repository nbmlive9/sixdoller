import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-level-income',
  templateUrl: './level-income.component.html',
  styleUrls: ['./level-income.component.scss']
})
export class LevelIncomeComponent {

      data1: any;
    
      constructor(private api: AuthUserService){}
    
      ngOinIt(){
        this.loadTransferTransactions();
      }
    
       loadTransferTransactions() {
        this.api.LevelMembersReport().subscribe((res: any) => {
          console.log('levelteam',res);
          this.data1 = res.data;
        });
      }

}
