import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseListerComponent } from './disease-lister.component';

describe('DiseaseListerComponent', () => {
  let component: DiseaseListerComponent;
  let fixture: ComponentFixture<DiseaseListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseaseListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
