import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KonwledgeBaseCategoryListComponent } from './Components/KnowledgeBaseCategoryMaster/konwledge-base-category-list/konwledge-base-category-list.component';
import { SupportMasterComponent } from './support-master/support-master.component';
import { KnowledgeBaseSubCategoryListComponent } from './Components/KnowledgeBaseSubCategoryMaster/knowledge-base-sub-category-list/knowledge-base-sub-category-list.component';
import { KnowledgeBaseMasterListComponent } from './Components/KnowledgeBaseMaster/knowledge-base-master-list/knowledge-base-master-list.component';
import { SupportCategoryMasterComponent } from './Components/Support Category Master/support-category-master/support-category-master.component';
import { SupportSubcategoryMasterComponent } from './Components/Support Subcategory Master/support-subcategory-master/support-subcategory-master.component';
import { TicketListComponent } from './Components/TicketList/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: "",
    component: SupportMasterComponent,
    children: [
      { path: "knowledgebasecategory", component: KonwledgeBaseCategoryListComponent  },
      { path: "knowledgebasesubcategory", component: KnowledgeBaseSubCategoryListComponent  },
      { path: "knowledgebasemaster", component: KnowledgeBaseMasterListComponent  },

      { path: "supportcategorymaster", component: SupportCategoryMasterComponent },
      { path: "supportsubcategorymaster", component: SupportSubcategoryMasterComponent },

      { path: "ticketList", component:TicketListComponent  },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
