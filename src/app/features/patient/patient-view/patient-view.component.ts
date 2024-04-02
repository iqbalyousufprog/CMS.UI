import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { responsePatientDto } from '../../../models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from '../service/patient.service';
import { ResponseObject } from '../../../base/base.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.css'
})
export class PatientViewComponent implements OnInit, OnDestroy {
  responseDto?: responsePatientDto;
  responseArray?: responsePatientDto[] = [];
  activatedRoute = inject(ActivatedRoute);
  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;

  constructor(
    private router: Router,
    private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.setIdFromActivatedRoute();
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
      const responseObject: ResponseObject<responsePatientDto> =
        await this.patientService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;
        this.responseArray = [responseObject.result];
        console.log(this.responseDto);

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
