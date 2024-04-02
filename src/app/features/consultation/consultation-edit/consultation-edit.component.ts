import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { responseconsultationDto } from '../../../models/consultation.model';
import { responsePatientDto } from '../../../models/patient.model';
import { responseDoctorDto } from '../../../models/doctor.model';
import { ConsultationService } from '../service/consultation.service';
import { PatientService } from '../../patient/service/patient.service';
import { DoctorService } from '../../doctor/service/doctor.service';
import { ResponseObject } from '../../../base/base.model';
import { convertToDateTime } from '../../../shared/utility';

@Component({
  selector: 'app-consultation-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './consultation-edit.component.html',
  styleUrl: './consultation-edit.component.css'
})
export class ConsultationEditComponent {

  activatedRoute = inject(ActivatedRoute);

  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;
  responseDto?: responseconsultationDto;
  responsePatientDtos?: responsePatientDto[];
  responseDoctorDtos?: responseDoctorDto[];

  myForm?: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    patientId: new FormControl('', [Validators.required]),
    doctorId: new FormControl('', [Validators.required]),
    consultationDate: new FormControl('', [Validators.required]),
    consultationTime: new FormControl('', [Validators.required]),
    remarks: new FormControl('')
  });;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private dctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllDoctors();
    
    this.setIdFromActivatedRoute();
    this.getById();
    this.myForm?.controls['id']?.disable();
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
      const responseObject: ResponseObject<responseconsultationDto> =
        await this.consultationService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;

        console.log(this.responseDto);
        debugger
        this.myForm?.patchValue({
          id: this.responseDto.id,
          patientId: this.responseDto.patientId,
          doctorId: this.responseDto.doctorId,
          remarks: this.responseDto.remarks
          // consultationDate: new Date(this.responseDto.consultationDate).toLocaleDateString({ local}),
          // consultationTime: extractTimeFromDate(this.response(''Dto.consultationTime)
        });
        console.log(this.myForm?.value);

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

  onSubmit() {
    if (this.myForm?.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {

    if (this.id) {
      this.myForm?.controls["consultationTime"]
        .setValue(convertToDateTime(this.myForm?.controls['consultationDate'].value,
          this.myForm?.controls['consultationTime'].value));

      const responseObject: ResponseObject<responseconsultationDto> =
        await this.consultationService.update(this.id, this.myForm?.value);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm?.reset();

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
  }

  onDelete() {
    this.delete();
  }

  async delete() {
    if (this.id) {

      const responseObject: ResponseObject<responseconsultationDto> =
        await this.consultationService.detele(this.id);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm?.reset();

        this.router.navigateByUrl('/admin/consultations');

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
    this.router.navigateByUrl('/admin/consultations')
  }
}
