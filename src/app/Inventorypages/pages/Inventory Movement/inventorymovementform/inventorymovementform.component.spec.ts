import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymovementformComponent } from './inventorymovementform.component';

describe('InventorymovementformComponent', () => {
  let component: InventorymovementformComponent;
  let fixture: ComponentFixture<InventorymovementformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymovementformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymovementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
