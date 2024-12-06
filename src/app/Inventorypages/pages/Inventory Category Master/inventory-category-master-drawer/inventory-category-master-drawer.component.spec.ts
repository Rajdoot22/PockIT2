import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCategoryMasterDrawerComponent } from './inventory-category-master-drawer.component';

describe('InventoryCategoryMasterDrawerComponent', () => {
  let component: InventoryCategoryMasterDrawerComponent;
  let fixture: ComponentFixture<InventoryCategoryMasterDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCategoryMasterDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCategoryMasterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
