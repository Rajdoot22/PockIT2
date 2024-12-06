import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymasterComponent } from './inventorymaster.component';

describe('InventorymasterComponent', () => {
  let component: InventorymasterComponent;
  let fixture: ComponentFixture<InventorymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
