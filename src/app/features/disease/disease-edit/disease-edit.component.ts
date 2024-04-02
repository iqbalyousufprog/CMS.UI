import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiseaseService } from '../service/disease.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { responseDiseaseDto } from '../../../models/disease.model';
import { ResponseObject } from '../../../base/base.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disease-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './disease-edit.component.html',
  styleUrl: './disease-edit.component.css'
})
export class DiseaseEditComponent implements OnInit, OnDestroy {

  activatedRoute = inject(ActivatedRoute);
  id: number | null | undefined = null;
  activatedRouteSubscription?: Subscription;
  responseDto?: responseDiseaseDto;

  myForm: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    diseaseName: new FormControl('', [Validators.required])
  });;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private diseaseService: DiseaseService) {

  }

  ngOnInit(): void {
    this.myForm.controls['id']?.disable();
    this.setIdFromActivatedRoute();
    this.getById();
  }

  setIdFromActivatedRoute() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
      }
    });
  }

  async getById() {

    if (this.id) {
      const responseObject: ResponseObject<responseDiseaseDto> =
        await this.diseaseService.getById(this.id);

      if (responseObject.isSuccess) {
        this.responseDto = responseObject.result;

        this.myForm.patchValue(this.responseDto);
        console.log(this.myForm.value);

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

  onSubmit() {
    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log("Please fill the mandatory fields.");
    }
  }

  async save() {
    if (this.id) {
      const responseObject: ResponseObject<responseDiseaseDto> =
        await this.diseaseService.update(this.id, this.myForm.value);

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
  }

  onDelete() {
    this.delete();
  }

  async delete() {
    if (this.id) {

      const responseObject: ResponseObject<responseDiseaseDto> =
        await this.diseaseService.detele(this.id);

      if (responseObject.isSuccess) {

        this.responseDto = responseObject.result;
        this.myForm.reset();

        this.router.navigateByUrl('/admin/diseases');

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

  back(){
    this.router.navigateByUrl('/admin/diseases')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }
}
