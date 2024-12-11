import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorysubcategorymasterformComponent } from './inventorysubcategorymasterform.component'; 

describe('InventorycategorymasterformComponent', () => {
  let component: InventorysubcategorymasterformComponent;
  let fixture: ComponentFixture<InventorysubcategorymasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorysubcategorymasterformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorysubcategorymasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
