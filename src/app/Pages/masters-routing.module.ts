import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './Masters/masters.component';
import { OrganizationsComponent } from './components/Organizations/organizations/organizations.component';
import { BranchesComponent } from './components/BranchMaster/branches/branches.component'; 
import { TaxDetailsComponent } from './components/TaxDetailsMaster/tax-details/tax-details.component';
import { PincodesComponent } from './components/PincodeMaster/pincodes/pincodes.component';
import { SubcategoriesComponent } from './components/SubCategoryMaster/subcategories/subcategories.component';
import { CategoriesComponent } from './components/CategoryMaster/categories/categories.component';
import { CustomersComponent } from './components/CustomerMaster/customers/customers.component';
import { EmailTemplatesComponent } from './components/EmailTemplateMaster/email-templates/email-templates.component';
import { WhatsapptemplatesComponent } from './components/WhatsappTemplateMaster/whatsapptemplates/whatsapptemplates.component';
import { SmsesComponent } from './components/SMSMaster/smses/smses.component';
import { TerritoryMasterComponent } from './components/Territory Master/territory-master/territory-master.component';
import { ServiceItemMasterListComponent } from './components/Service Item Master/service-item-master-list/service-item-master-list.component';
import { CurrencyMasterListComponent } from './components/Currency Master/currency-master-list/currency-master-list.component';
import { SkillTableComponent } from './components/Skill Master/skill-table/skill-table.component';
import { TaxTableComponent } from './components/Tax Master/tax-table/tax-table.component';
import { OrderStatusTableComponent } from './components/Order Status Master/order-status-table/order-status-table.component';
import { JobCardStatusTableComponent } from './components/Job Card Status Master/job-card-status-table/job-card-status-table.component';
import { LanguageMasterTableComponent } from './components/Language Master/language-master-table/language-master-table.component';
import { UnitTableComponent } from './components/Unit Master/unit-table/unit-table.component';
import { ListstateComponent } from './components/State/liststate/liststate.component';
import { ListcityComponent } from './components/City/listcity/listcity.component';
import { CountryMasterComponent } from './components/Country Master/country-master/country-master.component';
import { CustomerCategoryMasterComponent } from './components/Customer Category Master/customer-category-master/customer-category-master.component';
import { ServiceCatMasterTableComponent } from './components/Service Catlog Master/service-cat-master-table/service-cat-master-table.component';
import { BackOfficeMasterTableComponent } from './components/Back Office Team Master/back-office-master-table/back-office-master-table.component';
import { VendorMasterData } from './Models/vendorMaterData';
import { AppLanguageMasterComponent } from './components/App language Master/app-language-master/app-language-master.component';
import { TechnicianMasterComponent } from './components/TechnicianMaster/technician-master/technician-master.component';
import { VendorMasterComponent } from './components/Vendor Master/vendor-master/vendor-master.component';
import { EmailServiceConfigsComponent } from './components/Email Service Config master/email-service-configs/email-service-configs.component';
import { SmsServiceConfigsComponent } from './components/SMSConfig/sms-service-configs/sms-service-configs.component';
import { WhatsappServiceConfigsComponent } from './components/WhatsAppServiceConfigMaster/whatsapp-service-configs/whatsapp-service-configs.component';
import { CustomerconfigsComponent } from './components/CustomerConfigMaster/customerconfigs/customerconfigs.component';
import { PaymentgatewaysComponent } from './components/PaymentGatewayMaster/paymentgateways/paymentgateways.component';
import { MasterMenuListComponent } from './components/Master_Menu/master-menu-list/master-menu-list.component';
import { WarehouselocationmasterComponent } from './components/WarehouseLocation/warehouselocationmaster/warehouselocationmaster.component';
// import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: "",
    component: MastersComponent,
    children: [
      { path: "organization", component: OrganizationsComponent  },
      { path: "branch", component: BranchesComponent  },
      { path: "pincode", component: PincodesComponent  },
      { path: "taxdetails", component: TaxDetailsComponent  },
      { path: "subcategory", component: SubcategoriesComponent  },
      { path: "category", component: CategoriesComponent  },
      { path: "customers", component: CustomersComponent  },
      { path: "emailtemplate", component: EmailTemplatesComponent  },
      { path: "whatsapptemplates", component: WhatsapptemplatesComponent  },
      { path: "sms", component: SmsesComponent  },
      { path: "territorymaster", component: TerritoryMasterComponent },
      { path: "serviceItemMaster", component: ServiceItemMasterListComponent },
      { path: "currmaster", component: CurrencyMasterListComponent },
      { path: "skill", component: SkillTableComponent },
      { path: "tax", component: TaxTableComponent },
      { path: "order_status", component:OrderStatusTableComponent  },
      { path: "job_card_status", component:JobCardStatusTableComponent  },
      { path: "language", component:LanguageMasterTableComponent  },
      { path: "unit", component:UnitTableComponent },
      { path:'state', component:ListstateComponent },
      { path:'city', component:ListcityComponent },
      { path: "countrymaster", component: CountryMasterComponent },
      { path: "vendor_master", component: VendorMasterComponent },
      // { path: "customercategorymaster", component: CustomerCategoryMasterComponent, },
      { path: "appLanguagemaster", component: AppLanguageMasterComponent },
      { path: "customer_category_master", component: CustomerCategoryMasterComponent },
      { path: "backoffice", component:BackOfficeMasterTableComponent},
      { path: "technician_master", component:TechnicianMasterComponent},
      { path: "emailserviceconfigs", component:EmailServiceConfigsComponent},
      { path: "whatsappserviceconfigs", component:WhatsappServiceConfigsComponent},
      { path: "servicecatlog", component:ServiceCatMasterTableComponent},
      { path: "smsserviceconfigs", component:SmsServiceConfigsComponent},
      { path: "customerconfigs", component:CustomerconfigsComponent},
      { path: "paymentgateway", component:PaymentgatewaysComponent},

      { path: "menu", component:MasterMenuListComponent},

    
      { path : "warehouse_location",component:WarehouselocationmasterComponent},
      // { path : "inventory_transaction",component:InventoryTransactionmasterComponent},
      // { path: "inventory_master", component:InventorymasterComponent},
      // { path: "inventory_sub_category", component:InventorysubcategorymasterComponent},


    ]
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersRoutingModule {}
