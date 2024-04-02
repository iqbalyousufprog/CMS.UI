import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { responseVisitDto } from '../../../models/visit.model';
import { VisitService } from '../service/visit.service';
import { ResponseObject } from '../../../base/base.model';

@Component({
  selector: 'app-visit-lister',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visit-lister.component.html',
  styleUrl: './visit-lister.component.css'
})
export class VisitListerComponent implements OnInit {

  responseDtos?: responseVisitDto[];

  constructor(private visitService: VisitService) {

  }

  ngOnInit(): void {
    this.getAllVisits();
  }

  async getAllVisits() {
    const responseObject: ResponseObject<responseVisitDto[]> =
      await this.visitService.getAll();

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
