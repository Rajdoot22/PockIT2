import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-past-order-drawer',
  templateUrl: './view-past-order-drawer.component.html',
  styleUrls: ['./view-past-order-drawer.component.css']
})
export class ViewPastOrderDrawerComponent {

  @Input() data: any ;
  @Input()
  drawerVisiblepastorder: boolean = false;
  @Input() drawerClosepastorder: any = Function;

  date=new Date()

}
