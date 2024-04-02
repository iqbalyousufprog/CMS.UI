import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListerComponent } from './doctor-lister.component';

describe('DoctorListerComponent', () => {
  let component: DoctorListerComponent;
  let fixture: ComponentFixture<DoctorListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
