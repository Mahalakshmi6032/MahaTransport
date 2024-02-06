import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  feedForm!: FormGroup;
  constructor(private fb: FormBuilder,private http: HttpClient){}
  ngOnInit(): void {
    this.initForm(); 
  }
  initForm() {
    this.feedForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
}
feeddata(){
  this.http.post(" http://localhost:3000/feeds", this.feedForm.value).subscribe(res => {
    console.log(this.feedForm.value);
    alert("Submit successful");
  });
}
}



