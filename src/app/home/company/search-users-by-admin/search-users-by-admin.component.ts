import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-users-by-admin',
  templateUrl: './search-users-by-admin.component.html',
  styleUrls: ['./search-users-by-admin.component.scss']
})
export class SearchUsersByAdminComponent {
   @ViewChild('successModal') successModal!: ElementRef;
  searchInput: string = '';
  userData: any = null;
  noData: boolean = false;
form:FormGroup;
  isEdit: boolean=true;
  userid: any;
  pffdata: any;
  loading: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(private api: AuthUserService, private router: Router, private fb:FormBuilder) {
        this.form = this.fb.group({
       password: [''],
      name: [''],
      email: [''],
      wallet1: ['']
    });
  }

  ngOnInit(): void {
    // Debounce 500ms before calling API
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.callSearchAPI(value);
    });
  }

  onTyping(value: string) {
    this.searchSubject.next(value);
  }

  // onSearch() {
  //   if (!this.searchInput.trim()) return;
  //   this.api.SearchUserData(this.searchInput).subscribe({
  //       next: (res: any) => {
  //         console.log('API Response:', res);
  //         this.userData = res.data;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching user data:', err);
  //         this.userData = null;
  //       }
  //     });
  // }

  callSearchAPI(value: string) {
  if (!value.trim()) {
    this.userData = null;
    this.noData = false;
    this.loading = false;
    return;
  }

  this.loading = true;  // start loader

  this.api.SearchDatabyUser(value).subscribe({
    next: (res: any) => {

      let allUsers = res.data || [];
      const search = value.toLowerCase();

      this.userData = allUsers.filter((u: any) =>
        (u.regid && u.regid.toString().includes(search)) ||
        (u.name && u.name.toLowerCase().includes(search)) ||
        (u.email && u.email.toLowerCase().includes(search))
      );

      this.noData = this.userData.length === 0;
      this.loading = false; // stop loader
    },
    error: () => {
      this.userData = null;
      this.noData = true;
      this.loading = false; // stop loader
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
