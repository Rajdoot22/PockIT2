import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercalendarComponent } from './ordercalendar.component';

describe('OrdercalendarComponent', () => {
  let component: OrdercalendarComponent;
  let fixture: ComponentFixture<OrdercalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdercalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdercalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
