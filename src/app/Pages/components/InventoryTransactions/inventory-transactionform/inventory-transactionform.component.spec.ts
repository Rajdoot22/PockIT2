import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransactionformComponent } from './inventory-transactionform.component';

describe('InventoryTransactionformComponent', () => {
  let component: InventoryTransactionformComponent;
  let fixture: ComponentFixture<InventoryTransactionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTransactionformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTransactionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
