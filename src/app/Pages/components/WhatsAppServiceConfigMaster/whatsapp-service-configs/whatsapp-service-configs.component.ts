import { Component } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { whatsappconfig } from 'src/app/Pages/Models/whatsappconfig';

@Component({
  selector: 'app-whatsapp-service-configs',
  templateUrl: './whatsapp-service-configs.component.html',
  styleUrls: ['./whatsapp-service-configs.component.css']
})
export class WhatsappServiceConfigsComponent {
  formTitle = "Manage WhatsApp Service Config.";
  drawerVisible:boolean=false
  drawerData: whatsappconfig = new whatsappconfig();
  smsServiceConfigData:any=[]
   searchText=''
   pageIndex = 1;
   pageSize = 10;
   sortValue: string = "desc";
   sortKey: string = "id";
   totalRecords=1
   emailServiceConfigData:any=[]
  drawerClose(): void { 
    this.drawerVisible = false;
  }
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  drawerTitle=''
  add(): void {
    this.drawerTitle = "Create New WhatsApp Service Config";
    
    this.drawerVisible = true;
  }
  edit(data){}
  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'desc';
    console.log(currentSort);
    console.log('sortOrder :' + sortOrder);
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    if (this.pageSize != pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }

    if (this.sortKey != sortField) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }

    this.sortKey = sortField;
    this.sortValue = sortOrder; 
  }
}
