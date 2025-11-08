import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-cp-support',
  templateUrl: './cp-support.component.html',
  styleUrls: ['./cp-support.component.scss']
})
export class CpSupportComponent {
form:FormGroup;
  modalRef: any;
    selectedTicket: any;
  pdata: any;
    pageSize = 10; // items per page
  currentPage = 1;
  totalPages = 0;
    data1: any[] = [];
  pagedData: any[] = [];
  constructor(private api: AuthUserService, private fb:FormBuilder, private router:Router) {
        this.form = this.fb.group({
      reply: ['', Validators.required],
    });
  }
  
  ngOnInit() {
     this.completedData();
     this.PendingData();
  }

  PendingData(){
    this.api.PendingTickets().subscribe((res:any)=>{
      console.log('pending',res);
      this.pdata=res.data;
    })
  }

  completedData(){
       this.api.CompletedTickets().subscribe((res: any) => {
        console.log('complete',res);
      this.data1 = res.data || [];
      this.totalPages = Math.ceil(this.data1.length / this.pageSize);
      this.setPagedData();
    });
  }

    setPagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.data1.slice(startIndex, endIndex);
  }
  
  gotoPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPagedData();
  }

   replay(ticketIdOrItem: any) {
  // If full item passed:
  if (typeof ticketIdOrItem === 'object') {
    this.selectedTicket = ticketIdOrItem;

      const modalEl = document.getElementById('replayticket');
  this.modalRef = new bootstrap.Modal(modalEl);
  this.modalRef.show();

  } else {
    // If only id is passed, find the ticket from your data array
    this.selectedTicket = this.pdata.find((t:any)=> t.id === ticketIdOrItem);
  }
}

closeModal() {
  if (this.modalRef) {
    this.modalRef.hide();
    this.modalRef.dispose(); // ✅ dispose modal completely
      this.reloadPage();
    document.body.classList.remove('modal-open'); // ✅ remove body state
    document.querySelectorAll('.modal-backdrop')
      .forEach(el => el.remove()); // ✅ remove black overlay
  }
}

// Handle form submission
submitReplay() {
  if (this.form.valid && this.selectedTicket) {
    const replyContent = this.form.get('reply')?.value;
    const val = { reply: replyContent };

    this.api.UpdateTicket(this.selectedTicket.id, val).subscribe({
      next: (res) => {
        // Close modal cleanly
        if (this.modalRef) {
          this.modalRef.hide();
          this.modalRef.dispose();
        }

        // Remove backdrop manually
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

        // Reset form
        this.form.reset();

        // Reload page after small delay for smooth transition
        setTimeout(() => {
          this.reloadPage();
        }, 500);
      },
      error: (err) => {
        console.error('Error updating ticket:', err);
      }
    });
  }
}

reloadPage() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/adminsupport']);
  });
}



}
