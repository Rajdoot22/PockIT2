import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { TerritoryMaster } from "src/app/Pages/Models/TerritoryMaster";
import { ApiServiceService } from "src/app/Service/api-service.service";

export class Data {
  PINCODE_ID: any = [];
  PINCODE: any = [];
  STATE_ID: number;
  STATE_NAME: string;
  CITY_ID: number;
  CITY_NAME: string;
  IS_ACTIVE: boolean = true;
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
  sortValue: string = "desc";
  sortKey: string = "STATE_NAME";
  pageIndex = 1;
  pageSize = 10;
  PincodeMappingdata: any[] = [];
  mappedPincodeIds: number[] = [];
  searchText: string = "";
  isSpinning = false;
  isStateSpinning = false;
  isPincodeSpinning = false;
  isCitySpinning = false;
  issaveSpinning = false;
  // columns: string[][] = [['TRAINEE_NAME', 'TRAINEE_NAME']];

  allSelected = false;
  tableIndeterminate: boolean = false;
  selectedPincode: any[] = [];

  city: any[] = [];
  state: any[] = [];
  filterQuery: string = "";

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.getStateData();
    // this.PincodeMapping();
  }

  stateData: any = [];
  getStateData() {
    this.isStateSpinning = true;
    this.api
      .getState(0, 0, "", "", "AND COUNTRY_ID=" + this.data.COUNTRY_ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.stateData = data["data"];
            this.isStateSpinning = false;
          } else {
            this.stateData = [];
            this.message.error("Failed To Get State Data", "");
            this.isStateSpinning = false;
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
          this.isStateSpinning = false;
        }
      );
  }
  cityData: any = [];
  getCityData(stateId: number) {

    
    if (!stateId) {
      this.cityData = []; // Reset city data if no state is selected
      return;
    }

    this.isCitySpinning = true;

    this.api.getCity(0, 0, "", "", "AND STATE_ID =" + stateId).subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.cityData = data["data"];
          this.isCitySpinning = false;
        } else {
          this.cityData = [];
          this.message.error("Failed To Get City Data", "");
          this.isCitySpinning = false;
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
        this.isCitySpinning = false;
      }
    );
  }
  pincodeData: any = [];
  getPincodeData(cityId: number) {
    console.log('cityId',cityId);
    if (!cityId) {
      this.pincodeData = []; // Reset pincode data if no state is selected
      return;
    }

    this.isPincodeSpinning = true;

      // Find the corresponding state ID for the selected city
  const selectedCity = this.cityData.find((city) => city.ID === cityId);
  const stateId = selectedCity ? selectedCity.STATE_ID : null;

    // Fetch all pincodes for the selected state
    this.api.getAllPincode(0, 0, "", "", "AND STATE_ID =" + stateId).subscribe(
      (pincodeResponse) => {
        if (pincodeResponse["code"] === 200) {
          const fetchedPincodes = pincodeResponse["data"];

          // Filter out mapped pincodes using this.PincodeMappingdata
          const mappedPincodeIds = this.PincodeMappingdata.map(
            (item) => item.PINCODE_ID
          );

          // Filter pincodes that are not already mapped
          this.pincodeData = fetchedPincodes.filter(
            (pincode) => !mappedPincodeIds.includes(pincode.ID)
          );

          console.log("Filtered Pincode Data: ", this.pincodeData);
        } else {
          this.pincodeData = [];
          this.message.error("Failed To Get Pincode Data", "");
        }
        this.isPincodeSpinning = false;
      },
      () => {
        this.message.error(
          "Something Went Wrong While Fetching Pincode Data",
          ""
        );
        this.isPincodeSpinning = false;
      }
    );
  }

  PincodeMapping() {
    this.isSpinning = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    } catch (error) {
      sort = "";
    }
    // Call the API with the constructed query
    this.api
      .getterritoryPincodeData(
        0,
        0,
        this.sortKey,
        sort,
        "AND TERRITORY_ID =" + this.data.ID + this.filterQuery
      )
      .subscribe(
        (data) => {
          if (data["code"] === 200) {
            this.PincodeMappingdata = data["data"];
            console.log("this.PincodeMappingdata ", this.PincodeMappingdata);
          } else {
            this.PincodeMappingdata = [];
            this.mappedPincodeIds = [];
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

  sort(params: NzTableQueryParams) {
    this.isSpinning = true;
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || "id";
    const sortOrder = (currentSort && currentSort.value) || "desc";
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
    this.PincodeMapping();
  }

  close() {
    this.drawerClose();
  }

  Cancel() {}

  resetDrawer(teritorymaster: NgForm) {
    this.saveData.STATE_ID = null;
    this.saveData.CITY_ID = null;
    this.saveData.PINCODE_ID = [];
    teritorymaster.form.markAsPristine();
    teritorymaster.form.markAsUntouched();
  }

  // Add into table
  add(teritorymaster: NgForm): void {
    if (
      (this.saveData.PINCODE_ID == 0 ||
        this.saveData.PINCODE_ID == undefined ||
        this.saveData.PINCODE_ID == null) &&
      (this.saveData.STATE_ID == 0 ||
        this.saveData.STATE_ID == undefined ||
        this.saveData.STATE_ID == null) &&
      (this.saveData.CITY_ID == 0 ||
        this.saveData.CITY_ID == undefined ||
        this.saveData.CITY_ID == null)
    ) {
      this.message.error("Please select State and Pincode.", "");
      return;
    } else if (
      this.saveData.STATE_ID == 0 ||
      this.saveData.STATE_ID == undefined ||
      this.saveData.STATE_ID == null
    ) {
      this.message.error("Please select State.", "");
      return;
    } else if (
      this.saveData.CITY_ID == 0 ||
      this.saveData.CITY_ID == undefined ||
      this.saveData.CITY_ID == null
    ) {
      this.message.error("Please select City.", "");
      return;
    } else if (
      this.saveData.PINCODE_ID == 0 ||
      this.saveData.PINCODE_ID == undefined ||
      this.saveData.PINCODE_ID == null
    ) {
      this.message.error("Please select Pincode.", "");
      return;
    } else {
      this.issaveSpinning = true;
      // Find the selected state name
      const selectedState = this.stateData.find(
        (state) => state.ID === this.saveData.STATE_ID
      )?.NAME;

      const selectedCity = this.cityData.find(
        (city) => city.ID === this.saveData.CITY_ID
      )?.NAME;

      console.log("selectedCity", selectedCity);

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
      console.log("this.saveData.PINCODE_ID", this.saveData.PINCODE_ID);
      console.log("STATE_ID", this.saveData.STATE_ID);

      selectedPincodes.forEach((pincode) => {
        const entry = {
          STATE_NAME: selectedState,
          STATE_ID: this.saveData.STATE_ID,
          CITY_NAME: selectedCity,
          CITY_ID: this.saveData.CITY_ID,
          // PINCODE_ID:this.saveData.PINCODE_ID,
          ...pincode,
          IS_ACTIVE: true, // Default status
        };

        // Prevent duplicate entries
        const exists = this.PincodeMappingdata.some(
          (item) =>
            item.STATE_ID === entry.STATE_ID &&
            item.CITY_ID === entry.CITY_ID &&
            item.PINCODE_ID === entry.PINCODE_ID
        );

        if (!exists) {
          this.PincodeMappingdata.push(entry);
        }
        console.log("entry", entry);
        this.PincodeMappingdata = [...[], ...this.PincodeMappingdata];
      });

      // Reset the inputs

      this.resetDrawer(teritorymaster);
      // Notify success
      this.message.success("Pincode's added successfully.", "");
      this.issaveSpinning = false;
      this.pincodeData = [];
    }
  }

// select all pincode toggle button
  isSelectAll: boolean = false;
  toggleSelectAll(isSelectAll: boolean): void {
    if (isSelectAll) {
      // Select all available pincodes
      this.saveData.PINCODE_ID = this.pincodeData.map((pincode) => pincode.ID);
    } else {
      // Deselect all pincodes
      this.saveData.PINCODE_ID = [];
    }
  }

  // filter
  apply() {
    this.filterQuery = "";
    console.log("state,city", this.state, ",", this.city);
    if (this.state && this.state!= null && this.state!=undefined &&
        this.state.length!=0){
      this.filterQuery += " AND STATE_ID IN (" + this.state + ")";
    }
    if (this.city && this.city!= null && this.city!=undefined &&
      this.city.length!=0) {
      this.filterQuery += " AND CITY_ID IN (" + this.city + ")";
    }
    if (this.filterQuery) {
      this.PincodeMapping();
    }
  }

  clear(filter) {
    this.city = [];
    this.state = [];
    this.filterQuery = "";
    this.PincodeMapping();
  }



  mapSelected() {
    this.isSpinning = true;

    // Proceed with saving data if all entries are valid
    const dataToSave = this.PincodeMappingdata.map((data) => ({
      PINCODE_ID: data.PINCODE_ID,
      IS_ACTIVE: data.IS_ACTIVE,
    }));
    console.log("this.PincodeMappingdata", this.PincodeMappingdata);

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

  unmapSelected() {}



  toggleAll(selectAll: boolean): void {
    this.allSelected = selectAll;
    this.tableIndeterminate = false;
  
    // Select or deselect all items
    this.PincodeMappingdata.forEach((item) => {
      item.selected = selectAll;
    });
  
    // Update selected pincodes
    this.selectedPincode = selectAll
      ? this.PincodeMappingdata.map((item) => item.ID)
      : [];
  }
  
  onPincodeSelecttable(data: any, selected: boolean): void {
    data.selected = selected;
  
    // Update selected pincodes
    this.selectedPincode = this.PincodeMappingdata
      .filter((item) => item.selected)
      .map((item) => item.ID);
  
    // Update Select All and Indeterminate states
    const totalSelected = this.selectedPincode.length;
    const totalPincodes = this.PincodeMappingdata.length;
  
    this.allSelected = totalSelected === totalPincodes && totalPincodes > 0;
    this.tableIndeterminate =
      totalSelected > 0 && totalSelected < totalPincodes;
  }
}
