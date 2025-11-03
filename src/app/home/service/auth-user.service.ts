import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API ='https://bitraze.org/BTRZ/BTRZ/User/'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http:HttpClient, public token: TokenStorageService) { }

  UserRegistration(value: any){
    return this.http.post(
      AUTH_API + 'Register', value, {
        responseType: 'json',
      });
  }

   UserNameDisplay(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
      httpOptions
    );  
  }

    DashboardData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Home',
      httpOptions
    );
  }

  Profile(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Profile',
      httpOptions
    );
  }

  UpdateProfile(value: {
    email: string;
    password: string;
    name: string;
    wallet1: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Profile_Update',
      { 
        "email":value.email, 
        "password":value.password, 
        "name":value.name, 
        "wallet1":value.wallet1, 
      },
      httpOptions
    );
  }

  Referrals(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Directteam',
    httpOptions
  );   
}

ReferralsAllData(page: number, perPage: number) {
    const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Directteam?${pageDetails}`,
    httpOptions
  );
}

Activation(value: {
  package: string;
  regid: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Activate',
    { 
    "package":value.package, 
    "regid":value.regid,  
  },
     httpOptions 
  );
}

Topup(value: {
  package: string;
  regid: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Topup',
    { 
    "package":value.package, 
    "regid":value.regid,  
  },
     httpOptions 
  );
}

ActivationData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Activation_data',
    httpOptions
  );   
}

WalletTodayReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_TodayReport',
    httpOptions
  );   
}

WalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Report',
    httpOptions
  );   
}

WalletRoiReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Roi',
    httpOptions
  );   
}

WalletReportLoad(page: number, perPage: number) {
    const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Wallet_Report?${pageDetails}`,
    httpOptions
  );
}

TransferWallet(value: {
  amount: string;
  regid: string;
  transactionpassword:string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Wallet_Transefer',
    { 
    "amount":value.amount, 
    "regid":value.regid,  
     "transactionpassword":value.transactionpassword,  
  },
     httpOptions 
  );
}

SelfTransferWallet(value: {
  amount: number;
  waltype:string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Wallet_SelfTransefer',
    { 
    "amount":value.amount,  
    "waltype":value.waltype,  
  },
     httpOptions 
  );
}

TransferWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Transeferreport',
    httpOptions
  );   
}

RecivedWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Receivereport',
    httpOptions
  );   
}

GbonusWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Level_Bonus',
    httpOptions
  );   
}

GetPackages(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Packages',
    httpOptions
  );   
}

GetPckagesById(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Packagedata/'+id,
    httpOptions
  );   
}

DepositWallet(value: { amount: string, note: string, transno: string }) {
   const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.post(
     AUTH_API + 'Deposite',
    {
      amount: value.amount,
      note: value.note,
      transno: value.transno,
    },
    httpOptions
  );
}

  DepositeData() {
     const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    }),
    };
      return this.http.get(AUTH_API + 'User_Deposites', httpOptions);
  }


  levelMember() {
    const token1 = this.token.getToken();
 const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token1
   }),
   };
     return this.http.get(AUTH_API + 'Level_members', httpOptions);
 }



GenerateOtp() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
       return this.http.get(AUTH_API + 'GenerateOtp', httpOptions);
  }

  VerifyOtp(value: { otp: string }): Observable<any> {
    const token = this.token.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    // The OTP should be sent as body (POST), not as part of headers
    return this.http.post(AUTH_API + 'Verify_Otp', { otp: value.otp }, { headers });
  }


  WithdrawFunds(value: {
    amount: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Withdrawrequest',
      { 
        "amount":value.amount,
      },
      httpOptions
    );
  }

PendingWithdraw() {
    const token1 = this.token.getToken();
 const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token1
   }),
   };
     return this.http.get(AUTH_API + 'Withdrawrequestdata_pending', httpOptions);
 }

CompletedWithdraw() {
    const token1 = this.token.getToken();
 const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token1
   }),
   };
     return this.http.get(AUTH_API + 'Withdrawrequestdata_complete', httpOptions);
 }


 //Support Ticket Api
AddSupport(value: {
  query: string;
  subject: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Add_Supporttoken',
    { "query":value.query,
    "subject":value.subject,   
   },
     httpOptions 
  );
}

GetSupportTickets(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_Supporttokens',
    httpOptions
  );
}

 
}
