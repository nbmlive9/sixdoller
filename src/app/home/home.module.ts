import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { GTeamComponent } from './g-team/g-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { ReceiveComponent } from './receive/receive.component';
import { DepositComponent } from './deposit/deposit.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { ReportComponent } from './report/report.component';
import { BuyLiteComponent } from './buy-lite/buy-lite.component';
import { BuyProComponent } from './buy-pro/buy-pro.component';
import { BuyMaxComponent } from './buy-max/buy-max.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { QRCodeModule } from "angularx-qrcode";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReferralsAllDataComponent } from './referrals-all-data/referrals-all-data.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { ReferralLinkShareComponent } from './referral-link-share/referral-link-share.component';
import { GbonusIncomeComponent } from './gbonus-income/gbonus-income.component';
import { WalletRoiReportComponent } from './wallet-roi-report/wallet-roi-report.component';
import { PromotionBonusComponent } from './promotion-bonus/promotion-bonus.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WithdrawFundComponent } from './withdraw-fund/withdraw-fund.component';
import { WithdrawReportsComponent } from './withdraw-reports/withdraw-reports.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';





@NgModule({
  declarations: [
    HomeComponent,
    GTeamComponent,
    DashboardComponent,
    FooterComponent, ProfileComponent, TransferAmountComponent, ReceiveComponent, DepositComponent, DirectTeamComponent, ReportComponent, BuyLiteComponent, BuyProComponent, BuyMaxComponent, ReferralsComponent, ReferralsAllDataComponent, SelfTransferComponent, ReferralLinkShareComponent, GbonusIncomeComponent, WalletRoiReportComponent, PromotionBonusComponent, ForgotPasswordComponent, WithdrawFundComponent, WithdrawReportsComponent, SupportTicketComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule,
    QRCodeModule,ZXingScannerModule
]
})
export class HomeModule { }
