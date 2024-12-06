import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryadjustmentmasterComponent } from './inventoryadjustmentmaster.component';

describe('InventoryadjustmentmasterComponent', () => {
  let component: InventoryadjustmentmasterComponent;
  let fixture: ComponentFixture<InventoryadjustmentmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryadjustmentmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryadjustmentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
