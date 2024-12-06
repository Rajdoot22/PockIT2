import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCategoryMasterComponent } from './support-category-master.component';

describe('SupportCategoryMasterComponent', () => {
  let component: SupportCategoryMasterComponent;
  let fixture: ComponentFixture<SupportCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
