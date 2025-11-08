import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './home/service/auth.guard';
import { ReferralLinkShareComponent } from './referral-link-share/referral-link-share.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { RegistrationHomeComponent } from './registration-home/registration-home.component';

const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
   {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'register',
    component: RegistrationHomeComponent
  },
    {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
     {
    path: 'referral/:regid',
    component: ReferralLinkShareComponent
  },
  {
    path: '',
     canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule) // lazy loaded Home
  },
 
  {
    path: '**',
    redirectTo: '' // wildcard MUST come last
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
