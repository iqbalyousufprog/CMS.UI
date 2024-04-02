import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationListerComponent } from './consultation-lister.component';

describe('ConsultationListerComponent', () => {
  let component: ConsultationListerComponent;
  let fixture: ComponentFixture<ConsultationListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
