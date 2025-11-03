import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../home/service/auth.service';
import { TokenStorageService } from '../home/service/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
form:FormGroup;
  isLoggedIn: boolean = false;
      successMessage: string = '';
errorMessage: string = '';
  constructor(private auth:AuthService, private router: Router, private fb:FormBuilder, private tokenStorage: TokenStorageService){
        this.form = new FormGroup({
      regid: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  ngOnInit(){}

   onSubmit(): void {
    const f = this.form.value;
    console.log(f);
    this.auth.login(f.regid, f.password).subscribe((res:any) => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        console.log(res);
        this.reloadPage();
        // this.router.navigate(['/dashboard']);
        // this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        // this.errorMessage = err.error.message;
        this.isLoggedIn = false;
               this.successMessage = '';
        this.errorMessage = '❌ Login Credentials Wrong. Please try again.';
        setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/login']);
        });
      }, 2000);
      }
    );
  }
  reloadPage(): void {
    this.router.navigateByUrl('/dashboard');
  }
  // test

}
