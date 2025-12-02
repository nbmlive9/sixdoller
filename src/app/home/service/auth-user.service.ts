import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';


const AUTH_API ='https://yohanrise.com/SHNKM6/SHNKM6/User/'


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http:HttpClient, public token: TokenStorageService) { }

HomeRegistration(value: any){
    return this.http.post(
      AUTH_API + 'Register_Front', value, {
        responseType: 'json',
      });
  }

  InsideCompanyRegistration(value: {
    email: string;
    sponcerid: string;
    name: string;
    regid:string;
    password:string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Register_Direct',
      { 
        "email":value.email, 
        "sponcerid":value.sponcerid, 
        "name":value.name, 
        "regid":value.regid, 
        "password":value.name,
      },
      httpOptions
    );
  }

  UserRegistration(value: {
    email: string;
    sponcerid: string;
    name: string;
    coins:number;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Register',
      { 
        "email":value.email, 
        "sponcerid":value.sponcerid, 
        "name":value.name, 
        "coins":value.coins, 
      },
      httpOptions
    );
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
       securepin:number;
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
          "securepin":value.securepin, 
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
  wallettype:string;
  remark:string;
     securepin:number;
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
     "wallettype":value.wallettype,  
     "remark":value.remark,
         "securepin":value.securepin
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

BoardIncomeReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Board_income',
    httpOptions
  );   
}

LevelMembersReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Level_members',
    httpOptions
  );   
}

WalletLevelAndReferralReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Sponsor',
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

DepositWallet(value: { amount: string, note: string, transno: string, userid:string; }) {
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
      userid:value.userid
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

  YohanPrice(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_ROidynamicpaymentout',
    httpOptions
  );   
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


  // WithdrawFunds(value: {
  //   amount: string;
  // }) {
  //   const token1 = this.token.getToken();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token1
  //     })
  //   };
  //   return this.http.post(
  //     AUTH_API + 'Withdrawrequest',
  //     { 
  //       "amount":value.amount,
  //     },
  //     httpOptions
  //   );
  // }

  withdrawToBlockchain(value: {
  recipient: string;
  amount:number;
  flag:number;
}) {

  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Yohanpayout', 

   {
    recipient:value.recipient,
        amount: value.amount,
        flag:value.flag,
      },
    httpOptions
  );

}

GetRewardCount() {
     const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    }),
    };
      return this.http.get(AUTH_API + 'User_Director', httpOptions);
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

GetBoard1(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardone_Data',
      httpOptions
    );
  }

  GetBoard2(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardtwo_Data',
      httpOptions
    );
  }

  GetBoard3(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardthree_Data',
      httpOptions
    );
  }

  GetBoard4(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardfour_Data',
      httpOptions
    );
  }

  GetBoard5(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardfive_Data',
      httpOptions
    );
  }

  GetBoard6(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardsix_Data',
      httpOptions
    );
  }

  GetBoard7(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardseven_Data',
      httpOptions
    );
  }

  GetBoard8(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardeight_Data',
      httpOptions
    );
  }

  GetBoard9(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardnine_Data',
      httpOptions
    );
  }

  GetBoard10(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardten_Data',
      httpOptions
    );
  }

  GetBoard11(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Boardeleven_Data',
      httpOptions
    );
  }

  GetBoard12(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'BoardTwelve_Data',
      httpOptions
    );
  }

   GetBoard13(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'BoardThirteen_Data',
      httpOptions
    );
  }

   GetBoard14(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'BoardFourteen_Data',
      httpOptions
    );
  }

   GetBoard15(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'BoardFifteen_Data',
      httpOptions
    );
  }

  GetRoyaltyIncome(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Royalty_Income',
      httpOptions
    );
  }


  //Company Dashboard

  CompanyDashboard(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Dashboard',
      httpOptions
    );
  }

    YohanAdminPrice(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_ROidynamicpayment',
    httpOptions
  );   
}

UpdateCoinValueData(value: {
  coinvalue:number;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Roivalue_Update', 

   {
        coinvalue:value.coinvalue,
      },
    httpOptions
  );
}

PendingTickets(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Pending_Supporttokens',
    httpOptions
  );
}

UpdateTicket(id: string, value: {
  reply: string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.put(
    `${AUTH_API}Supporttoken_update/${id}`,  
    {
      reply: value.reply,
    },
    httpOptions
  );
}

CompletedTickets(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Completed_Supporttokens',
    httpOptions
  );
}

SearchUserData(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Userdatabynameormobile/' + id,
    httpOptions
  );   
}

SearchDatabyUser(qry:string) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Total_Memebers?q=${qry}`,
    httpOptions
  );
}

cupdateprofile(id: string, value: {
   password: string;
  name: string;
  email: string;
  wallet1: string;
  securepin:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.put(
    `${AUTH_API}Userprofile_Update/${id}`,  
    {
      password:value.password,
      name: value.name,
      email: value.email,
      wallet1: value.wallet1,
      securepin:value.securepin
    },
    httpOptions
  );
}

  totalusers(page: number = 1) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.get(`${AUTH_API}Total_users?page=${page}`, httpOptions);
}

TotalUsersNoPage(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Memebers',
    httpOptions
  );
}

DepositeReports(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Deposites',
    httpOptions
  );
}

TransferReportAdmin(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Transfers',
    httpOptions
  );
}

WithdrawReportAdmin(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Withdraws',
    httpOptions
  );
}

StarRoyalUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Starroyal',
    httpOptions
  );
}

SilverRoyalUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Silverroyal',
    httpOptions
  );
}

GoldRoyalUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Goldroyal',
    httpOptions
  );
}

DiamondRoyalUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Diamondroyal',
    httpOptions
  );
}

StarPay(value: {
  amount: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Star_Pay',
    { 
    "amount":value.amount
  },
     httpOptions 
  );
}

SilverPay(value: {
  amount: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Silver_Pay',
    { 
    "amount":value.amount
  },
     httpOptions 
  );
}

GoldPay(value: {
  amount: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Gold_Pay',
    { 
    "amount":value.amount
  },
     httpOptions 
  );
}

DiamondPay(value: {
  amount: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Diamond_Pay',
    { 
    "amount":value.amount
  },
     httpOptions 
  );
}

SecurePinUpdate(value: {
        securepin: number;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Securepinupdate',
      { 
          "securepin":value.securepin, 
      },
      httpOptions
    );
  }

  RoyaltyIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Royalty_income',
    httpOptions
  );
}

 AddMislliance(value: {
    amount: number;
    remark: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'AddMiscellaneous',
      { 
        "amount":value.amount, 
        "remark":value.remark,
      },
      httpOptions
    );
  }

    GetMisllianceData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Miscellaneous',
    httpOptions
  );
}

forgotPassword(value: { regid: string; email: string }): Observable<any> {
  return this.http.post(AUTH_API + 'Forget_password', {
    regid: value.regid,
    email: value.email
  });
}

// News APi
  addNews(value: {
    news_title: string;
    news: string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Add_News',
      { "news_title":value.news_title,
      "news":value.news,   
     },
       httpOptions 
    );
  }

  GetNews(){
    return this.http.get(
      AUTH_API + 'Get_News',
    );
  }

  // GetNews(){
  //   const token1 = this.token.getToken();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token1
  //     })
  //   }
  //   return this.http.get(
  //     AUTH_API + 'Get_News',
  //     httpOptions
  //   );
  // }

  DeleteNews(id:any){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Deletenews/'+id,
      httpOptions
    );
  }

  GetUniqeWallet(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Wallet_Count',
      httpOptions
    );
  }

 
}
