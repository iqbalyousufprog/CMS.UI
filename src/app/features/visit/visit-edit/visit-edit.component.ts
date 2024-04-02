import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { responseVisitDto } from '../../../models/visit.model';
import { responsePatientDto } from '../../../models/patient.model';
import { Subscription } from 'rxjs';
import { ResponseObject } from '../../../base/base.model';
import { VisitService } from '../service/visit.service';
import { PatientService } from '../../patient/service/patient.service';
import { convertToDateTime, extractTimeFromDate } from '../../../shared/utility';

@Component({
  selector: 'app-visit-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './visit-edit.component.html',
  styleUrl: './visit-edit.component.css'
})
export class VisitEditComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;
  responseDto?: responseVisitDto;
  responsePatientDtos?: responsePatientDto[];


  myForm: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
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
    this.myForm.controls['id']?.disable();
    this.setIdFromActivatedRoute();
    this.getAllPatients();
    this.getById();
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
      const responseObject: ResponseObject<responseVisitDto> =
        await this.visitService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;

        console.log(this.responseDto);
        debugger
        this.myForm.patchValue({
          id: this.responseDto.id,
          patientId: this.responseDto.patientId,
          // visitDate: new Date(this.responseDto.visitDate).toLocaleDateString({ local}),
          // visitTime: extractTimeFromDate(this.response(''Dto.visitTime)
        });
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

    if (this.id) {
      this.myForm.controls["visitTime"]
        .setValue(convertToDateTime(this.myForm.controls['visitDate'].value,
          this.myForm.controls['visitTime'].value));

      const responseObject: ResponseObject<responseVisitDto> =
        await this.visitService.update(this.id, this.myForm.value);

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
  }

  onDelete() {
    this.delete();
  }

  async delete() {
    if (this.id) {

      const responseObject: ResponseObject<responseVisitDto> =
        await this.visitService.detele(this.id);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm.reset();

        this.router.navigateByUrl('/admin/visits');

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

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }

  back(){
    this.router.navigateByUrl('/admin/visits')
  }
}
