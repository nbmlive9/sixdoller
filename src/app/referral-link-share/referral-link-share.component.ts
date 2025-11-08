import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ethers } from 'ethers';
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
  regname: any = '';
  idselectmsg = '';
  errorMessage = '';
  walletAddress = '';
  provider: any;
  signer: any;
  txHash = '';
  paymentDone = false;
  loading = false;
  successModal: any;
  coinValue = 0; // Yohan coin price
  ypdata: any;

  ownerWallet = '0xYOUR_RECEIVE_WALLET';
  data1: any;
  id: any;

  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router, private activeroute:ActivatedRoute) {
    this.form = this.fb.group({
      sponcerid: ['',],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
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

  async startRegistration() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 1️⃣ Connect wallet
    await this.connectWallet();
    if (!this.walletAddress) {
      alert('Wallet not connected!');
      return;
    }

    // 2️⃣ Pay with Yohan coins
    await this.payYohanCoin();
    if (!this.paymentDone) {
      alert('Payment failed. Registration canceled.');
      return;
    }

    // 3️⃣ Register user after payment
    this.registerUser();
  }

  // Connect wallet using Web3Modal
  async connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
      });
      this.provider = await web3Modal.connect();
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      this.signer = await ethersProvider.getSigner();
      this.walletAddress = await this.signer.getAddress();
      console.log('Wallet connected:', this.walletAddress);
    } catch (err) {
      console.error('Wallet connect error:', err);
      alert('Wallet connection failed');
    }
  }

  // Pay Yohan coins (6$ = 6 / coinValue)
  async payYohanCoin() {
  try {
    if (!this.signer) return alert('Wallet not connected');
    if (!this.coinValue || this.coinValue <= 0) return alert('Invalid Yohan coin price');

    const amountYohan = 6 / this.coinValue;

    const contractAddress = '0xYOHANCOINCONTRACT'; // replace
    const abi = ['function transfer(address to, uint256 amount) public returns (bool)'];
    const contract = new ethers.Contract(contractAddress, abi, this.signer);

    // ✅ Use bracket notation
    const tx = await contract['transfer'](
      this.ownerWallet,
      ethers.parseUnits(amountYohan.toFixed(6), 6)
    );

    const receipt = await tx.wait();
    this.txHash = receipt.transactionHash;
    this.paymentDone = true;
    alert(`✅ Payment successful! ${amountYohan.toFixed(6)} YOHAN sent.`);
  } catch (err) {
    console.error(err);
    this.paymentDone = false;
    alert('Payment failed');
  }
}


  registerUser() {
    this.loading = true;
    this.successModal.show();

    const data = {
      ...this.form.value,
      walletaddress: this.walletAddress,
      txid: this.txHash
    };

    this.api.HomeRegistration(data).subscribe({
      next: (res: any) => {
        this.udata = res.adddata;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Registration failed');
      }
    });
  }

  refreshPage() {
    this.successModal.hide();
    window.location.reload();
  }

}
