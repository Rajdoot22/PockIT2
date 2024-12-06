import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-customer-rating',
  templateUrl: './view-customer-rating.component.html',
  styleUrls: ['./view-customer-rating.component.css']
})
export class ViewCustomerRatingComponent {

  value = 3;

  @Input() data: any ;
  @Input()
  drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

}
