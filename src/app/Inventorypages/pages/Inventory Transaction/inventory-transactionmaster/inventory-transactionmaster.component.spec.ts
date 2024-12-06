import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransactionmasterComponent } from './inventory-transactionmaster.component';

describe('InventoryTransactionmasterComponent', () => {
  let component: InventoryTransactionmasterComponent;
  let fixture: ComponentFixture<InventoryTransactionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTransactionmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTransactionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
