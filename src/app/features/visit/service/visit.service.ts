import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { requestVisitDto, responseVisitDto } from '../../../models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService extends BaseService<requestVisitDto, responseVisitDto> {

  constructor() { 
    super("visits");
  }
}
