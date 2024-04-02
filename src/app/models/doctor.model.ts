import { requestBaseDto, responseBaseDto } from "../base/base.model";

export interface requestDoctorDto extends requestBaseDto {
    doctorName: string;
    specialization: string;
}

export interface responseDoctorDto extends responseBaseDto {
    doctorName: string;
    specialization: string;
}