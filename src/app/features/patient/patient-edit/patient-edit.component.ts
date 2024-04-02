import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from '../service/patient.service';
import { DiseaseService } from '../../disease/service/disease.service';
import { responseDiseaseDto } from '../../../models/disease.model';
import { ResponseObject } from '../../../base/base.model';
import { responsePatientDto } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit {

  responseDto?: responsePatientDto;
  responseDiseaseDtos?: responseDiseaseDto[];

  activatedRoute = inject(ActivatedRoute);
  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;

  myForm: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
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
    this.setIdFromActivatedRoute();
    this.getById();
    this.myForm.controls['id']?.disable();
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

  setIdFromActivatedRoute() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
      }
    });
  }

  async getById() {

    if (this.id) {
      const responseObject: ResponseObject<responsePatientDto> =
        await this.patientService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;
        console.log(this.responseDto);
        
        this.myForm.patchValue(this.responseDto);
        this.myForm.controls["diseases"].setValue(this.responseDto.diseases.map(m => m.id));
        console.log("this.myForm.value");
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
      const responseObject: ResponseObject<responsePatientDto> =
        await this.patientService.update(this.id, this.myForm.value);

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
  }

  onDelete() {
    this.delete();
  }

  async delete() {
    if (this.id) {

      const responseObject: ResponseObject<responsePatientDto> =
        await this.patientService.detele(this.id);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm.reset();

        this.router.navigateByUrl('/admin/patients');

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
    this.router.navigateByUrl('/admin/patients')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }
}
