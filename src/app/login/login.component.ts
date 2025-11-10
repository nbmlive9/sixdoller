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
  form: FormGroup;
  isLoggedIn = false;
  successMessage = '';
  errorMessage = '';
  isForgot = false;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    this.form = new FormGroup({
      regid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

   get f() {
    return this.form.controls;
  }

  onLoginClick(event: Event) {
    const button = event.target as HTMLButtonElement;
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 600);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const f = this.form.value;
    this.auth.login(f.regid, f.password).subscribe({
      next: (res: any) => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }

  onForgot() {
    if (this.form.valid) {
      console.log('Forgot Password Email:', this.form.value);
      // TODO: API integration
    }
  }
}
