import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Address } from 'src/app/Pages/Models/Address';
import { customer } from 'src/app/Pages/Models/customer';
import { ApiServiceService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-ordercreatedrawer',
  templateUrl: './ordercreatedrawer.component.html',
  styleUrls: ['./ordercreatedrawer.component.css']
})
export class OrdercreatedrawerComponent {
  @Input() drawerCloseorder: any
  expandKeys = ['0-0', '0-1'];
  isSpinning: boolean = false
  drawerVisible: boolean = false
  drawerVisibleAddress: boolean = false
  drawerData: customer = new customer();
  drawerDataaddress: Address = new Address();
  drawerTitle: any = ''
  showbutton: boolean = true
  cartVisible: boolean = false
  selectedService: any = '';
  orderMediums = ['Online', 'Offline'];
  quantity = 1;
  rate = 0;
  total = 0; 
  time: any
  territories: any = []
  subcategories: any = []
  categories: any = []
  selectedCustomer: string;
  selectedAddress: any;
  selectedTerritory: string;
  selectedOrderMedium: string;
   tableData: any = []
  isEditing = false;
  editingIndex: number | null = null;
  expectedDate: Date | null = null;
  addresses: any = []
  ID:any 
  selectedCategory: any
  selectedSubcategory: any
  selectedServiceItem: any
  specialInstruction = '';
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe
  ) {

  }
  showcbutton: boolean = false
  ngOnInit() {
    this.getcustomer()
    this.getcategories()
    this.getsubcategories()
    if (this.selectedCustomer === '' || this.selectedCustomer === undefined) {
      this.showcbutton = true
      this.showbutton = false;
    } else {
      this.showcbutton = false
      this.showbutton = true;
    }
  }

  nodes = [
    {
      title: 'Service 1',
      key: '0-0',
      rate: 100,
      children: [
        { title: 'Sub-Service 1.1', key: '0-0-0', rate: 50 },
        { title: 'Sub-Service 1.2', key: '0-0-1', rate: 70 },
      ],
    },
    {
      title: 'Service 2',
      key: '0-1',
      rate: 200,
      children: [
        { title: 'Sub-Service 2.1', key: '0-1-0', rate: 80 },
        { title: 'Sub-Service 2.2', key: '0-1-1', rate: 90 },
      ],
    },
  ];
  closeCallbackorder() {
    this.drawerCloseorder()
  }
  custaddress: any = []
  getcustomer() {
    this.api.getAllCustomer(0, 0, '', '', '').subscribe(data => {
      this.custaddress = data['data'];
    })
  }

  getaddress(event) {
    if (this.selectedCustomer === '' || this.selectedCustomer === undefined) {
      this.showcbutton = true
      this.showbutton = false;
    } else {
      this.showcbutton = false
      this.showbutton = true;
    }
    this.ID = event

    this.api.getAllCustomerAddress(0, 0, '', '', ' AND CUSTOMER_ID= ' + this.selectedCustomer).subscribe(data => {
      this.addresses = data['data'];
    })

  }
  getteritory(event) {
    this.api.getterritoryPincodeData(0, 0, '', '', ' AND PINCODE_ID =' + event).subscribe(data => {
      this.territories = data['data'];
    })
  }

  getcategories() {
    this.api.getCategoryData(0, 0, '', '', ' AND IS_ACTIVE =1').subscribe(data => {
      this.categories = data['data'];
    })
  }

  getsubcategories() {
    this.api.getSubCategoryData(0, 0, '', '', ' AND STATUS =1').subscribe(data => {
      this.subcategories = data['data'];
    })
  }
  calculateTotalAmount() {
    return this.tableData.reduce((sum, item) => sum + item.total, 0);
  }

  calculateTotal() {
    this.total = this.quantity * this.rate;
  }

  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }

  onServiceChange(serviceKey: string) {
    console.log(serviceKey)
    const findServiceByKey = (nodes: any[], key: string): any => {
      for (const node of nodes) {
        if (node.key === key) {
          return node;
        }
        if (node.children) {
          const found = findServiceByKey(node.children, key);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const selectedService = findServiceByKey(this.nodes, serviceKey);

    if (selectedService) {
      this.rate = selectedService.rate;
      this.calculateTotal();
    }
    this.getServiceNameAndItem(serviceKey)
  }

  cancel() { }
  omit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }
  addcustomer(): void {
    this.drawerTitle = "Create New Customer";
    this.drawerData = new customer();
    this.drawerVisible = true;
  }

  drawerClose(): void {
    this.drawerVisible = false;
    this.getcustomer()
  }
  get closeCallback() {
    return this.drawerClose.bind(this);
  }


  addcustomerAddress(): void {
    this.drawerTitle = "Create New Address";
    this.drawerDataaddress = new Address();
    this.drawerVisibleAddress = true;
  }
  drawerAddressClose(): void {
    this.drawerVisibleAddress = false;
    this.getaddress('')
  }
  get closeCallbackAddress() {
    return this.drawerAddressClose.bind(this);
  }

  addToTable() { 
    if (!this.selectedCategory || !this.selectedSubcategory || !this.selectedService || !this.quantity || !this.rate || !this.total) {
      this.message.error("Please fill all fields.", '');
      return;
    }
    if (!this.selectedCategory) {
      this.message.error("Please select category.", '');
      return;
    }

    if (!this.selectedSubcategory) {
      this.message.error("Please select subcategory.", '');
      return;
    }

    if (!this.selectedService) {
      this.message.error("Please select  service.", '');
      return;
    }

    if (!this.quantity || this.quantity <= 0) {
      this.message.error("Please enter valid quantity.", '');
      return;
    }

    if (!this.rate || this.rate <= 0) {
      this.message.error("Please enter valid rate.", '');
      return;
    }

    if (!this.total || this.total <= 0) {
      this.message.error("Total amount cannot be zero or negative.", '');
      return;
    } 
    const selectedService = this.serviceName
    const selectedServiceItem = this.serviceItemName 
    this.tableData.push({
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
      serviceName: selectedService,
      serviceItem: selectedServiceItem,
      quantity: this.quantity,
      rate: this.rate,
      total: this.total
    });
    this.resetForm();
  } 
  resetForm() {
    this.selectedCategory = '';
    this.selectedSubcategory = '';
    this.selectedService = null;
    this.selectedServiceItem = null;
    this.quantity = 0;
    this.rate = 0;
    this.total = 0;
    this.isEditing = false;
    this.editingIndex = null;
  }

  editRow(index: number) {
    this.isEditing = true;
    this.editingIndex = index;

    const rowData = this.tableData[index];
    console.log('rowData:', rowData);    
    this.selectedCategory = rowData.category;
    this.selectedSubcategory = rowData.subcategory;
    this.quantity = rowData.quantity;
    this.rate = rowData.rate;
    this.total = rowData.total; 
    const serviceItemKey = this.findServiceKeyByTitle(this.nodes, rowData.serviceItem);
    this.selectedService = serviceItemKey;   
    console.log('selectedService (key):', this.selectedService);    
    this.getServiceNameAndItem(this.selectedService);
  }

  findServiceKeyByTitle(nodes: any[], serviceTitle: string): string | null {
    for (const node of nodes) {
      if (node.title.trim().toLowerCase() === serviceTitle.trim().toLowerCase()) {
        return node.key;
      }

      if (node.children) {
        const foundKey = this.findServiceKeyByTitle(node.children, serviceTitle);
        if (foundKey) {
          return foundKey;
        }
      }
    }
    return null;
  }
 
  updateRow() {
    if (this.editingIndex !== null) { 
      this.tableData[this.editingIndex] = {
        category: this.selectedCategory,
        subcategory: this.selectedSubcategory,
        serviceName: this.serviceName,
        serviceItem: this.serviceItemName,
        quantity: this.quantity,
        rate: this.rate,
        total: this.total
      };
      this.resetForm();
      this.isEditing = false;
      this.editingIndex = null;
    }
  }
  fullPath: any
  serviceItemName: any
  serviceName: any
  getServiceNameAndItem(event: any): void {
 
    const selectedNode = this.findServiceByKey(this.nodes, event);
    const selectedKey = event;
    const parentTitle = this.findParentServiceName(this.nodes, selectedKey);
 if (parentTitle) {
      this.serviceName = parentTitle;
    } else {
      this.serviceName = selectedNode?.title || "Unknown Service";
    }

    this.serviceItemName = selectedNode?.title || "Unknown Service Item";
    console.log(this.serviceName, this.serviceItemName)
  }
  findServiceByKey(nodes: any[], key: number): any | null {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const foundNode = this.findServiceByKey(node.children, key);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }

  findParentServiceName(nodes: any[], childKey: number): string | null {
    for (const node of nodes) {
      if (node.children) {
        const childNode = node.children.find((child: any) => child.key === childKey);
        if (childNode) {
          return node.title;
        }
        const parentTitle = this.findParentServiceName(node.children, childKey);
        if (parentTitle) {
          return parentTitle;
        }
      }
    }
    return null;
  }

}
