import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSaveComponent } from './loan-save.component';

describe('LoanSaveComponent', () => {
  let component: LoanSaveComponent;
  let fixture: ComponentFixture<LoanSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
