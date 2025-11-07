import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-received-wallet',
  templateUrl: './received-wallet.component.html',
  styleUrls: ['./received-wallet.component.scss']
})
export class ReceivedWalletComponent {
  data1: any;

  constructor(private api: AuthUserService){}

  ngOnInit(){
    this.loadTransferTransactions();
  }

   loadTransferTransactions() {
    this.api.RecivedWalletReport().subscribe((res: any) => {
      console.log('recevd',res);
      this.data1 = res.data;
    });
  }

}
