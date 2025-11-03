import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss']
})
export class SupportTicketComponent {

   pfdata:any;
    idselectmsg: string = '';
  regname:any;
    form:FormGroup;
    tdata:any;
      qrCodeValue: string = '';
          successMessage: string = '';
errorMessage: string = '';
 selectedWallet: string = '';
  data1: any;
  loading: boolean=true;
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder, private route:ActivatedRoute, private router:Router) {
       this.form = this.fb.group({
      query: ['', Validators.required], 
      subject: ['', Validators.required], 
    });
  }
  Back() {
  this.location.back();
}

ngOnInit(){
  this.getProfiledata();
  this.getsupportdata();
}

 getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      // console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

   getsupportdata(){
    this.api.GetSupportTickets().subscribe((res:any)=>{
      // console.log(res);
      this.data1 = res.data;
      this.loading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.loading = false; // Set loading to false even on error
    }
    )
  }

 add(){
    // console.log(this.form.value);
    if (this.form.valid) {
      const val = {
        query: this.form.value.query,
        subject: this.form.value.subject,
      };
      this.api.AddSupport(val).subscribe(
        a => {
          if (a) {
            // console.log(a);
               this.form.reset();
               this.successMessage = '✅ Ticket Created successfully!';
          this.errorMessage = '';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/support']);
        });
      }, 2000);
          } else {
             this.errorMessage = '❌ Ticket Created  failed. Please try again.';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigateByUrl('/support');
          }, 1500);
           
          }
        },
        (err: any) => {
                this.errorMessage = '❌ Ticket Created  failed. Please try again.';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigateByUrl('/support');
          }, 1500);
        },
      );
    }
  }

}
