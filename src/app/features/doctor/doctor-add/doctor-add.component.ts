import { Component } from '@angular/core';
import { responseDoctorDto } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../service/doctor.service';
import { ResponseObject } from '../../../base/base.model';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.css'
})
export class DoctorAddComponent {

  responseDto?: responseDoctorDto;

  myForm: FormGroup = this.formBuilder.group({
    doctorName: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private doctorService: DoctorService) {
  }
  
  onSubmit() {
    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {

    console.log(this.myForm.value);
    const responseObject: ResponseObject<responseDoctorDto> =
      await this.doctorService.add(this.myForm.value);

    if (responseObject.isSuccess) {

      this.responseDto = responseObject.result;
      this.myForm.reset();

      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }

      this.router.navigateByUrl('admin/doctors');
    }
    else {
      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/doctors')
  }
}
