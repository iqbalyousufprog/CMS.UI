import { Component, OnInit } from '@angular/core';
import { responsePatientDto } from '../../../models/patient.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { ResponseObject } from '../../../base/base.model';
import { responseDiseaseDto } from '../../../models/disease.model';
import { DiseaseService } from '../../disease/service/disease.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.css'
})
export class PatientAddComponent implements OnInit {

  responseDto?: responsePatientDto;
  responseDiseaseDtos?: responseDiseaseDto[];

  myForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    diseases: new FormControl<Number[]>([])
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private diseaseService: DiseaseService) {
  }

  ngOnInit(): void {
    this.getAllDiseases();
  }

  async getAllDiseases() {
    const responseObject: ResponseObject<responseDiseaseDto[]> =
      await this.diseaseService.getAll();

    if (responseObject.isSuccess) {
      this.responseDiseaseDtos = responseObject.result;

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

    console.log(this.myForm.value);
    const responseObject: ResponseObject<responsePatientDto> =
      await this.patientService.add(this.myForm.value);

    if (responseObject.isSuccess) {

      this.responseDto = responseObject.result;
      this.myForm.reset();

      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }

      this.router.navigateByUrl('admin/patients');
    }
    else {
      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/patients')
  }
}
