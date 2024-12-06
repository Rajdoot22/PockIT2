import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { TerritoryMaster } from "src/app/Pages/Models/TerritoryMaster";
import { ApiServiceService } from "src/app/Service/api-service.service";

export class Data {
  PINCODE_ID: any = [];
  PINCODE: any = [];
  STATE_ID: number;
  STATE_NAME: string;
  STATUS: boolean = true;
}

@Component({
  selector: "app-territory-pincode-mapping",
  templateUrl: "./territory-pincode-mapping.component.html",
  styleUrls: ["./territory-pincode-mapping.component.css"],
})
export class TerritoryPincodeMappingComponent {
  @Input() data: any = TerritoryMaster;
  @Input() drawerClose: any = Function;
  @Input() drawerVisible: boolean = false;
  saveData: any = new Data();

  PincodeMappingdata: any[] = [];
  searchText: string = "";
  isSpinning = false;
  // columns: string[][] = [['TRAINEE_NAME', 'TRAINEE_NAME']];

  allSelected = false;
  tableIndeterminate: boolean = false;

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.getStateData();
    this.PincodeMapping();
  }

  // countryData: any = [];
  // getCountryData() {
  //   this.api.getAllCountryMaster(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
  //     (data) => {
  //       if (data['code'] == 200) {
  //         this.countryData = data['data'];
  //       } else {
  //         this.countryData = [];
  //         this.message.error('Failed To Get Country Data', '');
  //       }
  //     },
  //     () => {
  //       this.message.error('Something Went Wrong', '');
  //     }
  //   );
  // }

  stateData: any = [];
  getStateData() {
    this.api
      .getState(0, 0, "", "", "AND COUNTRY_ID=" + this.data.COUNTRY_ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.stateData = data["data"];
          } else {
            this.stateData = [];
            this.message.error("Failed To Get State Data", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }

  pincodeData: any = [];
  getPincodeData(stateId) {
    this.api.getAllPincode(0, 0, "", "", "AND STATE_ID =" + stateId).subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.pincodeData = data["data"];
        } else {
          this.pincodeData = [];
          this.message.error("Failed To Get Pincode Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  PincodeMapping() {
    this.isSpinning = true;

    // Call the API with the constructed query
    this.api
      .getterritoryPincodeData(
        0,
        0,
        "",
        "",
        "AND TERRITORY_ID =" + this.data.ID
      )
      .subscribe(
        (data) => {
          if (data["code"] === 200) {
            this.PincodeMappingdata = data["data"];
            console.log("this.PincodeMappingdata ", this.PincodeMappingdata);

            // this.originalTraineeData = [...this.PincodeMappingdata];
          } else {
            this.PincodeMappingdata = [];
            this.message.error("Failed To Get Pincode Mapping Data...", "");
          }
          this.isSpinning = false;
        },
        () => {
          this.message.error("Something Went Wrong ...", "");
          this.isSpinning = false;
        }
      );
  }

  close() {
    this.drawerClose();
  }
  // save() {
  //   this.isSpinning = true;

  //   // // Proceed with saving data if all entries are valid
  //   // const dataToSave = this.PincodeMappingdata.filter(
  //   //   (data) => data.STATUS === true || data.STATUS == '1'
  //   // ).map((data) => ({
  //   //   STATE_ID: data.STATE_ID,
  //   //  PINCODE_ID:data.PINCODE_ID,

  //   //   STATUS: data.STATUS

  //   // }));

  // }

  Cancel() {}
  // apply(){
  //    // Prepare the data to add to the table
  // const selectedState = this.stateData.find(state => state.ID === this.data.STATE_ID)?.NAME;
  // const selectedPincodes = this.data.PINCODE_ID.map(pincodeId => {
  //   const pincode = this.pincodeData.find(pin => pin.ID === pincodeId);
  //   return {
  //     PINCODE: pincode?.PINCODE,
  //     PINCODE_ID: pincodeId,
  //   };
  // });

  // // Add each selected pincode to the table data
  // selectedPincodes.forEach(pincode => {
  //   const entry = {
  //     STATE_NAME: selectedState,
  //     STATE_ID: this.data.STATE_ID,
  //     ...pincode,
  //     STATUS: true, // Default status
  //   };

  //   // Prevent duplicate entries
  //   const exists = this.PincodeMappingdata.some(
  //     item => item.STATE_ID === entry.STATE_ID && item.PINCODE_ID === entry.PINCODE_ID
  //   );
  //   if (!exists) {
  //     this.PincodeMappingdata.push(entry);
  //   }
  // });

  // // Reset inputs
  // this.data.STATE_ID = null;
  // this.data.PINCODE_ID = [];
  // this.message.success("Pincode's added successfully.", '');
  //    }
  apply(teritorymaster: NgForm): void {
    
  }

  resetDrawer(teritorymaster: NgForm) {
    this.saveData.STATE_ID = null;
    this.saveData.PINCODE_ID = [];
    teritorymaster.form.markAsPristine();
    teritorymaster.form.markAsUntouched();
  }
  add(teritorymaster: NgForm): void {
    if (
      (this.saveData.PINCODE_ID == 0 ||
        this.saveData.PINCODE_ID == undefined ||
        this.saveData.PINCODE_ID == null) &&
      (this.saveData.STATE_ID == 0 ||
        this.saveData.STATE_ID == undefined ||
        this.saveData.STATE_ID == null)
    ) {
      this.message.error("Please select State and Pincode.", "");
      return;
    } else if (
      this.saveData.PINCODE_ID == 0 ||
      this.saveData.PINCODE_ID == undefined ||
      this.saveData.PINCODE_ID == null
    ) {
      this.message.error("Please select Pincode.", "");
      return;
    } else if (
      this.saveData.STATE_ID == 0 ||
      this.saveData.STATE_ID == undefined ||
      this.saveData.STATE_ID == null
    ) {
      this.message.error("Please select Pincode.", "");
      return;
    } else {
     // Find the selected state name
    const selectedState = this.stateData.find(
      (state) => state.ID === this.saveData.STATE_ID
    )?.NAME;

    // Map the selected pincodes to their names and IDs
    const selectedPincodes = this.saveData.PINCODE_ID.map((pincodeId) => {
      const pincode = this.pincodeData.find((pin) => pin.ID === pincodeId);
      return {
        PINCODE: pincode?.PINCODE,
        PINCODE_ID: pincodeId,
      };
    });

    // Add entries for each selected pincode to the table
    console.log("selectedPincodes", selectedPincodes);

    selectedPincodes.forEach((pincode) => {
      const entry = {
        STATE_NAME: selectedState,
        STATE_ID: this.saveData.STATE_ID,
        ...pincode,
        STATUS: true, // Default status
      };

      // Prevent duplicate entries
      const exists = this.PincodeMappingdata.some(
        (item) =>
          item.STATE_ID === entry.STATE_ID &&
          item.PINCODE_ID === entry.PINCODE_ID
      );

      if (!exists) {
        this.PincodeMappingdata.push(entry);
      }
      // console.log('entry',entry);
      this.PincodeMappingdata = [...[], ...this.PincodeMappingdata];
    });

    // Reset the inputs
   
    this.resetDrawer(teritorymaster);
    // Notify success
    this.message.success("Pincode's added successfully.", "");
    this.pincodeData = [];
    }
  }

  save() {
    this.isSpinning = true;

    // Proceed with saving data if all entries are valid
    const dataToSave = this.PincodeMappingdata.filter(
      (data) => data.STATUS === true || data.STATUS == "1"
    ).map((data) => ({
      PINCODE_ID: this.data.ID,
      STATUS: data.STATUS,
    }));

    // Call the API to save the task mapping data
    this.api.addTerritoryPincodeMapping(this.data.ID, 1, dataToSave).subscribe(
      (successCode) => {
        if (successCode["code"] === 200) {
          this.message.success(
            "Pincodes Successfully Mapped to the Territory.",
            ""
          );
          this.isSpinning = false;
          this.drawerClose();
        } else {
          this.message.error("Failed to Map Pincodes to the Territory", "");
        }
        this.isSpinning = false;
      },
      () => {
        this.isSpinning = false;
        this.message.error("Something Went Wrong.", "");
      }
    );
  }
}
