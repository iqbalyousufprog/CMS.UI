import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListerComponent } from './patient-lister.component';

describe('PatientListerComponent', () => {
  let component: PatientListerComponent;
  let fixture: ComponentFixture<PatientListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
