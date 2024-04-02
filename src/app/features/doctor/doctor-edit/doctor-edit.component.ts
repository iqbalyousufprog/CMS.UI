import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { responseDoctorDto } from '../../../models/doctor.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../service/doctor.service';
import { ResponseObject } from '../../../base/base.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.css'
})
export class DoctorEditComponent {

  activatedRoute = inject(ActivatedRoute);
  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;
  responseDto?: responseDoctorDto;
  
  myForm: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    doctorName: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required])
  });;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private doctorService: DoctorService) {

  }

  ngOnInit(): void {
    this.myForm.get('id')?.disable();
    this.setIdFromActivatedRoute();
    console.log(this.id);
    this.getById();
  }

  async getById() {

    if (this.id) {
      const responseObject: ResponseObject<responseDoctorDto> =
        await this.doctorService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;

        this.myForm.patchValue(this.responseDto);
        console.log(this.myForm.value);

        if (responseObject.message && responseObject.message.trim() !== '') {
          console.log(responseObject.message);
        }
      }
      else {
        if (responseObject.message && responseObject.message.trim() !== '') {
          console.log(responseObject.message);
        }
      }
    }
  }

  setIdFromActivatedRoute() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
      }
    });
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
    if (this.id) {
      const responseObject: ResponseObject<responseDoctorDto> =
        await this.doctorService.update(this.id, this.myForm.value);

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
  }

  onDelete() {
    this.delete();
  }

  async delete() {
    if (this.id) {

      const responseObject: ResponseObject<responseDoctorDto> =
        await this.doctorService.detele(this.id);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm.reset();

        this.router.navigateByUrl('/admin/doctors');

        if (responseObject.message && responseObject.message.trim() !== '') {
          console.log(responseObject.message);
        }
      }
      else {
        if (responseObject.message && responseObject.message.trim() !== '') {
          console.log(responseObject.message);
        }
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/doctors')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }
}
