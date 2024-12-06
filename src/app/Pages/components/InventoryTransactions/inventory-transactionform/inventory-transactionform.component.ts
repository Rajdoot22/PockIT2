import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { InventoryTransaction } from 'src/app/Pages/Models/inventoryTransactions';
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

    //     if (this.data.NAME == undefined && this.data.ADDRESS == undefined
    //        && this.data.CITY_ID== undefined &&  this.data.COUNTRY_ID== undefined &&
    //        this.data.STATE_ID == undefined && this.data.PINCODE_ID == undefined) {
    //       this.isOk = false
    //       this.message.error('Please fill all required details', '')
    //     }

    //     else if ((this.data.NAME == undefined || this.data.NAME == '')) {
    //       this.isOk = false;
    //       this.message.error("Please Enter Branch Name", '');
    //     }

    //     else if (this.data.ADDRESS== undefined || this.data.ADDRESS == '') {
    //       this.isOk = false;
    //       this.message.error("Please Enter Address ", '');
    //     }

    //     else if (this.data.COUNTRY_ID == undefined || this.data.COUNTRY_ID == '') {
    //       this.isOk = false;
    //       this.message.error("Please Enter City", '');
    //     }
    //     else if (this.data.STATE_ID == undefined || this.data.STATE_ID == '') {
    //       this.isOk = false;
    //       this.message.error("Please Select State", '');
    //     }

    //     else if (this.data.CITY_ID == undefined || this.data.CITY_ID == '') {
    //       this.isOk = false;
    //       this.message.error("Please Enter City", '');
    //     }
    //     else if (this.data.PINCODE_ID == undefined) {
    //       this.isOk = false;
    //       this.message.error("Please Enter Pincode", '');
    //     }
    //     else if (
    //       this.data.SHORT_CODE == null ||
    //       this.data.SHORT_CODE == undefined ||
    //       this.data.SHORT_CODE == 0
    //     ) {
    //       this.isOk = false;
    //       this.message.error('Please Enter Short Code', '');
    //     }
    //     else if (

    //       this.data.SEQ_NO == undefined ||
    //       this.data.SEQ_NO == null ||
    //       this.data.SEQ_NO == 0
    //     ) {
    //       this.isOk = false;
    //       this.message.error('Please Enter Sequence No.', '');
    //     }

    //     if (this.isOk) {
    //       this.isSpinning = true;

    //       this.orgId = this.cookie.get('orgId');
    // this.data.ORG_ID=this.orgId
    //       if (this.data.ID) {
    //         this.api.updateBranch(this.data).subscribe(successCode => {
    //           if (successCode['code'] == 200) {
    //             this.message.success("Branch Information Updated Successfully", "");
    //             this.isSpinning = false;

    //             if (!addNew)
    //               this.close(accountMasterPage);

    //           } else {
    //             this.message.error("Branch Information Updation Failed", "");
    //             this.isSpinning = false;
    //           }
    //         });

    //       } else {
    //         this.api.createBranch(this.data).subscribe(successCode => {
    //           if (successCode['code'] == 200) {
    //             this.message.success("Branch Information Saved Successfully", "");
    //             this.isSpinning = false;

    //             if (!addNew) {
    //               this.close(accountMasterPage);

    //             } else {
    //               this.data = new InventoryMaster();
    //               this.resetDrawer(accountMasterPage);
    //             }

    //           } else {
    //             this.message.error("cannot save Branch Information", "");
    //             this.isSpinning = false;
    //           }
    //         });
    //       }
    //     }
  }

  // onStateChange(event: any) {
  //   if (event != null && event!= undefined) {
  //     this.api.getAllStateMaster(0, 0, '', '', ' AND ID = ' + event).subscribe(data => {
  //       this.data.STATE_NAME = data['data'][0]['NAME']
  //     },)
  //   }
  // }
}
