import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent {


     pfdata: any;
    idselectmsg: string = '';
    regname: any;
    successMessage: string = '';
    errorMessage: string = '';
    form: FormGroup;
    tdata: any = [];
  
  
    successTransferModal: any;
  loadingModal: boolean = false;
  
    constructor(
      private api: AuthUserService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.form = this.fb.group({
        news_title: new FormControl('', [Validators.required]),
        news:new FormControl('',[Validators.required]),
      });
    }
  
  
    ngOnInit() {
      this.loadnews();
    }
  

  
    /** Load Transfer Transactions */
    loadnews() {
      this.api.GetNews().subscribe((res: any) => {
        console.log(res);
        
        this.tdata = res.data;
      });
    }
  
    ngAfterViewInit() {
    const modalEl = document.getElementById('successTransferModal');
    if (modalEl) {
      this.successTransferModal = new bootstrap.Modal(modalEl);
    }
  }
  
    /** Transfer Amount */
   add() {
    if (this.form.invalid) return;
  
    const payload = {
      news_title: this.form.value.news_title,
      news: this.form.value.news,
    };
  
    this.loadingModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  
    this.successTransferModal.show(); // ✅ Open modal immediately
  
    this.api.addNews(payload).subscribe(
      (res: any) => {
        this.loadingModal = false;
        this.successMessage = 'News Add successfully! ✅';
        this.form.reset();
        this.loadnews();
  
        setTimeout(() => {
          this.successTransferModal.hide();
          this.reloadComponent();
        }, 1500); // ✅ Auto close after 3 sec
      },
      (err: any) => {
        this.loadingModal = false;
        this.errorMessage = 'News Add failed. Please try again. ❌';
  
        setTimeout(() => {
          this.successTransferModal.hide();
          this.reloadComponent();
        }, 1500);
      }
    );
  }
  
  


  Delete(id:any) {
    this.api.DeleteNews(id).subscribe(
      (a: any) => {
        if (a) {
          console.log(a);
        
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/addnews']);
            });
            }, 1000);
        } else {
          console.log(a);
          // this.errorMessage = a.msg.message;
          // this.msg = 'Products Successfully Updated !!!';
        }
      },
      (err: any) => {
           setTimeout(() => {
          this.successTransferModal.hide();
          this.reloadComponent();
        }, 1500);
      },
    );
  return false;
}

    reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addnews']);
    });
  }


}
