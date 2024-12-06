import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorysubcategorymasterComponent } from './inventorysubcategorymaster.component';

describe('InventorycategorymasterComponent', () => {
  let component: InventorysubcategorymasterComponent;
  let fixture: ComponentFixture<InventorysubcategorymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorysubcategorymasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorysubcategorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
