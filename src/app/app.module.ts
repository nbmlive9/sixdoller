import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReferralLinkShareComponent } from './referral-link-share/referral-link-share.component';
import { RegistrationHomeComponent } from './registration-home/registration-home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReferralLinkShareComponent,
    RegistrationHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, HttpClientModule,QRCodeModule,ZXingScannerModule,   
    CommonModule,    
  ],
  providers: [],
  bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
