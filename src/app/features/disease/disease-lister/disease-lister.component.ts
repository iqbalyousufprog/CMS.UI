import { Component, OnInit } from '@angular/core';
import { DiseaseService } from '../service/disease.service';
import { Observable } from 'rxjs';
import { responseDiseaseDto } from '../../../models/disease.model';
import { ResponseObject } from '../../../base/base.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-disease-lister',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './disease-lister.component.html',
  styleUrl: './disease-lister.component.css'
})
export class DiseaseListerComponent implements OnInit {

  responseDtos?: responseDiseaseDto[];

  constructor(private diseaseService: DiseaseService) {

  }

  ngOnInit(): void {
    this.getAllDiseases();
  }

  async getAllDiseases() {

    const responseObject: ResponseObject<responseDiseaseDto[]> = 
    await this.diseaseService.getAll();

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
