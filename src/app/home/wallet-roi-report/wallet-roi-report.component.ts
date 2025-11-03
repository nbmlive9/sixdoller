import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-wallet-roi-report',
  templateUrl: './wallet-roi-report.component.html',
  styleUrls: ['./wallet-roi-report.component.scss']
})
export class WalletRoiReportComponent {

  data1:any;
    constructor(private api:AuthUserService){}
  
    ngOnInit(){
      this.roireportData();
    }
  
    roireportData(){
      this.api.WalletRoiReport().subscribe((res:any)=>{
          // console.log(res);
          this.data1=res.data;
      })
    }

}
