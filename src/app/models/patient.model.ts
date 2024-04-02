import { requestBaseDto, responseBaseDto } from "../base/base.model";
import { responseconsultationDto } from "./consultation.model";
import { responseDiseaseDto } from "./disease.model";

export interface requestPatientDto extends requestBaseDto {
    name: string;
    age: number;
    gender: string;
    phoneNumber: string;
    address: string;

    diseases: number[];
}

export interface responsePatientDto extends responseBaseDto
{
    name: string;
    age: number;
    gender: string;
    phoneNumber: string;
    address: string;

    diseases: responseDiseaseDto[];
    consultations: responseconsultationDto[];
}