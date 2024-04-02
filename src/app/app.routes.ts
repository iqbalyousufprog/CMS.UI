import { Routes } from '@angular/router';
import { DiseaseListerComponent } from './features/disease/disease-lister/disease-lister.component';
import { DiseaseAddComponent } from './features/disease/disease-add/disease-add.component';
import { DiseaseEditComponent } from './features/disease/disease-edit/disease-edit.component';
import { DoctorListerComponent } from './features/doctor/doctor-lister/doctor-lister.component';
import { DoctorAddComponent } from './features/doctor/doctor-add/doctor-add.component';
import { DoctorEditComponent } from './features/doctor/doctor-edit/doctor-edit.component';
import { PatientListerComponent } from './features/patient/patient-lister/patient-lister.component';
import { PatientAddComponent } from './features/patient/patient-add/patient-add.component';
import { PatientEditComponent } from './features/patient/patient-edit/patient-edit.component';
import { VisitListerComponent } from './features/visit/visit-lister/visit-lister.component';
import { VisitAddComponent } from './features/visit/visit-add/visit-add.component';
import { VisitEditComponent } from './features/visit/visit-edit/visit-edit.component';
import { ConsultationListerComponent } from './features/consultation/consultation-lister/consultation-lister.component';
import { ConsultationAddComponent } from './features/consultation/consultation-add/consultation-add.component';
import { ConsultationEditComponent } from './features/consultation/consultation-edit/consultation-edit.component';
import { PatientViewComponent } from './features/patient/patient-view/patient-view.component';

export const routes: Routes = [
    //disease
    {
        path: 'admin/diseases',
        component: DiseaseListerComponent
    },
    {
        path: 'admin/diseases/add',
        component: DiseaseAddComponent
    },
    {
        path: 'admin/diseases/:id',
        component: DiseaseEditComponent
    },
    //doctor
    {
        path: 'admin/doctors',
        component: DoctorListerComponent
    },
    {
        path: 'admin/doctors/add',
        component: DoctorAddComponent
    },
    {
        path: 'admin/doctors/:id',
        component: DoctorEditComponent
    },
    //patient
    {
        path: 'admin/patients',
        component: PatientListerComponent
    },
    {
        path: 'admin/patients/add',
        component: PatientAddComponent
    },
    {
        path: 'admin/patients/:id',
        component: PatientEditComponent
    },
    {
        path: 'admin/patientsview/:id',
        component: PatientViewComponent
    },
    // //visit
    // {
    //     path: 'admin/visits',
    //     component: VisitListerComponent
    // },
    // {
    //     path: 'admin/visits/add',
    //     component: VisitAddComponent
    // },
    // {
    //     path: 'admin/visits/:id',
    //     component: VisitEditComponent
    // },
    //consultation
    {
        path: 'admin/consultations',
        component: ConsultationListerComponent
    },
    {
        path: 'admin/consultations/add',
        component: ConsultationAddComponent
    },
    {
        path: 'admin/consultations/:id',
        component: ConsultationEditComponent
    },
];
