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
import { orderRoutingModule } from './order-routing.module';
// import { OrdercalendarComponent } from '../ordercalendar/ordercalendar.component';
import { MainorderComponent } from './mainorder/mainorder.component';
import { CustomerChatComponent } from './order chat/customer-chat/customer-chat.component';
import { OrderFilterComponent } from './Order FIlter/order-filter/order-filter.component';
import { OrdercreatedrawerComponent } from './ordercreatedrawer/ordercreatedrawer.component';
import { OrderdetailsdrawerComponent } from './orderdetailsdrawer/orderdetailsdrawer.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ViewCustomerRatingComponent } from './view-customer-rating/view-customer-rating.component';
import { ViewPastOrderDrawerComponent } from './view-past-order-drawer/view-past-order-drawer.component';
import { ListTechnicainMapComponent } from '../TechnicainMap/list-technicain-map/list-technicain-map.component';
import { LocationComponent } from '../map/location/location.component';
// import { MbscModule } from '@mobiscroll/angular';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { AddressaddComponent } from './addressadd/addressadd.component';
import { CustaddComponent } from './custadd/custadd.component';

@NgModule({
  declarations: [
   
    MainorderComponent,
    OrderlistComponent,
    OrderdetailsdrawerComponent,
    ViewCustomerRatingComponent,
    ViewPastOrderDrawerComponent,
    CustomerChatComponent,
    OrdercreatedrawerComponent,
    OrderFilterComponent,
    // OrdercalendarComponent,
    ListTechnicainMapComponent,
    AddressaddComponent,
    CustaddComponent
  ],
  imports: [
    // PickerComponent,
    // MbscModule,
    CommonModule,
    orderRoutingModule,
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
    LocationComponent,
    NzCommentModule ,
    NzRateModule
  ],
})
export class orderModule {}
