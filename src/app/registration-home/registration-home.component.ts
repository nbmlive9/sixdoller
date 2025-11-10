import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { Router } from '@angular/router';
import { BrowserProvider, Contract, parseUnits,Signer } from 'ethers';
import Web3Modal from 'web3modal';

declare var bootstrap: any;

@Component({
  selector: 'app-registration-home',
  templateUrl: './registration-home.component.html',
  styleUrls: ['./registration-home.component.scss']
})
export class RegistrationHomeComponent {

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

  registrationUSD = 6; // $6 registration

  constructor(
    private fb: FormBuilder,
    private api: AuthUserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      transno: [''] // transaction hash will be saved here
    });
  }

  ngOnInit() {
    this.YohanPriceData();
  }

  ngAfterViewInit() {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
  }

  // Fetch Yohan coin price
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
      console.log("Wallet connected:", this.walletAddress);
    } catch (e) {
      console.error("Wallet connect error:", e);
      alert("Wallet connection failed.");
    }
  }

  // Pay USDT / Yohan
  async payToken() {
    try {
      if (!this.signer) return alert("Wallet not connected");

      // Convert $6 to Yohan tokens using current coin value
      if (!this.coinValue || this.coinValue <= 0) {
        alert("Invalid coin value for payment!");
        return;
      }

      const amountInYohan = (this.registrationUSD / this.coinValue).toFixed(6);
      const decimals = 18;
      const tokenAmount = parseUnits(amountInYohan, decimals);

      const abi = ["function transfer(address to, uint256 amount) external returns (bool)"];
      const contract = new Contract(this.tokenContract, abi, this.signer);

      const tx = await contract["transfer"](this.ownerWallet, tokenAmount, { gasLimit: 200000 });

      console.log("TX sent:", tx.hash);

      const receipt = await tx.wait();
      this.txHash = receipt.hash;
      this.paymentDone = true;

      // Save transaction hash to form (amount not sent)
      this.form.patchValue({ transno: this.txHash });
      alert(`Payment Successful: ${this.txHash}`);

    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err?.reason || err?.data?.message || "Payment failed");
      this.paymentDone = false;
    }
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
