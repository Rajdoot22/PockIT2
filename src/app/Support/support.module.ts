import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxPrintModule } from 'ngx-print';
import { KonwledgeBaseCategoryAddComponent } from './Components/KnowledgeBaseCategoryMaster/konwledge-base-category-add/konwledge-base-category-add.component';
import { KonwledgeBaseCategoryListComponent } from './Components/KnowledgeBaseCategoryMaster/konwledge-base-category-list/konwledge-base-category-list.component';
import { SupportMasterComponent } from './support-master/support-master.component';
import { KnowledgeBaseSubCategoryListComponent } from './Components/KnowledgeBaseSubCategoryMaster/knowledge-base-sub-category-list/knowledge-base-sub-category-list.component';
import { KnowledgeBaseSubCategoryAddComponent } from './Components/KnowledgeBaseSubCategoryMaster/knowledge-base-sub-category-add/knowledge-base-sub-category-add.component';
import { KnowledgeBaseMasterAddComponent } from './Components/KnowledgeBaseMaster/knowledge-base-master-add/knowledge-base-master-add.component';
import { KnowledgeBaseMasterListComponent } from './Components/KnowledgeBaseMaster/knowledge-base-master-list/knowledge-base-master-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SupportCategoryMasterComponent } from './Components/Support Category Master/support-category-master/support-category-master.component';
import { SupportCategoryMasterDrawerComponent } from './Components/Support Category Master/support-category-master-drawer/support-category-master-drawer.component';
import { SupportSubcategoryMasterComponent } from './Components/Support Subcategory Master/support-subcategory-master/support-subcategory-master.component';
import { SupportSubcategoryMasterDrawerComponent } from './Components/Support Subcategory Master/support-subcategory-master-drawer/support-subcategory-master-drawer.component';
import { TicketListComponent } from './Components/TicketList/ticket-list/ticket-list.component';
import { ViewDrawerComponent } from './Components/TicketList/view-drawer/view-drawer.component';
// import { SupportMasterComponent } from './support-master/support-master.component';


@NgModule({
  declarations: [
    KonwledgeBaseCategoryAddComponent,
    KonwledgeBaseCategoryListComponent,
    SupportMasterComponent,
    KnowledgeBaseSubCategoryListComponent,
    KnowledgeBaseSubCategoryAddComponent,
    KnowledgeBaseMasterAddComponent,
    KnowledgeBaseMasterListComponent,
    SupportCategoryMasterComponent,
    SupportCategoryMasterDrawerComponent,
    SupportSubcategoryMasterComponent,
    SupportSubcategoryMasterDrawerComponent,
    TicketListComponent,
    ViewDrawerComponent,

  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    // SupportMasterComponent,
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
    NzDropDownModule,
    AngularEditorModule
  ]
})
export class SupportModule { }
