import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventorymastermoduleComponent } from './inventorymastermodule/inventorymastermodule.component';
import { InventorymovementmasterComponent } from './pages/Inventory Movement/inventorymovementmaster/inventorymovementmaster.component';
import { InventoryTransactionmasterComponent } from './pages/Inventory Transaction/inventory-transactionmaster/inventory-transactionmaster.component';
 
import { InventorysubcategorymasterComponent } from './pages/InventorySubCategory/inventorysubcategorymaster/inventorysubcategorymaster.component';
import { InventoryCategoryMasterComponent } from './pages/Inventory Category Master/inventory-category-master/inventory-category-master.component';
import { InventorymasterComponent } from './pages/InventoryMaster/inventorymaster/inventorymaster.component';
// import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: "",
    component: InventorymastermoduleComponent,
    children: [
      {
        path: "inventory_movement",
        component: InventorymovementmasterComponent,
      },
       { path : "inventory_transaction",component:InventoryTransactionmasterComponent},
      { path: "inventory_master", component:InventorymasterComponent},
      { path: "inventory_sub_category", component:InventorysubcategorymasterComponent},
      // { path: "InventoryCategoryMaster"  },
      { path: "InventoryCategoryMaster", component: InventoryCategoryMasterComponent  },

    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
