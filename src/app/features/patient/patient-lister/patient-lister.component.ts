import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { responsePatientDto } from '../../../models/patient.model';
import { PatientService } from '../service/patient.service';
import { ResponseObject } from '../../../base/base.model';
import { PatientSearchFilter } from '../../../models/patient-search-filter.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-lister',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './patient-lister.component.html',
  styleUrl: './patient-lister.component.css'
})
export class PatientListerComponent implements OnInit {

  patientSearchFilter: PatientSearchFilter = {
    age: "",
    name: "",
    phoneNumber: "",
    gender: ""
  };
  responseDtos?: responsePatientDto[];

  constructor(private patientService: PatientService) {

  }

  ngOnInit(): void {
    this.getAllPatients();
  }

  async getAllPatients() {

    const responseObject: ResponseObject<responsePatientDto[]> =
      await this.patientService.getAll();

    if (responseObject.isSuccess) {
      this.responseDtos = responseObject.result;

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

  async searchFilter() {
    const searchFilterObject: any = this.patientSearchFilter;
    searchFilterObject.age = Number(this.patientSearchFilter.age)
    console.log(searchFilterObject);

    const responseObject: ResponseObject<responsePatientDto[]> =
      await this.patientService.getAllPatient(searchFilterObject);

    if (responseObject.isSuccess) {
      this.responseDtos = responseObject.result;

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
