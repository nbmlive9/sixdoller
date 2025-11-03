import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';   // ✅ Correct import
import { AuthUserService } from '../service/auth-user.service';


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent {
@ViewChild('qrcodeElement', { static: false }) qrcodeElement!: ElementRef;

rdata:any;
pdata:any;
  qrData: string = '';
  constructor(private location: Location, private api:AuthUserService) {}
goBack() {
  this.location.back();
}

  copied: boolean = false;

  copyAddress() {
    navigator.clipboard.writeText(this.pdata.regid).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // hide after 2 sec
    });
  }

  ngOnInit(){
    this.receiveddata();
    this.api.Profile().subscribe((res:any)=>{
      // console.log('profile',res)
      this.pdata=res.data[0];
       this.qrData = this.pdata.regid;
    });
  }

  receiveddata() {
    this.api.RecivedWalletReport().subscribe((res: any) => {
      // console.log(res);
      this.rdata = res.data || []; // fallback to empty array
    });
  }

downloadQr() {
  // Find the canvas inside the QR code component container
  const qrContainer = document.querySelector('.qr-box') as HTMLElement;
  if (!qrContainer) {
    console.error('QR container not found!');
    return;
  }

  const canvas = qrContainer.querySelector('canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas not found inside QR container!');
    return;
  }

  // Convert canvas to data URL
  const dataUrl = canvas.toDataURL('image/png');

  // Trigger download
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'qr-code.png';
  link.click();
}

  

}
