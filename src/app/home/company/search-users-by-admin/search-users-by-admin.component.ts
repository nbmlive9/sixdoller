import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-users-by-admin',
  templateUrl: './search-users-by-admin.component.html',
  styleUrls: ['./search-users-by-admin.component.scss']
})
export class SearchUsersByAdminComponent {

   @ViewChild('successModal') successModal!: ElementRef;
   searchInput: string = '';
  userData: any = null;
  visible: boolean = false;
  repd:any
  pffdata: any;
  isEdit: boolean=true;
  userid: any;
noData: any;
    showDialog(row:any) {
      this.repd=row;
        this.visible = true;
    }
      form:FormGroup;
  constructor(private api:AuthUserService, private router: Router, private fb:FormBuilder, private activeroute:ActivatedRoute) { 
    this.form = this.fb.group({
       password: [''],
      name: [''],
      email: [''],
      wallet1: ['']
    });
  }

  ngOnInit(): void {
  }

  onSearch() {
    if (!this.searchInput.trim()) return;
    this.api.SearchUserData(this.searchInput).subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.userData = res.data;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.userData = null;
        }
      });
  }

   openProfile(item: any) {
    // console.log("item:",item.regid);
    this.userid=item.regid
    
    this.isEdit = false;   
    this.pffdata = item;   

    this.form.patchValue({
      password: item.password,
      name: item.name,
      email: item.email,
      wallet1: item.wallet1
    });
    
    this.form.markAsPristine();
  }

  edit() {
    this.isEdit = true;
  }
  
  save() {
    const payload = this.form.value;
    const id = this.userid;   
  
    this.api.cupdateprofile(id, payload).subscribe({
      next: (res: any) => {
        // console.log("updateprofile:", res);
        if (res.status === 1) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/allusers']);
          });
          this.pffdata = { ...this.pffdata, ...payload };  
          this.isEdit = false;  
        } else {
        }
      },
      error: (err) => {
        console.error("updateprofile error:", err);
      }
    });
  }

}
