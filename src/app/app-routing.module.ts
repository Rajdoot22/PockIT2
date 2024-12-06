import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./CommonForms/Users/users/users.component";
import { RolesComponent } from "./CommonForms/Roles/roles/roles.component";
import { FormsComponent } from "./CommonForms/Forms/forms/forms.component";
import { ListTechnicainMapComponent } from "./TechnicainMap/list-technicain-map/list-technicain-map.component";
import { OrderlistComponent } from "./orderpages/orderlist/orderlist.component";
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "users", component: UsersComponent },
  { path: "roles", component: RolesComponent },
  { path: "forms", component: FormsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "order-list", component: OrderlistComponent },
  { path : "technicianmap",component:ListTechnicainMapComponent},

  {
    path: 'masters',
    loadChildren: () =>
      import('./Pages/masters.module').then(
        (m) => m.MasterModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./Support/support.module').then(
        (m) => m.SupportModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./Inventorypages/inventorys.module').then(
        (m) => m.InventoryModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./orderpages/order.module').then(
        (m) => m.orderModule
      ),
  },
  { path: "**", redirectTo: "dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
