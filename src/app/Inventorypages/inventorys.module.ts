import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NgxPrintModule } from 'ngx-print';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventorymastermoduleComponent } from './inventorymastermodule/inventorymastermodule.component';
import { InventorymovementformComponent } from './pages/Inventory Movement/inventorymovementform/inventorymovementform.component';
import { InventorymovementmasterComponent } from './pages/Inventory Movement/inventorymovementmaster/inventorymovementmaster.component';
import { InventoryTransactionformComponent } from './pages/Inventory Transaction/inventory-transactionform/inventory-transactionform.component';
import { InventoryTransactionmasterComponent } from './pages/Inventory Transaction/inventory-transactionmaster/inventory-transactionmaster.component';
 
import { InventorysubcategorymasterComponent } from './pages/InventorySubCategory/inventorysubcategorymaster/inventorysubcategorymaster.component';
import { InventorysubcategorymasterformComponent } from './pages/InventorySubCategory/inventorysubcategorymasterform/inventorysubcategorymasterform.component';

import { InventoryCategoryMasterDrawerComponent } from './pages/Inventory Category Master/inventory-category-master-drawer/inventory-category-master-drawer.component';
import { InventoryCategoryMasterComponent } from './pages/Inventory Category Master/inventory-category-master/inventory-category-master.component';
import { InventorymasterComponent } from './pages/InventoryMaster/inventorymaster/inventorymaster.component';
import { InventorymasterformComponent } from './pages/InventoryMaster/inventorymasterform/inventorymasterform.component';
@NgModule({
  declarations: [
    InventorymastermoduleComponent,
    InventorymasterComponent,
    InventorysubcategorymasterComponent,
    InventorysubcategorymasterformComponent,
    InventoryTransactionmasterComponent,
    InventoryTransactionformComponent,
    InventorymovementmasterComponent,
    InventorymovementformComponent,
    InventorysubcategorymasterComponent,
    InventorysubcategorymasterformComponent,
    InventorymasterformComponent,
    InventoryCategoryMasterComponent,
    InventoryCategoryMasterDrawerComponent,
  ],


  imports: [
    // PickerComponent,
    CommonModule,
    InventoryRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzDrawerModule,
    NzSpinModule,
    NzSelectModule,
    NzDropDownModule,
    NzIconModule,
    NzNotificationModule,
    NzButtonModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzTreeSelectModule,
    NzRadioModule,
    NzDividerModule,
    NzTagModule,
    NzModalModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzMessageModule,
    NzListModule,
    NzToolTipModule,
    NzAutocompleteModule,
    NzTimePickerModule,
    NzProgressModule,
    NzPopconfirmModule,
    NzBackTopModule,
    NzBadgeModule,
    NzAvatarModule,
    NzTypographyModule,
    NzTabsModule,
    NzTreeModule,
    ReactiveFormsModule,
    NzTimelineModule,
    NgxPrintModule,
    NzCarouselModule,
    DragDropModule,
    NzCardModule,
    NzImageModule,
    NzSpaceModule,
    NzEmptyModule,
    NzStepsModule,
    NzDropDownModule
  ],
})
export class InventoryModule {}
