import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainorderComponent } from './mainorder/mainorder.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ListTechnicainMapComponent } from '../TechnicainMap/list-technicain-map/list-technicain-map.component';
// import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: "",
    component: MainorderComponent,
    children: [
      { path: "order-list", component: OrderlistComponent },
      { path : "dispatcher",component:ListTechnicainMapComponent},


    ]
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class orderRoutingModule {}

