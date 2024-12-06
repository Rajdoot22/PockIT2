import { Component, Input } from "@angular/core";
// import { VendorMasterData } from "../../Models/vendorMaterData";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { VendorMasterData } from "src/app/Pages/Models/vendorMaterData";

@Component({
  selector: "app-vendor-master-drawer",
  templateUrl: "./vendor-master-drawer.component.html",
  styleUrls: ["./vendor-master-drawer.component.css"],
})
export class VendorMasterDrawerComponent {
  @Input() data: VendorMasterData = new VendorMasterData();
  @Input() drawerClose!: () => void;
  @Input() drawerVisible: boolean = false;
  public commonFunction = new CommonFunctionService();
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe
  ) {}
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.getallCountry();
    // this.getStatesByCountry();
    // this.getCitiesByState();
    // this.getPincodesByCity();
    if (this.data.ID) {
      this.getCitiesByState(this.data.STATE_ID);
    }
    if (this.data.ID) {
      this.getCitiesByState(this.data.STATE_ID);
    }
    if (this.data.ID) {
      this.getCitiesByState(this.data.STATE_ID);
    }
  }
  isSpinning = false;
  isOk = true;
  passwordVisible: boolean = false;
  resetDrawer(VendorDrawer: NgForm) {
    // this.data = new VendorMasterData();
    VendorDrawer.form.markAsPristine();
    VendorDrawer.form.markAsUntouched();
  }
  save(addNew: boolean, VendorDrawer: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
      (this.data.BUSINESS_NAME.trim() == "" ||
        this.data.BUSINESS_NAME == null ||
        this.data.BUSINESS_NAME == undefined) &&
      (this.data.NAME.trim() == "" ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.EMAIL_ID.trim() == "" ||
        this.data.EMAIL_ID == null ||
        this.data.EMAIL_ID == undefined) &&
      (this.data.MOBILE_NUMBER == undefined ||
        this.data.MOBILE_NUMBER == null ||
        this.data.MOBILE_NUMBER == 0) &&
      (this.data.GST_NO.trim() == "" ||
        this.data.GST_NO == null ||
        this.data.GST_NO == undefined) &&
      (this.data.PAN.trim() == "" ||
        this.data.PAN == null ||
        this.data.PAN == undefined) &&
      (this.data.ADDRESS_LINE_1.trim() == "" ||
        this.data.ADDRESS_LINE_1 == null ||
        this.data.ADDRESS_LINE_1 == undefined) &&
      (this.data.COUNTRY_ID == undefined ||
        this.data.COUNTRY_ID == null ||
        this.data.COUNTRY_ID == 0) &&
      (this.data.STATE_ID.trim() == "" ||
        this.data.STATE_ID == null ||
        this.data.STATE_ID == undefined) &&
      (this.data.CITY_ID == undefined ||
        this.data.CITY_ID == null ||
        this.data.CITY_ID == 0) &&
      (this.data.PINCODE_ID == undefined ||
        this.data.PINCODE_ID == null ||
        this.data.PINCODE_ID == 0)
    ) {
      this.isOk = false;
      this.message.error("Please Fill All The Required Fields ", "");
    } else if (
      this.data.BUSINESS_NAME == null ||
      this.data.BUSINESS_NAME == undefined ||
      this.data.BUSINESS_NAME.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Business Name.", "");
    } else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Contact Person Name.", "");
    } else if (
      this.data.EMAIL_ID == null ||
      this.data.EMAIL_ID == undefined ||
      this.data.EMAIL_ID.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Email ID.", "");
    } else if (
      this.data.EMAIL_ID == null ||
      this.data.EMAIL_ID == undefined ||
      this.data.EMAIL_ID.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter GST No.", "");
    } else if (
      this.data.GST_NO == null ||
      this.data.GST_NO == undefined ||
      this.data.GST_NO.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter PAN.", "");
    } else if (
      this.data.PAN == null ||
      this.data.PAN == undefined ||
      this.data.PAN == 0
    ) {
      this.isOk = false;
      this.message.error("Please Enter Country Name.", "");
    } else if (
      this.data.STATE_ID == null ||
      this.data.STATE_ID == undefined ||
      this.data.STATE_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Enter State Name.", "");
    } else if (
      this.data.CITY_ID == null ||
      this.data.CITY_ID == undefined ||
      this.data.CITY_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Enter City Name.", "");
    } else if (
      this.data.MOBILE_NUMBER == null ||
      this.data.MOBILE_NUMBER == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Mobile No.", "");
    } else if (
      this.data.PINCODE_ID == null ||
      this.data.PINCODE_ID == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Pincode.", "");
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateVendorData(this.data).subscribe((successCode: any) => {
            if (successCode.code == "200") {
              this.message.success("Vendor Data Updated Successfully", "");
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error("Vendor Data Updation Failed", "");
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createVendorData(this.data).subscribe((successCode: any) => {
            if (successCode.code == "200") {
              this.message.success("Vendor Data Created Successfully", "");
              if (!addNew) this.drawerClose();
              else {
                // this.data = new VendorMasterData();
                this.resetDrawer(VendorDrawer);
                this.api.getVendorData(0, 0, "", "desc", "").subscribe(
                  (data) => {},
                  () => {}
                );
              }
              this.isSpinning = false;
            } else {
              this.message.error("Vendor Data Creation Failed...", "");
              this.isSpinning = false;
            }
          });
        }
      }
    }
  }
  close() {
    this.drawerClose();
  }

  CityData: any = [];
  PincodeData: any = [];
  StateData: any = [];
  CountryData: any = [];
  getallCountry() {
    this.api.getCountryData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.CountryData = data["data"];
        } else {
          this.CountryData = [];
          this.message.error("Failed To Get Country Data...", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong ...", "");
      }
    );
  }

  // Fetch states based on country ID
  // getStatesByCountry() {
  //   this.api.getAllStateMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
  //     (data) => {
  //       if (data["code"] === 200) {
  //         this.StateData = data["data"];
  //       } else {
  //         this.StateData = [];
  //         this.message.error("Failed To Get State Data...", "");
  //       }
  //     },
  //     () => {
  //       this.message.error("Something Went Wrong...", "");
  //     }
  //   );
  // }

  // Fetch cities based on state ID
  // getCitiesByState() {
  //   this.api.getAllCityMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
  //     (data) => {
  //       if (data["code"] === 200) {
  //         this.CityData = data["data"];
  //       } else {
  //         this.CityData = [];
  //         this.message.error("Failed To Get City Data...", "");
  //       }
  //     },
  //     () => {
  //       this.message.error("Something Went Wrong...", "");
  //     }
  //   );
  // }

  // Fetch pincodes based on city ID
  // getPincodesByCity() {
  //   this.api.getAllPincode(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
  //     (data) => {
  //       if (data["code"] === 200) {
  //         this.PincodeData = data["data"];
  //       } else {
  //         this.PincodeData = [];
  //         this.message.error("Failed To Get Pincode Data...", "");
  //       }
  //     },
  //     () => {
  //       this.message.error("Something Went Wrong...", "");
  //     }
  //   );
  // }
  getStatesByCountry(countryId: any) {
    this.api
      .getAllStateMaster(0, 0, "", "", " AND COUNTRY_ID=" + countryId)
      .subscribe(
        (data) => {
          if (data["code"] === 200) {
            this.StateData = data["data"];
          } else {
            this.StateData = [];
            this.message.error("Failed To Get State Data...", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong...", "");
        }
      );
  }

  // Fetch cities based on state ID
  getCitiesByState(stateId: number) {
    this.api
      .getAllCityMaster(0, 0, "", "", "  AND STATE_ID=" + stateId)
      .subscribe(
        (data) => {
          if (data["code"] === 200) {
            this.CityData = data["data"];
          } else {
            this.CityData = [];
            this.message.error("Failed To Get City Data...", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong...", "");
        }
      );
  }

  // Fetch pincodes based on city ID
  getPincodesByCity(cityId: number) {
    this.api.getAllPincode(0, 0, "", "", "  AND CITY_ID=" + cityId).subscribe(
      (data) => {
        if (data["code"] === 200) {
          this.PincodeData = data["data"];
        } else {
          this.PincodeData = [];
          this.message.error("Failed To Get Pincode Data...", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong...", "");
      }
    );
  }
}
