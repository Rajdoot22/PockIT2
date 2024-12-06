import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSubcategoryMasterDrawerComponent } from './support-subcategory-master-drawer.component';

describe('SupportSubcategoryMasterDrawerComponent', () => {
  let component: SupportSubcategoryMasterDrawerComponent;
  let fixture: ComponentFixture<SupportSubcategoryMasterDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportSubcategoryMasterDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportSubcategoryMasterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
