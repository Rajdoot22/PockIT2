import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSubcategoryMasterComponent } from './support-subcategory-master.component';

describe('SupportSubcategoryMasterComponent', () => {
  let component: SupportSubcategoryMasterComponent;
  let fixture: ComponentFixture<SupportSubcategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportSubcategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportSubcategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
