import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { requestDoctorDto, responseDoctorDto } from '../../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService<requestDoctorDto, responseDoctorDto> {

  constructor() { 
    super("doctors");
  }
}
