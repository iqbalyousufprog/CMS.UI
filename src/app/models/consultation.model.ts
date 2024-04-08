import { Time } from "@angular/common";
import { requestBaseDto, responseBaseDto } from "../base/base.model";
import { responsePatientDto } from "./patient.model";
import { responseDoctorDto } from "./doctor.model";
import { responseDepartmentDto } from "./department.model";

export interface requestconsultationDto extends requestBaseDto {
    patientId: number;
    doctorId: number;
    departmentId: number;
    consultationDate: Date;
    consultationTime: Date;
    remarks: string;
}

export interface responseconsultationDto extends responseBaseDto {
    patientId: number;
    doctorId: number;
    departmentId: number;
    consultationDate: Date;
    consultationTime: Date;
    remarks: string;
    patient: responsePatientDto;
    doctor: responseDoctorDto;
    department: responseDepartmentDto;
}