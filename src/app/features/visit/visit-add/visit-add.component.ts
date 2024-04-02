import { Component, OnInit } from '@angular/core';
import { requestVisitDto, responseVisitDto } from '../../../models/visit.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitService } from '../service/visit.service';
import { Router, RouterModule } from '@angular/router';
import { ResponseObject } from '../../../base/base.model';
import { responsePatientDto } from '../../../models/patient.model';
import { PatientService } from '../../patient/service/patient.service';
import { CommonModule } from '@angular/common';
import { convertToDateTime } from '../../../shared/utility';

@Component({
  selector: 'app-visit-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './visit-add.component.html',
  styleUrl: './visit-add.component.css'
})
export class VisitAddComponent implements OnInit {

  responseDto?: responseVisitDto;
  responsePatientDtos?: responsePatientDto[];

  myForm: FormGroup = this.formBuilder.group({
    patientId: new FormControl('', [Validators.required]),
    visitDate: new FormControl('', [Validators.required]),
    visitTime: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private visitService: VisitService,
    private patientService: PatientService) {
  }
  ngOnInit(): void {
    this.getAllPatients();
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

  onSubmit() {
    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {

    this.myForm.controls["visitTime"]
      .setValue(convertToDateTime(this.myForm.controls['visitDate'].value,
        this.myForm.controls['visitTime'].value));

    const responseObject: ResponseObject<responseVisitDto> =
      await this.visitService.add(this.myForm.value);

    if (responseObject.isSuccess) {

      this.responseDto = responseObject.result;
      this.myForm.reset();

      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }

      this.router.navigateByUrl('admin/visits');
    }
    else {
      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/visits')
  }
}
