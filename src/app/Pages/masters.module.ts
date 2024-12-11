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
import { MastersRoutingModule } from './masters-routing.module';
// import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MastersComponent } from './Masters/masters.component';
import { OrganizationComponent } from './components/Organizations/organization/organization.component';
import { OrganizationsComponent } from './components/Organizations/organizations/organizations.component';
import { BranchesComponent } from './components/BranchMaster/branches/branches.component';
import { BranchComponent } from './components/BranchMaster/branch/branch.component';
import { PincodeComponent } from './components/PincodeMaster/pincode/pincode.component';
import { PincodesComponent } from './components/PincodeMaster/pincodes/pincodes.component';
import { TaxDetailComponent } from './components/TaxDetailsMaster/tax-detail/tax-detail.component';
import { TaxDetailsComponent } from './components/TaxDetailsMaster/tax-details/tax-details.component';
import { CategoryComponent } from './components/CategoryMaster/category/category.component';
import { CategoriesComponent } from './components/CategoryMaster/categories/categories.component';
import { SubcategoriesComponent } from './components/SubCategoryMaster/subcategories/subcategories.component';
import { SubcategoryComponent } from './components/SubCategoryMaster/subcategory/subcategory.component';
import { CustomerComponent } from './components/CustomerMaster/customer/customer.component';
import { CustomersComponent } from './components/CustomerMaster/customers/customers.component';
import { EmailTemplateComponent } from './components/EmailTemplateMaster/email-template/email-template.component';
import { EmailTemplatesComponent } from './components/EmailTemplateMaster/email-templates/email-templates.component';
import { WhatsapptemplateComponent } from './components/WhatsappTemplateMaster/whatsapptemplate/whatsapptemplate.component';
import { WhatsapptemplatesComponent } from './components/WhatsappTemplateMaster/whatsapptemplates/whatsapptemplates.component';
import { TemplatepreviewComponent } from './components/WhatsappTemplateMaster/templatepreview/templatepreview.component';
import { SmsesComponent } from './components/SMSMaster/smses/smses.component';
import { SmsComponent } from './components/SMSMaster/sms/sms.component';
import { AddressDetailsComponent } from './components/CustomerMaster/address-details/address-details.component';
import { TerritoryMasterComponent } from './components/Territory Master/territory-master/territory-master.component';
import { TerritoryMasterAddComponent } from './components/Territory Master/territory-master-add/territory-master-add.component';
import { ServiceItemMasterListComponent } from './components/Service Item Master/service-item-master-list/service-item-master-list.component';
import { ServiceItemMasterAddComponent } from './components/Service Item Master/service-item-master-add/service-item-master-add.component';
import { CurrencyMasterListComponent } from './components/Currency Master/currency-master-list/currency-master-list.component';
import { CurrencyMasterAddComponent } from './components/Currency Master/currency-master-add/currency-master-add.component';
import { SkillDrawerComponent } from './components/Skill Master/skill-drawer/skill-drawer.component';
import { SkillTableComponent } from './components/Skill Master/skill-table/skill-table.component';
import { TaxTableComponent } from './components/Tax Master/tax-table/tax-table.component';
import { TaxDrawerComponent } from './components/Tax Master/tax-drawer/tax-drawer.component';
import { OrderStatusTableComponent } from './components/Order Status Master/order-status-table/order-status-table.component';
import { OrderStatusDrawerComponent } from './components/Order Status Master/order-status-drawer/order-status-drawer.component';
import { UnitTableComponent } from './components/Unit Master/unit-table/unit-table.component';
import { UnitDrawerComponent } from './components/Unit Master/unit-drawer/unit-drawer.component';
import { LanguageMasterTableComponent } from './components/Language Master/language-master-table/language-master-table.component';
import { LanguageMasterDrawerComponent } from './components/Language Master/language-master-drawer/language-master-drawer.component';
import { JobCardStatusTableComponent } from './components/Job Card Status Master/job-card-status-table/job-card-status-table.component';
import { JobCardStatusDrawerComponent } from './components/Job Card Status Master/job-card-status-drawer/job-card-status-drawer.component';
import { ListstateComponent } from './components/State/liststate/liststate.component';
import { ListcityComponent } from './components/City/listcity/listcity.component';
import { AddcityComponent } from './components/City/addcity/addcity.component';
import { AddstateComponent } from './components/State/addstate/addstate.component';
import { CountrymasterDrawerComponent } from './components/Country Master/countrymaster-drawer/countrymaster-drawer.component';
import { CountryMasterComponent } from './components/Country Master/country-master/country-master.component';
import { CustomerCategoryMasterDrawerComponent } from './components/Customer Category Master/customer-category-master-drawer/customer-category-master-drawer.component';
import { CustomerCategoryMasterComponent } from './components/Customer Category Master/customer-category-master/customer-category-master.component';
import { BackOfficeMasterDrawerComponent } from './components/Back Office Team Master/back-office-master-drawer/back-office-master-drawer.component';
import { BackOfficeMasterTableComponent } from './components/Back Office Team Master/back-office-master-table/back-office-master-table.component';
import { ServiceCatMasterDrawerComponent } from './components/Service Catlog Master/service-cat-master-drawer/service-cat-master-drawer.component';
import { ServiceCatMasterTableComponent } from './components/Service Catlog Master/service-cat-master-table/service-cat-master-table.component';
import { TechnicianMasterComponent } from './components/TechnicianMaster/technician-master/technician-master.component';
import { TechnicianMasterdrawerComponent } from './components/TechnicianMaster/technician-masterdrawer/technician-masterdrawer.component';
import { AppLanguageDrawerComponent } from './components/App language Master/app-language-drawer/app-language-drawer.component';
import { AppLanguageMasterComponent } from './components/App language Master/app-language-master/app-language-master.component';
import { VendorMasterComponent } from './components/Vendor Master/vendor-master/vendor-master.component';
import { VendorMasterDrawerComponent } from './components/Vendor Master/vendor-master-drawer/vendor-master-drawer.component';
import { TerritoryPincodeMappingComponent } from './components/Territory Master/territory-pincode-mapping/territory-pincode-mapping.component';
import { EmailServiceConfigsComponent } from './components/Email Service Config master/email-service-configs/email-service-configs.component';
import { EmailServiceConfigComponent } from './components/Email Service Config master/email-service-config/email-service-config.component';
import { SmsServiceConfigComponent } from './components/SMSConfig/sms-service-config/sms-service-config.component';
import { SmsServiceConfigsComponent } from './components/SMSConfig/sms-service-configs/sms-service-configs.component';
import { WhatsappServiceConfigsComponent } from './components/WhatsAppServiceConfigMaster/whatsapp-service-configs/whatsapp-service-configs.component';
import { WhatsappServiceConfigComponent } from './components/WhatsAppServiceConfigMaster/whatsapp-service-config/whatsapp-service-config.component';
import { CustomerconfigsComponent } from './components/CustomerConfigMaster/customerconfigs/customerconfigs.component';
import { CustomerconfigComponent } from './components/CustomerConfigMaster/customerconfig/customerconfig.component';
import { PaymentgatewaysComponent } from './components/PaymentGatewayMaster/paymentgateways/paymentgateways.component';
import { PaymentgatewayComponent } from './components/PaymentGatewayMaster/paymentgateway/paymentgateway.component';
import { TerritoryServiceMappingComponent } from './components/Territory Master/territory-service-mapping/territory-service-mapping.component';
import { TerritoryMappingComponent } from './components/Back Office Team Master/territory-mapping/territory-mapping.component';
import { MasterMenuListComponent } from './components/Master_Menu/master-menu-list/master-menu-list.component';
import { WarehouselocationmasterComponent } from './components/WarehouseLocation/warehouselocationmaster/warehouselocationmaster.component';
import { WarehouselocationformComponent } from './components/WarehouseLocation/warehouselocationform/warehouselocationform.component';
import { SkillMappingComponent } from './components/Service Catlog Master/skill-mapping/skill-mapping.component';
import { TechnicianPincodeMappingComponent } from './components/TechnicianMaster/technician-pincode-mapping/technician-pincode-mapping.component';
import { TechnicianSkillsMappingComponent } from './components/TechnicianMaster/technician-skills-mapping/technician-skills-mapping.component';
@NgModule({
  declarations: [
    MastersComponent,
    OrganizationComponent,
    OrganizationsComponent,
    BranchesComponent,
    BranchComponent,
    PincodeComponent,
    PincodesComponent,
    TaxDetailComponent,
    TaxDetailsComponent,
    CategoryComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    SubcategoryComponent,
    CustomerComponent,
    CustomersComponent,
    TemplatepreviewComponent,
    WhatsapptemplateComponent,
    WhatsapptemplatesComponent,
    EmailTemplateComponent,
    EmailTemplatesComponent,
    SmsComponent,
    SmsesComponent,
    AddressDetailsComponent ,
    TerritoryMasterAddComponent,
    TerritoryMasterComponent,
    ServiceItemMasterAddComponent,
    ServiceItemMasterListComponent,
    CurrencyMasterAddComponent,
    CurrencyMasterListComponent,
    SkillDrawerComponent,
    SkillTableComponent,
    TaxTableComponent,
    TaxDrawerComponent,
    OrderStatusTableComponent,
    OrderStatusDrawerComponent,
    JobCardStatusDrawerComponent,
    JobCardStatusTableComponent,
    LanguageMasterDrawerComponent,
    LanguageMasterTableComponent,
    UnitDrawerComponent,
    UnitTableComponent,
    ListstateComponent,
    ListcityComponent,
    AddstateComponent,
    AddcityComponent,
    CountrymasterDrawerComponent,
    MastersComponent,
    CountryMasterComponent,
    CountrymasterDrawerComponent,
    CustomerCategoryMasterComponent,
    CustomerCategoryMasterDrawerComponent,
    MastersComponent,
    CountrymasterDrawerComponent,
    BackOfficeMasterDrawerComponent,
    BackOfficeMasterTableComponent,
    ServiceCatMasterDrawerComponent,
    ServiceCatMasterTableComponent,TechnicianMasterComponent,
    TechnicianMasterdrawerComponent,
    AppLanguageDrawerComponent,
    AppLanguageMasterComponent,
    VendorMasterComponent,
    VendorMasterDrawerComponent,
    TerritoryPincodeMappingComponent,
    SmsServiceConfigComponent,
    SmsServiceConfigsComponent,
    EmailServiceConfigsComponent,
    EmailServiceConfigComponent,
    WhatsappServiceConfigComponent,
    WhatsappServiceConfigsComponent,
    CustomerconfigComponent,
    CustomerconfigsComponent,
    PaymentgatewayComponent,
    PaymentgatewaysComponent,
    TerritoryPincodeMappingComponent,
    TerritoryServiceMappingComponent,
    TerritoryMappingComponent,
    MasterMenuListComponent,
    WarehouselocationmasterComponent,
    WarehouselocationformComponent,
    TechnicianPincodeMappingComponent,
    TechnicianSkillsMappingComponent,
    SkillMappingComponent

  ],
  imports: [
    // PickerComponent,
    CommonModule,
    MastersRoutingModule,
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
  exports:[
    MastersComponent,
    OrganizationComponent,
    OrganizationsComponent,
    BranchesComponent,
    BranchComponent,
    PincodeComponent,
    PincodesComponent,
    TaxDetailComponent,
    TaxDetailsComponent,
    CategoryComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    SubcategoryComponent,
    CustomerComponent,
    CustomersComponent,
    TemplatepreviewComponent,
    WhatsapptemplateComponent,
    WhatsapptemplatesComponent,
    EmailTemplateComponent,
    EmailTemplatesComponent,
    SmsComponent,
    SmsesComponent,
    AddressDetailsComponent ,
    TerritoryMasterAddComponent,
    TerritoryMasterComponent,
    ServiceItemMasterAddComponent,
    ServiceItemMasterListComponent,
    CurrencyMasterAddComponent,
    CurrencyMasterListComponent,
    SkillDrawerComponent,
    SkillTableComponent,
    TaxTableComponent,
    TaxDrawerComponent,
    OrderStatusTableComponent,
    OrderStatusDrawerComponent,
    JobCardStatusDrawerComponent,
    JobCardStatusTableComponent,
    LanguageMasterDrawerComponent,
    LanguageMasterTableComponent,
    UnitDrawerComponent,
    UnitTableComponent,
    ListstateComponent,
    ListcityComponent,
    AddstateComponent,
    AddcityComponent,
    CountrymasterDrawerComponent,
    MastersComponent,
    CountryMasterComponent,
    CountrymasterDrawerComponent,
    CustomerCategoryMasterComponent,
    CustomerCategoryMasterDrawerComponent,
    MastersComponent,
    CountrymasterDrawerComponent,
    BackOfficeMasterDrawerComponent,
    BackOfficeMasterTableComponent,
    ServiceCatMasterDrawerComponent,
    ServiceCatMasterTableComponent,TechnicianMasterComponent,
    TechnicianMasterdrawerComponent,
    AppLanguageDrawerComponent,
    AppLanguageMasterComponent,
    VendorMasterComponent,
    VendorMasterDrawerComponent,
    TerritoryPincodeMappingComponent,
    SmsServiceConfigComponent,
    SmsServiceConfigsComponent,
    EmailServiceConfigsComponent,
    EmailServiceConfigComponent,
    WhatsappServiceConfigComponent,
    WhatsappServiceConfigsComponent,
    CustomerconfigComponent,
    CustomerconfigsComponent,
    PaymentgatewayComponent,
    PaymentgatewaysComponent,
    TerritoryPincodeMappingComponent,
    TerritoryServiceMappingComponent,
    TerritoryMappingComponent,
    MasterMenuListComponent,
    WarehouselocationmasterComponent,
    WarehouselocationformComponent,
    TechnicianPincodeMappingComponent,
    TechnicianSkillsMappingComponent,
    SkillMappingComponent

  ]
})
export class MasterModule {}
