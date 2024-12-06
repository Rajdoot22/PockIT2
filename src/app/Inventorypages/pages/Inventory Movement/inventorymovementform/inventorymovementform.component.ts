import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { CookieService } from "ngx-cookie-service";
import { inventoryMovement } from "src/app/Inventorypages/inventorymodal/inventoryMovement";
// import { inventoryMovement } from 'src/app/Pages/Models/inventoryMovement';
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";

@Component({
  selector: "app-inventorymovementform",
  templateUrl: "./inventorymovementform.component.html",
  styleUrls: ["./inventorymovementform.component.css"],
})
export class InventorymovementformComponent {
  @Input() drawerClose: Function;
  @Input() data: inventoryMovement;
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
  InventorySubCategoryList: any = [];
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
    this.getSubCategory();
    this.getUnits();
  }
  onCategoryChange(Id: number) {
    this.getInventorySubCategory();
  }
  getSubCategory() {
    this.api
      .getSubCategoryData(0, 0, "id", "desc", " AND STATUS=1")
      .subscribe((categorysuccess) => {
        if (categorysuccess.code == 200) {
          this.InventorySubCategoryList = categorysuccess["data"];
        } else {
          this.InventorySubCategoryList = [];
        }
      });
  }
  getUnits() {
    this.api
      .getUnitData(0, 0, "id", "desc", " AND IS_ACTIVE=1")
      .subscribe((unitdata) => {
        if (unitdata.code == 200) {
          this.UnitList = unitdata["data"];
        } else {
          this.UnitList = [];
        }
      });
  }
  getInventorySubCategory() {}
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
      !this.data.SOURCE_WAREHOUSE_ID &&
      !this.data.DESTINATION_WAREHOUSE_ID &&
      !this.data.DATE &&
      !this.data.REASON &&
      this.data.REASON.trim() === ""
    ) {
      this.isOk = false;
      this.message.error("Please fill all required fields", "");
      return;
    }

    else if (!this.data.SOURCE_WAREHOUSE_ID) {
      this.isOk = false;
      this.message.error("Please select a valid source warehouse", "");
    } else if (!this.data.DESTINATION_WAREHOUSE_ID) {
      this.isOk = false;
      this.message.error("Please select a valid destination warehouse", "");
    }
    else if (!this.data.REASON || this.data.REASON.trim() === "") {
      this.isOk = false;
      this.message.error("Please provide a reason", "");
    } else if (this.data.REASON.length > 512) {
      this.isOk = false;
      this.message.error("Reason cannot exceed 512 characters", "");
    }

     else if (!this.data.DATE) {
      this.isOk = false;
      this.message.error("Please select a valid date", "");
    } 
    else if (this.isOk) {
      this.isSpinning = true;
      // this.submitForm();
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
