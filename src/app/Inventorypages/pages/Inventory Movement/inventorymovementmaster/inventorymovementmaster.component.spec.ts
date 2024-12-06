import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymovementmasterComponent } from './inventorymovementmaster.component';

describe('InventorymovementmasterComponent', () => {
  let component: InventorymovementmasterComponent;
  let fixture: ComponentFixture<InventorymovementmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymovementmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymovementmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
