import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReceiveComponent } from './receive/receive.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DepositComponent } from './deposit/deposit.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { ReportComponent } from './report/report.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { ReferralsAllDataComponent } from './referrals-all-data/referrals-all-data.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { WalletRoiReportComponent } from './wallet-roi-report/wallet-roi-report.component';

import { WithdrawReportsComponent } from './withdraw-reports/withdraw-reports.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ReceivedWalletComponent } from './received-wallet/received-wallet.component';
import { BoardIncomeComponent } from './board-income/board-income.component';
import { LevelIncomeComponent } from './level-income/level-income.component';
import { ReferralIncomeComponent } from './referral-income/referral-income.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
    { path: 'sign', component: SignUpComponent },
  { path: 'receive', component: ReceiveComponent },
  { path: 'transfer', component: TransferAmountComponent },
    { path: 'received', component: ReceivedWalletComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'team', component: DirectTeamComponent },
  { path: 'report', component: ReportComponent },
  { path: 'boardincome', component: BoardIncomeComponent },
  { path: 'levelincome', component: LevelIncomeComponent },
   { path: 'rfincome', component: ReferralIncomeComponent },

  { path: 'myreferrals', component: ReferralsComponent },
  { path: 'allreferrals', component: ReferralsAllDataComponent },
  { path: 'selftransfer', component: SelfTransferComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'walletri', component: WalletRoiReportComponent },

  { path: 'withdrawreport', component: WithdrawReportsComponent },
    { path: 'support', component: SupportTicketComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
