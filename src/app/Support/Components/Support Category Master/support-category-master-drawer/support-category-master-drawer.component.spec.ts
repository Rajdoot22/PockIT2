import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCategoryMasterDrawerComponent } from './support-category-master-drawer.component';

describe('SupportCategoryMasterDrawerComponent', () => {
  let component: SupportCategoryMasterDrawerComponent;
  let fixture: ComponentFixture<SupportCategoryMasterDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportCategoryMasterDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportCategoryMasterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
