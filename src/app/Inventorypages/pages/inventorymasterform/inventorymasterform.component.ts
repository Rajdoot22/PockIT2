import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { CookieService } from "ngx-cookie-service";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";
import { InventoryMaster } from "../../inventorymodal/inventoryMaster";

@Component({
  selector: "app-inventorymasterform",
  templateUrl: "./inventorymasterform.component.html",
  styleUrls: ["./inventorymasterform.component.css"],
})
export class InventorymasterformComponent {
  @Input() drawerClose: Function;
  @Input() data: InventoryMaster;
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
  InventorySubCategoryList: any=[];
  InventoryCategoryList:any =[]

  UnitList: any=[];
  warehouseList: any = [];
  constructor(
    private api: ApiServiceService,
    private cookie: CookieService,
    private datePipe: DatePipe,
    private message: NzNotificationService
  ) {}

  ngOnInit() {
    this.getSubCategory()
    this.getUnits()
  }
  onCategoryChange(Id:number){
    this.getInventorySubCategory()
  }
  getSubCategory(){
    this.api.getSubCategoryData(0,0,'id','desc',' AND STATUS=1').subscribe(categorysuccess=>{
      if(categorysuccess.code==200){
        this.InventorySubCategoryList=categorysuccess['data']
      }
      else{
        this.InventorySubCategoryList=[]
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
      'ITEM_NAME',
      'INVENTORY_CATEGORY_ID',
      'INVENTRY_SUB_CATEGORY_ID',
      'PURCHASE_PRICE',
      'SELLING_PRICE',
      'QUANTITY',
      'UNIT_ID',
      'LOCATION_ID',
      'DATE_OF_ENTRY',
    ];
  
    let isAllEmpty = true;
  
    for (const field of requiredFields) {
      if (this.data[field] !== undefined && this.data[field] !== null && this.data[field] !== '') {
        isAllEmpty = false;
        break;
      }
    }
  
    if (isAllEmpty) {
      this.isOk = false;
      this.message.error('Please fill all required fields', '');
      return;
    } else if (!this.data.ITEM_NAME) {
      this.isOk = false;
      this.message.error('Please enter Item Name', '');
      return;
    } else if (!this.data.INVENTORY_CATEGORY_ID) {
      this.isOk = false;
      this.message.error('Please select Inventory Category', '');
      return;
    } else if (!this.data.INVENTRY_SUB_CATEGORY_ID) {
      this.isOk = false;
      this.message.error('Please select Inventory Sub Category', '');
      return;
    } else if (!this.data.PURCHASE_PRICE) {
      this.isOk = false;
      this.message.error('Please enter Purchase Price', '');
      return;
    } else if (!this.data.SELLING_PRICE) {
      this.isOk = false;
      this.message.error('Please enter Selling Price', '');
      return ;
    } else if (!this.data.QUANTITY) {
      this.isOk = false;
      this.message.error('Please enter Quantity', '');
      return ;
    } else if (!this.data.UNIT_ID) {
      this.isOk = false;
      this.message.error('Please select Unit', '');
      return ;
    } else if (!this.data.LOCATION_ID) {
      this.isOk = false;
      this.message.error('Please select Location', '');
      return ;
    } else if (!this.data.DATE_OF_ENTRY) {
      this.isOk = false;
      this.message.error('Please select Date of Entry', '');
      return ;
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
