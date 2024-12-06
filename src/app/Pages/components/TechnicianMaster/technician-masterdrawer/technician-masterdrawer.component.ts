import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { TechnicianMasterData } from "src/app/Pages/Models/TechnicianMasterData";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";

@Component({
  selector: "app-technician-masterdrawer",
  templateUrl: "./technician-masterdrawer.component.html",
  styleUrls: ["./technician-masterdrawer.component.css"],
})
export class TechnicianMasterdrawerComponent {
  employmentType: string = "O";
  @Input() data: any = TechnicianMasterData;
  @Input() drawerClose!: () => void;
  @Input() drawerVisible: boolean = false;
  selectedTab: number = 0;
  public commonFunction = new CommonFunctionService();
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe
  ) {}
  EXPERIENCE_LEVEL = [
    { Id: "F", Name: "Fresher" },
    { Id: "J", Name: "Junior" },
    { Id: "M", Name: "Mid-Level" },
    { Id: "S", Name: "Senior" },
    { Id: "L", Name: "Lead" },
    { Id: "E", Name: "Expert" },
  ];

  VehicleData = [
    { ID: "T", NAME: "Two-Wheeler" },
    { ID: "F", NAME: "Four-Wheeler" },
  ];
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ngOnInit() {
    this.getallCountry();
    if (this.data.ID) {
      this.getCitiesByState(this.data.STATE_ID);
    }
    if (this.data.ID) {
      this.getPincodesByCity(this.data.CITY_ID);
    }
    if (this.data.ID) {
      this.getStatesByCountry(this.data.COUNTRY_ID);
    }
    this.getallVendors();
  }
  Disabled = true;
  outertab = 0;
  onSelectedIndexChange(event: any) {
    this.outertab = event;
    if (event == 0) {
    }
  }
  isSpinning = false;
  isOk = true;
  passwordVisible: boolean = false;
  resetDrawer(TaechnicianDrawer: NgForm) {
    this.data = new TechnicianMasterData();
    TaechnicianDrawer.form.markAsPristine();
    TaechnicianDrawer.form.markAsUntouched();
  }
  disableWeekEndDate = (current: Date): boolean => {
    if (this.data.WEEK_START_DATE) {
      const weekStartDate = new Date(this.data.WEEK_START_DATE);

      const startDateNormalized = new Date(
        weekStartDate.getFullYear(),
        weekStartDate.getMonth(),
        weekStartDate.getDate()
      );
      const currentDateNormalized = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate()
      );

      console.log("Current Date (Normalized):", currentDateNormalized);
      console.log("Week Start Date (Normalized):", startDateNormalized);
      console.log("Is Disabled:", currentDateNormalized < startDateNormalized);

      return currentDateNormalized < startDateNormalized;
    }
    return false;
  };
  save(addNew: boolean, TechnicianDrawer: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
      (this.data.TYPE == null || this.data.TYPE == undefined) &&
      (this.data.NAME.trim() == "" ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.EMAIL_ID.trim() == "" ||
        this.data.EMAIL_ID == null ||
        this.data.EMAIL_ID == undefined) &&
      (this.data.MOBILE_NUMBER == undefined ||
        this.data.MOBILE_NUMBER == null ||
        this.data.MOBILE_NUMBER == 0) &&
      (this.data.GENDER == null || this.data.GENDER == undefined) &&
      (this.data.AADHAR_NUMBER == null ||
        this.data.AADHAR_NUMBER == undefined) &&
      (this.data.ADDRESS_LINE_1.trim() == "" ||
        this.data.ADDRESS_LINE_1 == null ||
        this.data.ADDRESS_LINE_1 == undefined) &&
      (this.data.COUNTRY_ID == undefined ||
        this.data.COUNTRY_ID == null ||
        this.data.COUNTRY_ID == 0) &&
      (this.data.STATE_ID == null ||
        this.data.STATE_ID == undefined ||
        this.data.STATE_ID == 0) &&
      (this.data.CITY_ID == undefined ||
        this.data.CITY_ID == null ||
        this.data.CITY_ID == 0) &&
      (this.data.PINCODE_ID == undefined ||
        this.data.PINCODE_ID == null ||
        this.data.PINCODE_ID == 0) &&
      (this.data.VEHICLE_TYPE == undefined ||
        this.data.VEHICLE_TYPE == null ||
        this.data.VEHICLE_TYPE == 0) &&
      (this.data.VEHICLE_DETAILS == undefined ||
        this.data.VEHICLE_DETAILS == null ||
        this.data.VEHICLE_DETAILS == 0) &&
      (this.data.VEHICLE_NO == undefined ||
        this.data.VEHICLE_NO == null ||
        this.data.VEHICLE_NO == 0)
    ) {
      this.isOk = false;
      this.message.error("Please Fill All The Required Fields ", "");
    } else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Technician Name", "");
    } else if (
      this.data.EMAIL_ID == null ||
      this.data.EMAIL_ID == undefined ||
      this.data.EMAIL_ID.trim() == ""
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Email Id", "");
    } else if (
      this.data.MOBILE_NUMBER == null ||
      this.data.MOBILE_NUMBER == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Mobile No.", "");
    } else if (this.data.GENDER == null || this.data.GENDER == undefined) {
      this.isOk = false;
      this.message.error(" Please Enter Gender", "");
    } else if (
      this.data.AADHAR_NUMBER == null ||
      this.data.AADHAR_NUMBER == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Aadhaar No", "");
    } else if (
      this.data.ADDRESS_LINE1 == null ||
      this.data.ADDRESS_LINE1 == undefined ||
      this.data.ADDRESS_LINE1.trim() == ""
    ) {
      this.isOk = false;
      this.message.error("Please Enter Address", "");
    } else if (
      this.data.COUNTRY_ID == null ||
      this.data.COUNTRY_ID == undefined ||
      this.data.COUNTRY_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Select Country Name", "");
    } else if (
      this.data.STATE_ID == null ||
      this.data.STATE_ID == undefined ||
      this.data.STATE_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Select State Name", "");
    } else if (
      this.data.CITY_ID == null ||
      this.data.CITY_ID == undefined ||
      this.data.CITY_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Select City Name", "");
    } else if (
      this.data.PINCODE_ID == null ||
      this.data.PINCODE_ID == undefined ||
      this.data.PINCODE_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please Select Pincode", "");
    } else if (
      this.data.VEHICLE_TYPE == null ||
      this.data.VEHICLE_TYPE == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Select Vehicle Type", "");
    } else if (
      this.data.VEHICLE_NO == null ||
      this.data.VEHICLE_NO == undefined
    ) {
      this.isOk = false;
      this.message.error(" Please Enter Vehicle No.", "");
    }
    this.data.DOB = this.datePipe.transform(this.data.DOB, "yyyy-MM-dd");
    this.data.CONTRACT_START_DATE = this.datePipe.transform(
      this.data.CONTRACT_START_DATE,
      "yyyy-MM-dd"
    );
    this.data.CONTRACT_END_DATE = this.datePipe.transform(
      this.data.CONTRACT_END_DATE,
      "yyyy-MM-dd"
    );
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api
            .updateTechnicianData(this.data)
            .subscribe((successCode: any) => {
              if (successCode.code == "200") {
                this.message.success(
                  "Technician Data Updated Successfully",
                  ""
                );
                if (!addNew) this.drawerClose();
                this.Disabled = false;
                this.selectedTab = 1;
                this.isSpinning = false;
              } else {
                this.message.error("Technician Data Updation Failed", "");
                this.isSpinning = false;
              }
            });
        } else {
          this.api
            .createTechnicianData(this.data)
            .subscribe((successCode: any) => {
              if (successCode.code == "200") {
                this.message.success(
                  "Technician Data Created Successfully",
                  ""
                );
                if (!addNew) {
                  this.drawerClose();
                  this.Disabled = false;
                  this.selectedTab = 1;
                } else {
                  this.data = new TechnicianMasterData();
                  this.resetDrawer(TechnicianDrawer);
                  this.api.getTechnicianData(0, 0, "", "desc", "").subscribe(
                    (data) => {},
                    () => {}
                  );
                }
                this.isSpinning = false;
              } else {
                this.message.error("Technician Data Creation Failed...", "");
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
      .getAllCityMaster(0, 0, "", "", "AND STATE_ID=" + stateId)
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
    this.api.getAllPincode(0, 0, "", "", "AND CITY_ID=" + cityId).subscribe(
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
  VenderData: any[] = [];
  getallVendors() {
    this.api.getVendorData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] === 200) {
          this.VenderData = data["data"];
        } else {
          this.VenderData = [];
          this.message.error("Failed To Vendor Data...", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong...", "");
      }
    );
  }
}
