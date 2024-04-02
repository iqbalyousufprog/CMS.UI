import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseObject, requestBaseDto, responseBaseDto } from './base.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TRequestDto extends requestBaseDto, TResponseDto extends responseBaseDto> {

  http = inject(HttpClient);
  private controllerName!: string;

  constructor(controllerName: string) {
    if (!controllerName || controllerName.trim() === '') {
      throw new Error('Controller name must not be empty.');
    }

    this.controllerName = controllerName;
  }

  add(model: TRequestDto): Promise<ResponseObject<TResponseDto>> {
    const responseObject = this.http.post<ResponseObject<TResponseDto>>(`${environment.apiBaseURL}/api/${this.controllerName}`, model)
      .toPromise().then(success => {
        console.log("Base>add>success");
        console.log(success);
        return success;
      }).catch(error => {
        console.log("Base>add>error");
        console.log(error);
        return error;
      });

    return responseObject;
  }

  getAll(): Promise<ResponseObject<TResponseDto[]>> {
    const responseObject = this.http.get<ResponseObject<TResponseDto[]>>(`${environment.apiBaseURL}/api/${this.controllerName}`)
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

  getById(id: number): Promise<ResponseObject<TResponseDto>> {
    const responseObject =  this.http.get<ResponseObject<TResponseDto>>(`${environment.apiBaseURL}/api/${this.controllerName}/${id}`)
    .toPromise().then(success => {
      console.log("Base>getById>success");
      console.log(success);
      return success;
    }).catch(error => {
      console.log("Base>getById>error");
      console.log(error);
      return error;
    });

    return responseObject;
  }

  update(id: number, model: TRequestDto): Promise<ResponseObject<TResponseDto>> {
    const responseObject =   this.http.put<ResponseObject<TResponseDto>>(`${environment.apiBaseURL}/api/${this.controllerName}/${id}`, model)
    .toPromise().then(success => {
      console.log("Base>update>success");
      console.log(success);
      return success;
    }).catch(error => {
      console.log("Base>update>error");
      console.log(error);
      return error;
    });

    return responseObject;
  }

  detele(id: number): Promise<ResponseObject<TResponseDto>> {
    const responseObject =   this.http.delete<ResponseObject<TResponseDto>>(`${environment.apiBaseURL}/api/${this.controllerName}/${id}`)
    .toPromise().then(success => {
      console.log("Base>detele>success");
      console.log(success);
      return success;
    }).catch(error => {
      console.log("Base>detele>error");
      console.log(error);
      return error;
    });

    return responseObject;
  }
}
