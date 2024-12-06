import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCategoryMasterComponent } from './inventory-category-master.component';

describe('InventoryCategoryMasterComponent', () => {
  let component: InventoryCategoryMasterComponent;
  let fixture: ComponentFixture<InventoryCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
