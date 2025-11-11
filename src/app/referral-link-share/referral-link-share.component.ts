import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserProvider, Contract, parseUnits,Signer } from 'ethers';
import Web3Modal from 'web3modal';
declare var bootstrap: any; // ✅ Bootstrap instance
@Component({
  selector: 'app-referral-link-share',
  templateUrl: './referral-link-share.component.html',
  styleUrls: ['./referral-link-share.component.scss']
})
export class ReferralLinkShareComponent {
 form: FormGroup;

  udata: any = null;
  regname: string = '';
  idselectmsg = '';
  errorMessage = '';

  walletAddress = '';
  signer: any;

  txHash = '';
  paymentDone = false;

  loading = false;
  successModal: any;

  coinValue = 0; // Current Yohan price in USD
  ypdata: any;

  // Receiver Wallet
  ownerWallet = "0xe48384589Af4491B63cAD19f053e9cF648CdF206";

  // USDT / Token Contract
  tokenContract = "0x55d398326f99059fF775485246999027B3197955";

  registrationUSD = 6;
  data1: any;
  id: any;

  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router, private activeroute:ActivatedRoute) {
    this.form = this.fb.group({
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      transno: [''],
      walletaddress: [''],
      coins: [''],
    });
  }

  ngOnInit() {
    this.YohanPriceData();
              this.id = this.activeroute.snapshot.params['regid'];
    this.api.UserNameDisplay(this.id).subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        this.data1 = res.data[0];
       this.form.get('sponcerid')!.setValue(this.data1.regid);
      }
    });
  }

  ngAfterViewInit() {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
  }

  YohanPriceData() {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = Number(this.ypdata.coinvalue); // convert to number
        console.log('Yohan price:', this.coinValue);
      },
      error: (err) => console.error(err)
    });
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

    get convertedYohanCoins(): string {
  if (!this.coinValue || this.coinValue <= 0) return '0';
  return (this.registrationUSD / this.coinValue).toFixed(6);
}

   // Start registration workflow
    async startRegistration() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
  
      await this.connectWallet();
      if (!this.walletAddress) {
        alert("Wallet not connected!");
        return;
      }
  
      await this.payToken();
      if (!this.paymentDone) {
        alert("Payment failed! Registration cancelled.");
        return;
      }
  
      this.registerUser();
    }
  
    // Connect wallet
    async connectWallet() {
      try {
        const web3Modal = new Web3Modal({ cacheProvider: true });
        const extProvider = await web3Modal.connect();
        const ethersProvider = new BrowserProvider(extProvider);
        this.signer = await ethersProvider.getSigner();
        this.walletAddress = await this.signer.getAddress();
         this.form.patchValue({ walletaddress: this.walletAddress });
        console.log("Wallet connected:", this.walletAddress);
      } catch (e) {
        console.error("Wallet connect error:", e);
        alert("Wallet connection failed.");
      }
    }
  
    // Pay USDT / Yohan
    async payToken() {
    if (!this.signer) throw new Error("Wallet not connected");
    if (!this.coinValue || this.coinValue <= 0) throw new Error("Invalid coin value");

    const amountInYohan = (this.registrationUSD / this.coinValue).toFixed(6);
    const decimals = 18; // Token decimals
    const tokenAmount = parseUnits(amountInYohan, decimals);

    this.form.patchValue({ coins: amountInYohan });

    const abi = ["function transfer(address to, uint256 amount) external returns (bool)"] as const;
    const contract = new Contract(this.tokenContract, abi, this.signer);

    const tx = await contract['transfer'](this.ownerWallet, tokenAmount, { gasLimit: 200000 });


    console.log("TX sent:", tx.hash);
    const receipt = await tx.wait();

    this.txHash = receipt.transactionHash;
    this.paymentDone = true;
    this.form.patchValue({ transno: this.txHash });

    alert(`Payment Successful: ${this.txHash}`);
  }
  
    // Register user (without amount)
    registerUser() {
      this.loading = true;
      this.successModal.show();
  
      const data = {
        sponcerid: this.form.value.sponcerid,
        name: this.form.value.name,
        email: this.form.value.email,
        transno: this.form.value.transno
      };
  
      this.api.HomeRegistration(data).subscribe({
        next: (res: any) => {
          this.udata = res.adddata;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert("Registration failed");
        }
      });
    }
  
    refreshPage() {
      this.successModal.hide();
      window.location.reload();
    }

}
