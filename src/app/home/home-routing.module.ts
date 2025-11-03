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
import { BuyLiteComponent } from './buy-lite/buy-lite.component';
import { BuyProComponent } from './buy-pro/buy-pro.component';
import { BuyMaxComponent } from './buy-max/buy-max.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { ReferralsAllDataComponent } from './referrals-all-data/referrals-all-data.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';
import { WalletRoiReportComponent } from './wallet-roi-report/wallet-roi-report.component';
import { PromotionBonusComponent } from './promotion-bonus/promotion-bonus.component';
import { WithdrawReportsComponent } from './withdraw-reports/withdraw-reports.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'receive', component: ReceiveComponent },
  { path: 'transfer', component: TransferAmountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'team', component: DirectTeamComponent },
  { path: 'report', component: ReportComponent },
  { path: 'bitraze-lite', component: BuyLiteComponent },
  { path: 'bitraze-pro', component: BuyProComponent },
  { path: 'bitraze-max', component: BuyMaxComponent },
  { path: 'myreferrals', component: ReferralsComponent },
  { path: 'allreferrals', component: ReferralsAllDataComponent },
  { path: 'selftransfer', component: SelfTransferComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'walletri', component: WalletRoiReportComponent },
  { path: 'btzbonus', component: PromotionBonusComponent },
  { path: 'withdrawreport', component: WithdrawReportsComponent },
    { path: 'support', component: SupportTicketComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
