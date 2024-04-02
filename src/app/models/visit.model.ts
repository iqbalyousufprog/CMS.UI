import { Time } from "@angular/common";
import { requestBaseDto, responseBaseDto } from "../base/base.model";
import { responsePatientDto } from "./patient.model";

export interface requestVisitDto extends requestBaseDto {
    patientId: number;
    visitDate: Date;
    visitTime: Date;
}

export interface responseVisitDto extends responseBaseDto {
    patientId: number;
    visitDate: Date;
    visitTime: Date;
    patient: responsePatientDto;
}