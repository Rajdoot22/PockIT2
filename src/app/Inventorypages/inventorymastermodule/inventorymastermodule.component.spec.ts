import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymastermoduleComponent } from './inventorymastermodule.component';

describe('InventorymastermoduleComponent', () => {
  let component: InventorymastermoduleComponent;
  let fixture: ComponentFixture<InventorymastermoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymastermoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymastermoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
