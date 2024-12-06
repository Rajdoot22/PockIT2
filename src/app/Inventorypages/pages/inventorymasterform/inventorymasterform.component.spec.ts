import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymasterformComponent } from './inventorymasterform.component';

describe('InventorymasterformComponent', () => {
  let component: InventorymasterformComponent;
  let fixture: ComponentFixture<InventorymasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymasterformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
