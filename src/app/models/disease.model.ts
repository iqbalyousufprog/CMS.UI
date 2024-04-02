import { requestBaseDto, responseBaseDto } from "../base/base.model";

export interface requestDiseaseDto extends requestBaseDto {
    diseaseName: string;
}

export interface responseDiseaseDto extends responseBaseDto {
    diseaseName: string;
}