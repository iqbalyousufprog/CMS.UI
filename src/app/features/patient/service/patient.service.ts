import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { requestPatientDto, responsePatientDto } from '../../../models/patient.model';
import { ResponseObject } from '../../../base/base.model';
import { environment } from '../../../../environments/environment';
import { PatientSearchFilter } from '../../../models/patient-search-filter.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseService<requestPatientDto, responsePatientDto> {

  constructor() { 
    super("patients");
  }

  getAllPatient(patientSearchFilter: PatientSearchFilter): Promise<ResponseObject<responsePatientDto[]>> {
    const responseObject = this.http.post<ResponseObject<responsePatientDto[]>>(`${environment.apiBaseURL}/api/patients/filter`, patientSearchFilter)
      .toPromise().then(success => {
        console.log("Base>getAll>success");
        console.log(success);
        return success;
      }).catch(error => {
        console.log("Base>getAll>error");
        console.log(error);
        return error;
      });

    return responseObject;
  }

}
