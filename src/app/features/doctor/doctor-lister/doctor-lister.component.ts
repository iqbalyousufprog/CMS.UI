import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { responseDoctorDto } from '../../../models/doctor.model';
import { ResponseObject } from '../../../base/base.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-lister',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-lister.component.html',
  styleUrl: './doctor-lister.component.css'
})
export class DoctorListerComponent implements OnInit {

  responseDtos?: responseDoctorDto[];

  constructor(private doctorService: DoctorService) {

  }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  async getAllDoctors() {
    const responseObject: ResponseObject<responseDoctorDto[]> =
      await this.doctorService.getAll();

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
