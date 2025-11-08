import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-registration-home',
  templateUrl: './registration-home.component.html',
  styleUrls: ['./registration-home.component.scss']
})
export class RegistrationHomeComponent {
  form: FormGroup;
  udata: any = null;
  regname: any = '';
  idselectmsg = '';
  errorMessage = '';

  successModal: any;
 errorModal: any;
  pfdata: any;
loading: boolean = false;
  lastTxId: any;
  ypdata: any;
  coinValue: number = 0;
  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router) {
    this.form = this.fb.group({
      sponcerid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  
    ngOnInit() {
  this.getProfiledata();
  this.YohanPriceData();
  }

    getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

YohanPriceData() {
  this.api.YohanPrice().subscribe({
    next: (res: any) => {
      this.ypdata = res.data;
      this.coinValue = Number(this.ypdata.coinvalue); // ✅ Convert to number
      console.log("Yohan Price:", this.coinValue);
    },
    error: (err) => {
      console.error('Error fetching Yohan price:', err);
    }
  });
}



ngAfterViewInit() {
  const successEl = document.getElementById('successModal');
  if (successEl) this.successModal = new bootstrap.Modal(successEl);
}

onRegisterIdSelect(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res: any) => {
        if (res?.data?.length) {
          this.regname = res.data[0].name;
          this.idselectmsg = `Name: ${this.regname}`;
          this.errorMessage = '';
        } else {
          this.idselectmsg = 'Referral ID Not Available';
          this.regname = '';
        }
      },
      (err: any) => {
        this.errorMessage = err.error?.message || 'Error fetching data';
        this.idselectmsg = '';
      }
    );
  }

  walletConnected: boolean = false;
walletAddress: string = '';
paymentDone: boolean = false;

// ✅ Connect Wallet
async connectWallet() {
  try {
    if (!(window as any).tronWeb) {
      alert("Tron/Yohan Wallet not detected! Please open in DApp browser.");
      return;
    }

    const tron = (window as any).tronWeb;

    this.walletAddress = tron.defaultAddress.base58;
    this.walletConnected = true;

    console.log("Wallet Connected:", this.walletAddress);
  } 
  catch (err) {
    console.error("Wallet Connect Error:", err);
  }
}

// ✅ PAYMENT LOGIC
async makePayment() {
  try {
    if (!this.walletConnected) {
      alert("Please connect wallet first");
      return;
    }

    if (!this.coinValue || this.coinValue <= 0) {
      alert("Invalid Yohan price. Try again.");
      return;
    }

    const tron = (window as any).tronWeb;

    const amount = this.coinValue;  // ✅ dynamic amount
    const receivingWallet = "TSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Replace with your wallet

    const tx = await tron.transactionBuilder.sendTrx(
      receivingWallet,
      amount * 1e6  // ✅ convert TRX/Yohan to Sun
    );

    const signedTx = await tron.trx.sign(tx);
    const broadcast = await tron.trx.sendRawTransaction(signedTx);

    if (broadcast?.result) {
      this.paymentDone = true;
      this.lastTxId = broadcast.txid;  // ✅ save for backend
      alert(`✅ Payment Successful!\nTX: ${broadcast.txid}`);
    } 
    else {
      alert("❌ Payment failed");
    }
  }
  catch (err) {
    console.error(err);
    alert("Payment error");
  }
}



  // 🔹 Submit form
userSubmit() {
  if (!this.paymentDone) {
    alert("Please complete payment first!");
    return;
  }

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.udata = null;

  this.successModal.show();

  const val = {
    ...this.form.value,
    walletaddress: this.walletAddress,   // ✅ Save wallet
    txid: this.lastTxId                  // ✅ Save blockchain tx
  };

  this.api.HomeRegistration(val).subscribe(
    (res: any) => {
      if (res?.adddata) {
        this.udata = res.adddata;
      } else {
        this.showErrorModal("Registration failed");
      }

      this.loading = false;
      this.form.reset();
    },
    (err: any) => {
      this.loading = false;
      this.showErrorModal(err.error?.message || "Registration failed");
    }
  );
}


refreshPage() {
  this.successModal.hide();
  window.location.reload();
}


  showErrorModal(message: string) {
    this.errorMessage = message;
    if (this.errorModal) this.errorModal.show();
  }

}
