import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DiseaseService } from '../service/disease.service';
import { ResponseObject } from '../../../base/base.model';
import { responseDiseaseDto } from '../../../models/disease.model';

@Component({
  selector: 'app-disease-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './disease-add.component.html',
  styleUrl: './disease-add.component.css'
})
export class DiseaseAddComponent {

  responseDto?: responseDiseaseDto;

  myForm: FormGroup = this.formBuilder.group({
    diseaseName: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private diseaseService: DiseaseService) {
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {

    console.log(this.myForm.value);
    const responseObject: ResponseObject<responseDiseaseDto> =
      await this.diseaseService.add(this.myForm.value);

    if (responseObject.isSuccess) {

      this.responseDto = responseObject.result;
      this.myForm.reset();

      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }

      this.router.navigateByUrl('admin/diseases');
    }
    else {
      if (responseObject.message && responseObject.message.trim() !== '') {
        console.log(responseObject.message);
      }
    }
  }

  back(){
    this.router.navigateByUrl('/admin/diseases')
  }
}
