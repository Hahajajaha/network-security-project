import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfidentialFileComponent } from './company-confidential-file.component';

describe('CompanyConfidentialFileComponent', () => {
  let component: CompanyConfidentialFileComponent;
  let fixture: ComponentFixture<CompanyConfidentialFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyConfidentialFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConfidentialFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
