import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { ReceiveComponent } from './receive/receive.component';
import { DepositComponent } from './deposit/deposit.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { ReportComponent } from './report/report.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { QRCodeModule } from "angularx-qrcode";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReferralsAllDataComponent } from './referrals-all-data/referrals-all-data.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { ReferralLinkShareComponent } from './referral-link-share/referral-link-share.component';

import { WalletRoiReportComponent } from './wallet-roi-report/wallet-roi-report.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WithdrawFundComponent } from './withdraw-fund/withdraw-fund.component';
import { WithdrawReportsComponent } from './withdraw-reports/withdraw-reports.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { ReceivedWalletComponent } from './received-wallet/received-wallet.component';
import { BoardIncomeComponent } from './board-income/board-income.component';
import { LevelIncomeComponent } from './level-income/level-income.component';
import { Board1Component } from './Boards/board1/board1.component';
import { Board2Component } from './Boards/board2/board2.component';
import { Board3Component } from './Boards/board3/board3.component';
import { Board4Component } from './Boards/board4/board4.component';
import { Board5Component } from './Boards/board5/board5.component';
import { Board6Component } from './Boards/board6/board6.component';
import { Board7Component } from './Boards/board7/board7.component';
import { Board8Component } from './Boards/board8/board8.component';
import { Board9Component } from './Boards/board9/board9.component';
import { Board10Component } from './Boards/board10/board10.component';
import { Board11Component } from './Boards/board11/board11.component';
import { Board12Component } from './Boards/board12/board12.component';
import { Board13Component } from './Boards/board13/board13.component';
import { Board14Component } from './Boards/board14/board14.component';
import { Board15Component } from './Boards/board15/board15.component';
import { ReferralIncomeComponent } from './referral-income/referral-income.component';
import { CpAllUsersComponent } from './company/cp-all-users/cp-all-users.component';
import { CpSupportComponent } from './company/cp-support/cp-support.component';
import { CpdashboardComponent } from './company/cpdashboard/cpdashboard.component';
import { CpDepositsComponent } from './company/cp-deposits/cp-deposits.component';
import { CpTransferComponent } from './company/cp-transfer/cp-transfer.component';
import { CpWithdrawsComponent } from './company/cp-withdraws/cp-withdraws.component';
import { SearchUsersByAdminComponent } from './company/search-users-by-admin/search-users-by-admin.component';
import { RoyaltyUsersDataComponent } from './company/royalty-users-data/royalty-users-data.component';
import { RoyaltyIncomeComponent } from './royalty-income/royalty-income.component';
import { AddMisslianceComponent } from './company/add-missliance/add-missliance.component';
import { InsideCompanyRegistrationComponent } from './company/inside-company-registration/inside-company-registration.component';
import { AddNewsComponent } from './company/add-news/add-news.component';
import { UniqueWalletsDataComponent } from './company/unique-wallets-data/unique-wallets-data.component';
import { SearchUserdataEmployeeComponent } from './company/search-userdata-employee/search-userdata-employee.component';





@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    FooterComponent, ProfileComponent, TransferAmountComponent, ReceiveComponent, DepositComponent, DirectTeamComponent, ReportComponent, ReferralsComponent, ReferralsAllDataComponent, SelfTransferComponent, ReferralLinkShareComponent, WalletRoiReportComponent, ForgotPasswordComponent, WithdrawFundComponent, WithdrawReportsComponent, SupportTicketComponent, SignUpComponent, HeaderComponent, ReceivedWalletComponent, BoardIncomeComponent, LevelIncomeComponent, Board1Component, Board2Component, Board3Component, Board4Component, Board5Component, Board6Component, Board7Component, Board8Component, Board9Component, Board10Component, Board11Component, Board12Component, Board13Component, Board14Component, Board15Component, ReferralIncomeComponent, CpdashboardComponent, CpSupportComponent, CpAllUsersComponent, CpDepositsComponent, CpTransferComponent, CpWithdrawsComponent, SearchUsersByAdminComponent, RoyaltyUsersDataComponent, RoyaltyIncomeComponent, AddMisslianceComponent, InsideCompanyRegistrationComponent, AddNewsComponent, UniqueWalletsDataComponent, SearchUserdataEmployeeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule,
    QRCodeModule,ZXingScannerModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]  // ✅ allow <w3m-button>
})
export class HomeModule { }
