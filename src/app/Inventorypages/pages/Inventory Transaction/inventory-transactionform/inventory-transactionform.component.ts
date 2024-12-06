import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { InventoryTransaction } from 'src/app/Inventorypages/inventorymodal/inventoryTransactions';

import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-inventory-transactionform',
  templateUrl: './inventory-transactionform.component.html',
  styleUrls: ['./inventory-transactionform.component.css']
})
export class InventoryTransactionformComponent {
  @Input() drawerClose: Function;
  @Input() data: InventoryTransaction;
  @Input() drawerVisible: boolean;
  public commonFunction = new CommonFunctionService();
  isSpinning = false;
  isOk = true;
  emailpattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobpattern = /^[6-9]\d{9}$/;
  onlynum = /^[0-9]*$/;
  onlychar = /^[a-zA-Z ]*$/;
  namepatt = /[a-zA-Z][a-zA-Z ]+/;
  addpat = /[ .a-zA-Z0-9 ]+/;
  pincode = /([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})/;
  PTECpattern = /^99\d{9}P$/;
  org = [];
  orgId = this.cookie.get("orgId");
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  date;
  itemslist: any=[];
  typelist:any =[]

  UnitList: any=[];
  warehouseList: any = [];
  constructor(
    private api: ApiServiceService,
    private cookie: CookieService,
    private datePipe: DatePipe,
    private message: NzNotificationService
  ) {}

  ngOnInit() {
    // this.getSubCategory()
    // this.getUnits()
  }
  onCategoryChange(Id:number){
    this.getInventorySubCategory()
  }
  getSubCategory(){
    this.api.getSubCategoryData(0,0,'id','desc',' AND STATUS=1').subscribe(categorysuccess=>{
      if(categorysuccess.code==200){
        this.itemslist=categorysuccess['data']
      }
      else{
        this.itemslist=[]
      }
    })
  }
  getUnits(){
    this.api.getUnitData(0,0,'id','desc',' AND IS_ACTIVE=1').subscribe(unitdata=>{
      if(unitdata.code==200){
        this.UnitList=unitdata['data']
      }
      else{
        this.UnitList=[]
      }
    })
  }
  getInventorySubCategory(){

  }
  close(accountMasterPage: NgForm) {
    this.drawerClose();
    this.resetDrawer(accountMasterPage);
  }

  resetDrawer(accountMasterPage: NgForm) {
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();
    this.add();
  }

  add(): void {
    // this.api.getAllBranch(1, 1, 'SEQ_NO', 'desc', '').subscribe(data => {
    //   if (data['count'] == 0) {
    //     this.data.SEQ_NO = 1;
    //   } else {
    //     this.data.SEQ_NO = Number(data['data'][0]['SEQ_NO']) + 1;
    //     this.data.IS_ACTIVE = true;
    //   }
    // }, err => {
    //   console.log(err);
    // })
  }

  alphanumchar(event) {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode > 32 &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122) &&
      (charCode < 48 || charCode > 57)
    ) {
      return false;
    }
    return true;
  }

  alphaOnly(event) {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode > 32 &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
    return true;
  }

  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  save(addNew: boolean, accountMasterPage: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;

    const requiredFields = [
      'TYPE', 
      'ITEM_ID', 
      'UNIT_COST', 
      'TOTAL_COST', 
      'QUANTITY', 
      'UNIT_ID', 
      'WAREHOUSE_ID', 
      'DATE'
    ];
  
    const isAllFieldsEmpty = requiredFields.every(
      (field) => !this.data[field] || this.data[field].toString().trim() === ''
    );
  
    if (isAllFieldsEmpty) {
      this.isOk = false;
      this.message.error('Please fill in all required field', '');
      return;
    }
  
    // Individual field validation
    else if (!this.data.TYPE) {
      this.isOk = false;
      this.message.error('Please select a valid Type', '');
      return;
    }
  
    else if (!this.data.ITEM_ID) {
      this.isOk = false;
      this.message.error('Please select a valid Item', '');
      return;
    }
  
    else if (!this.data.UNIT_COST || this.data.UNIT_COST.trim() === '') {
      this.isOk = false;
      this.message.error('Please enter Unit Cost', '');
      return;
    }
  
    else if (!this.data.TOTAL_COST || this.data.TOTAL_COST.trim() === '') {
      this.isOk = false;
      this.message.error('Please enter Total Cost', '');
      return;
    }
  
    else if (!this.data.QUANTITY || this.data.QUANTITY.trim() === '') {
      this.isOk = false;
      this.message.error('Please enter Quantity', '');
      return;
    }
  
    else if (!this.data.UNIT_ID) {
      this.isOk = false;
      this.message.error('Please select a valid Unit', '');
      return;
    }
  
    else if (!this.data.WAREHOUSE_ID) {
      this.isOk = false;
      this.message.error('Please select a valid Warehouse', '');
      return;
    }
  
    else if (!this.data.DATE) {
      this.isOk = false;
      this.message.error('Please select a valid Date', '');
      return;
    }
    else if(this.isOk){

    }
  
  }

  // onStateChange(event: any) {
  //   if (event != null && event!= undefined) {
  //     this.api.getAllStateMaster(0, 0, '', '', ' AND ID = ' + event).subscribe(data => {
  //       this.data.STATE_NAME = data['data'][0]['NAME']
  //     },)
  //   }
  // }
}
