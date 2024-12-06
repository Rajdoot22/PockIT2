import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorycategorymasterformComponent } from './inventorycategorymasterform.component';

describe('InventorycategorymasterformComponent', () => {
  let component: InventorycategorymasterformComponent;
  let fixture: ComponentFixture<InventorycategorymasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorycategorymasterformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorycategorymasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
