import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { responseconsultationDto } from '../../../models/consultation.model';
import { responsePatientDto } from '../../../models/patient.model';
import { responseDoctorDto } from '../../../models/doctor.model';
import { ConsultationService } from '../service/consultation.service';
import { PatientService } from '../../patient/service/patient.service';
import { DoctorService } from '../../doctor/service/doctor.service';
import { ResponseObject } from '../../../base/base.model';
import { convertToDateTime } from '../../../shared/utility';
import { DepartmentService } from '../../department/service/department.service';
import { responseDepartmentDto } from '../../../models/department.model';

@Component({
  selector: 'app-consultation-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './consultation-add.component.html',
  styleUrl: './consultation-add.component.css'
})
export class ConsultationAddComponent {

  responseDto?: responseconsultationDto;
  responsePatientDtos?: responsePatientDto[];
  responseDoctorDtos?: responseDoctorDto[];
  responseDepartmentDtos?: responseDepartmentDto[];

  myForm: FormGroup = this.formBuilder.group({
    patientId: new FormControl('', [Validators.required]),
    doctorId: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    consultationDate: new FormControl('', [Validators.required]),
    consultationTime: new FormControl('', [Validators.required]),
    remarks: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private dctorService: DoctorService,
    private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllDoctors();
    this.getAllDepartments();
  }

  async getAllPatients() {
    const responseObject: ResponseObject<responsePatientDto[]> =
      await this.patientService.getAll();

    if (responseObject.isSuccess) {
      this.responsePatientDtos = responseObject.result;

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

  async getAllDoctors() {
    const responseObject: ResponseObject<responseDoctorDto[]> =
      await this.dctorService.getAll();

    if (responseObject.isSuccess) {
      this.responseDoctorDtos = responseObject.result;

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

  async getAllDepartments() {
    const responseObject: ResponseObject<responseDepartmentDto[]> =
      await this.departmentService.getAll();

    if (responseObject.isSuccess) {
      this.responseDepartmentDtos = responseObject.result;

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
  
  onSubmit() {
    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {

    this.myForm.controls["consultationTime"]
      .setValue(convertToDateTime(this.myForm.controls['consultationDate'].value,
        this.myForm.controls['consultationTime'].value));

    const responseObject: ResponseObject<responseconsultationDto> =
      await this.consultationService.add(this.myForm.value);

    if (responseObject.isSuccess) {

      this.responseDto = responseObject.result;
      this.myForm.reset();

      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }

      this.router.navigateByUrl('admin/consultations');
    }
    else {
      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/consultations')
  }
}
