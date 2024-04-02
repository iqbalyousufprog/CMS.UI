import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { responseconsultationDto } from '../../../models/consultation.model';
import { ConsultationService } from '../service/consultation.service';
import { ResponseObject } from '../../../base/base.model';

@Component({
  selector: 'app-consultation-lister',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultation-lister.component.html',
  styleUrl: './consultation-lister.component.css'
})
export class ConsultationListerComponent implements OnInit {

  responseDtos?: responseconsultationDto[];

  constructor(private consultationService: ConsultationService) {

  }

  ngOnInit(): void {
    this.getAllConsultations();
  }

  async getAllConsultations() {

    const responseObject: ResponseObject<responseconsultationDto[]> =
      await this.consultationService.getAll();

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
