import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-unique-wallets-data',
  templateUrl: './unique-wallets-data.component.html',
  styleUrls: ['./unique-wallets-data.component.scss']
})
export class UniqueWalletsDataComponent {

       pfdata: any;
      idselectmsg: string = '';
      regname: any;
      successMessage: string = '';
      errorMessage: string = '';
      tdata: any = [];
    
    
      successTransferModal: any;
    loadingModal: boolean = false;
    
      constructor(
        private api: AuthUserService,
      ) {    }
    
    
      ngOnInit() {
        this.loadData();
      }
    
  
    
      /** Load Transfer Transactions */
      loadData() {
        this.api.GetUniqeWallet().subscribe((res: any) => {
          console.log(res);
          this.tdata = res.data;
        });
      }

    
  

}
