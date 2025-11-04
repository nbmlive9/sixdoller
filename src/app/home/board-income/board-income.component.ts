import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-board-income',
  templateUrl: './board-income.component.html',
  styleUrls: ['./board-income.component.scss']
})
export class BoardIncomeComponent {

    data1: any;
  
    constructor(private api: AuthUserService){}
  
    ngOinIt(){
      this.loadTransferTransactions();
    }
  
     loadTransferTransactions() {
      this.api.BoardIncomeReport().subscribe((res: any) => {
        console.log('recevd',res);
        this.data1 = res.data;
      });
    }

}
