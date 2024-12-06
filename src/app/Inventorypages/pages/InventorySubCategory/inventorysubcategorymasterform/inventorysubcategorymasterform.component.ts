import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { CookieService } from "ngx-cookie-service";
import { InventorySubCategory } from "src/app/Inventorypages/inventorymodal/inventorysubCategory";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";

@Component({
  selector: "app-inventorysubcategorymasterform",
  templateUrl: "./inventorysubcategorymasterform.component.html",
  styleUrls: ["./inventorysubcategorymasterform.component.css"],
})
export class InventorysubcategorymasterformComponent {
  @Input() drawerClose: Function;
  @Input() data: InventorySubCategory;
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
  inventoryList: any = [];
  InventoryCategoryList: any = [];

  UnitList: any = [];
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

    if (
     ( this.data.INVENTRY_CATEGORY_ID == undefined ||
      this.data.INVENTRY_CATEGORY_ID == "") &&
     ( this.data.ITEM_ID == undefined ||
      this.data.ITEM_ID == "" )&&
    (  this.data.NAME == undefined ||
      this.data.NAME == "" )&&
     ( this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION == "") 
    ) {
      this.isOk = false;
      this.message.error("Please Fill All Required Fields", "");
    } else if (
      this.data.INVENTRY_CATEGORY_ID == undefined ||
      this.data.INVENTRY_CATEGORY_ID == ""
    ) {
      this.isOk = false;
      this.message.error("Please Select Inventory Category", "");
    } else if (this.data.ITEM_ID == undefined || this.data.ITEM_ID == "") {
      this.isOk = false;
      this.message.error("Please Select Item", "");
    } else if (this.data.NAME == undefined || this.data.NAME == "") {
      this.isOk = false;
      this.message.error("Please Enter Name", "");
    } else if (
      this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION == ""
    ) {
      this.isOk = false;
      this.message.error("Please Enter Description", "");
    }  else if (this.isOk) {
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
