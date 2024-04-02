import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitListerComponent } from './visit-lister.component';

describe('VisitListerComponent', () => {
  let component: VisitListerComponent;
  let fixture: ComponentFixture<VisitListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
