import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { requestconsultationDto, responseconsultationDto } from '../../../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends BaseService<requestconsultationDto, responseconsultationDto> {

  constructor() { 
    super("consultations");
  }
}
