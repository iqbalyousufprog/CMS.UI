import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { requestDiseaseDto, responseDiseaseDto } from '../../../models/disease.model';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends BaseService<requestDiseaseDto, responseDiseaseDto> {

  constructor() { 
    super("diseases");
  }
}
