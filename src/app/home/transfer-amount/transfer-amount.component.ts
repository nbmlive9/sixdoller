import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BrowserQRCodeReader } from '@zxing/browser';

declare var bootstrap: any;

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss']
})
export class TransferAmountComponent {
  pfdata: any;
  idselectmsg: string = '';
  regname: any;
  successMessage: string = '';
  errorMessage: string = '';
  form: FormGroup;
  tdata: any = [];

  // QR Scanner Config
  qrCodeValue: string = '';
  allowedFormats = [BarcodeFormat.QR_CODE];

  videoConstraints = {
    facingMode: { exact: 'environment' } // Use back camera
  };

  successTransferModal: any;
loadingModal: boolean = false;

  constructor(
    private location: Location,
    private api: AuthUserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      regid: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      wallettype: new FormControl('', [Validators.required]),
      remark:new FormControl('User Transfer'),
    });
  }

  Back() {
    this.location.back();
  }

  ngOnInit() {
    // Get QR Code value from URL
    this.qrCodeValue = this.route.snapshot.paramMap.get('id') || '';
    if (this.qrCodeValue) {
      this.form.patchValue({ regid: this.qrCodeValue });
    }

    this.getProfiledata();
    this.loadTransferTransactions();
  }

  /** Load Profile Data */
  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
    });
  }

  /** Load Transfer Transactions */
  loadTransferTransactions() {
    this.api.TransferWalletReport().subscribe((res: any) => {
      this.tdata = res.data;
    });
  }

  /** When user types or QR code fills regid */
  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4?.data?.length) {
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name}`;
          this.errorMessage = '';
        } else {
          this.regname = null;
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error?.message || 'Error fetching user data';
        this.regname = null;
        this.idselectmsg = '';
      }
    );
  }

  /** Open QR Scanner Modal */
  // openScanner() {
  //   const modalElement = document.getElementById('qrScannerModal');
  //   const modal = new bootstrap.Modal(modalElement);
  //   modal.show();
  // }

  /** When QR Code is successfully scanned */
  // onScanSuccess(result: string) {
  //   this.form.patchValue({ regid: result });
  //   this.onRegisterIdSelect({ target: { value: result } });

  //   // Close modal automatically
  //   const modalElement = document.getElementById('qrScannerModal');
  //   const modal = bootstrap.Modal.getInstance(modalElement);
  //   modal.hide();
  // }

  /** Upload Image & Decode QR Code */
  // async onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     const codeReader = new BrowserQRCodeReader();
  //     const imgUrl = URL.createObjectURL(file);

  //     const result = await codeReader.decodeFromImageUrl(imgUrl);

  //     if (result?.getText()) {
  //       const scannedRegId = result.getText();
  //       this.form.patchValue({ regid: scannedRegId });
  //       this.onRegisterIdSelect({ target: { value: scannedRegId } });
  //     } else {
  //       alert('No QR code detected in the image.');
  //     }
  //   } catch (error) {
  //     alert('Unable to read QR code from image.');
  //   }
  // }

  ngAfterViewInit() {
  const modalEl = document.getElementById('successTransferModal');
  if (modalEl) {
    this.successTransferModal = new bootstrap.Modal(modalEl);
  }
}

  /** Transfer Amount */
 Transfer() {
  if (this.form.invalid) return;

  const payload = {
    regid: this.form.value.regid,
    amount: this.form.value.amount,
    wallettype: this.form.value.wallettype,
    remark: this.form.value.remark,
  };

  this.loadingModal = true;
  this.successMessage = '';
  this.errorMessage = '';

  this.successTransferModal.show(); // ✅ Open modal immediately

  this.api.TransferWallet(payload).subscribe(
    (res: any) => {
      this.loadingModal = false;
      this.successMessage = 'Amount transferred successfully! ✅';
      this.form.reset();
      this.loadTransferTransactions();

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500); // ✅ Auto close after 3 sec
    },
    (err: any) => {
      this.loadingModal = false;
      this.errorMessage = 'Transfer failed. Please try again. ❌';

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500);
    }
  );
}


  reloadComponent() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/transfer']);
  });
}


}
