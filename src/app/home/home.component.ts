import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  quoteForm!: FormGroup;
  loadTypes: string[] = ['Full', 'Part'];
  pickupLocations: string[] = ['MSS Office', 'Door Step'];
  trackedParcel: any;
  trackBillNumber: string = '';

  constructor(private fb: FormBuilder,private http: HttpClient, private router:Router)  {}
  ngOnInit(): void {
    this.initForm(); 
  }
  initForm() {
    this.quoteForm = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      parcelDetail: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      loadType: ['Full', Validators.required],
      pickupLocation: ['MSS Office', Validators.required],
      dropLocation: [''],
      weight: ['', [Validators.required, Validators.min(0.1)]]
    });
  }
  postdata() {
    this.http.post(" http://localhost:3000/posts", this.quoteForm.value).subscribe(res => {
    console.log(this.quoteForm.value);
    alert("Submit successful");
  });
}
navigation(){
  this.router.navigate(['/about']);
}
trackParcel() {
  if (this.trackBillNumber) {
    this.http.get(`http://localhost:3000/posts?billNumber=${this.trackBillNumber}`).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.trackedParcel = data[0];
        } else {
          alert('Parcel not found.');
        }
      },
      (error) => {
        console.error('Error fetching parcel:', error);
      }
    );
  }
}
}



