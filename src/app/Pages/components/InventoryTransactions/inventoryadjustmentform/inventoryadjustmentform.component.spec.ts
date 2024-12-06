import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryadjustmentformComponent } from './inventoryadjustmentform.component';

describe('InventoryadjustmentformComponent', () => {
  let component: InventoryadjustmentformComponent;
  let fixture: ComponentFixture<InventoryadjustmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryadjustmentformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryadjustmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
