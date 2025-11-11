import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { Router } from '@angular/router';
import { BrowserProvider, Contract, parseUnits } from 'ethers';

declare var bootstrap: any;

@Component({
  selector: 'app-registration-home',
  templateUrl: './registration-home.component.html',
  styleUrls: ['./registration-home.component.scss']
})
export class RegistrationHomeComponent implements OnInit, AfterViewInit {

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

  ownerWallet = "0xe48384589Af4491B63cAD19f053e9cF648CdF206"; // Receiver Wallet
  tokenContract = "0x55d398326f99059fF775485246999027B3197955"; // USDT / Token Contract
  registrationUSD = 6; // $6 registration

  isConnecting = false;

  constructor(
    private fb: FormBuilder,
    private api: AuthUserService,
    private router: Router
  ) {
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

    // Subscribe wallet events if Web3Modal is injected
    const modal = (window as any).web3modal;
    if (modal) {
      modal.subscribeEvents((account: any) => {
        this.walletAddress = account?.address || '';
        this.form.patchValue({ walletaddress: this.walletAddress });
      });
    }
  }

  ngAfterViewInit() {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
  }

  // Fetch current Yohan coin price
  YohanPriceData() {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = Number(this.ypdata.coinvalue);
        console.log("Coin Value:", this.coinValue);
      },
      error: (err) => console.error(err)
    });
  }

  // Validate Sponsor ID
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
      (err) => {
        this.errorMessage = err.error?.message || 'Error fetching data';
        this.idselectmsg = '';
      }
    );
  }

  // Main registration workflow
  async startRegistration() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
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

      await this.registerUser();

    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Something went wrong!");
    } finally {
      this.loading = false;
    }
  }

  // Connect user wallet via Web3Modal
  async connectWallet() {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      const modal = (window as any).web3modal;
      if (!modal) throw new Error("Web3Modal not found");

      await modal.reset(); // Clear old sessions
      const session = await modal.open();

      const provider = new BrowserProvider(session.provider);
      this.signer = await provider.getSigner();

      this.walletAddress = await this.signer.getAddress();
      this.form.patchValue({ walletaddress: this.walletAddress });
      console.log("✅ Connected wallet:", this.walletAddress);

    } catch (err: any) {
      console.error("❌ Wallet connection error:", err.message || err);
      alert("Wallet connection failed!");
    } finally {
      this.isConnecting = false;
    }
  }

  get convertedYohanCoins(): string {
  if (!this.coinValue || this.coinValue <= 0) return '0';
  return (this.registrationUSD / this.coinValue).toFixed(6);
}

  // Pay USDT / Yohan token
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

  // Save registration to backend
  async registerUser() {
    this.successModal.show();

    const data = {
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      email: this.form.value.email,
      transno: this.form.value.transno,
      walletaddress: this.form.value.walletaddress,
      coins: this.form.value.coins,
    };

    this.api.HomeRegistration(data).subscribe({
      next: (res: any) => {
        this.udata = res.adddata;
      },
      error: (err) => {
        console.error(err);
        alert("Registration failed");
      }
    });
  }

  // Refresh page after success
  refreshPage() {
    this.successModal.hide();
    window.location.reload();
  }
}
