import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { ApiServiceService } from "src/app/Service/api-service.service";

export class Data {
  COUNTRY_ID: any;
  COUNTRY_NAME: any;
  TERITORY_ID: any;
  TERITORY_NAME: any;
  IS_ACTIVE: boolean = true;
}

@Component({
  selector: "app-territory-mapping",
  templateUrl: "./territory-mapping.component.html",
  styleUrls: ["./territory-mapping.component.css"],
})
export class TerritoryMappingComponent {
  COUNTRY_ID;
  isSpinning;

  countryData: any;
  territoryData: any;

  pageIndex = 1;
  pageSize = 10;
  sortValue: string = "desc";
  sortKey: string = "COUNTRY_NAME";

  // Loading
  isLoading = true;
  countryloading = false;
  territoryloading = false;
  btnLoading = false;
  loadingRecords = false;

  dataList: any = [];
  addData: any = new Data();
  mappedTerritoryIds: number[] = [];

  ngOnInit(): void {
    this.getCountryData();
    // this.getMappedData();
  }

  @Input() data;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private modal: NzModalService
  ) {}

  // Coutry
  getCountryData() {
    this.countryloading = true;
    this.api.getCountryData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.countryData = data["data"];
          this.countryloading = false;
        } else {
          this.countryData = [];
          this.countryloading = false;
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.countryloading = false;
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  getMappedData() {
    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    } catch (error) {
      sort = "";
    }

    this.api
      .getBackofcTerritoryMappedData(
        0,
        0,
        this.sortKey,
        sort,
        "AND BACKOFFICE_ID =" + this.data.ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.dataList = data["data"];

            console.log("this.mappedTerritoryIds", this.mappedTerritoryIds);

            this.loadingRecords = false;
          } else {
            this.dataList = [];
            this.mappedTerritoryIds = [];
            this.loadingRecords = false;
            this.message.error("Failed To Get Mapping Data", "");
          }
        },
        () => {
          this.loadingRecords = false;
          this.message.error("Something Went Wrong", "");
        }
      );
  }

  // Fetch Territory based on country ID
  getTeritoryByCountry(countryId: any) {
    if (!countryId) {
      this.territoryData = []; // Reset pincode data if no state is selected
      return;
    }
    this.territoryloading = true;
    this.api
      .getTeritory(0, 0, "", "", " AND COUNTRY_ID=" + countryId)
      .subscribe(
        (data) => {
          if (data["code"] === 200) {
            const fetchedteritory = data["data"];
            this.mappedTerritoryIds = this.dataList.map(
              (item) => item.TERITORY_ID
            );

            this.territoryData = fetchedteritory.filter(
              (teritory) => !this.mappedTerritoryIds.includes(teritory.ID)
            );
            this.territoryloading = false;
          } else {
            this.territoryData = [];
            this.territoryloading = false;
            this.message.error("Failed To Get Territory Data...", "");
          }
        },
        () => {
          this.territoryloading = false;
          this.message.error("Something Went Wrong...", "");
        }
      );
  }

  add(TerritoryMappingForm: any): void {
    if (
      (this.addData.COUNTRY_ID == 0 ||
        this.addData.COUNTRY_ID == undefined ||
        this.addData.COUNTRY_ID == null) &&
      (this.addData.TERITORY_ID == 0 ||
        this.addData.TERITORY_ID == undefined ||
        this.addData.TERITORY_ID == null)
    ) {
      this.message.error("Please select Country and Territory.", "");
      return;
    } else if (
      this.addData.COUNTRY_ID == 0 ||
      this.addData.COUNTRY_ID == undefined ||
      this.addData.COUNTRY_ID == null
    ) {
      this.message.error("Please select Country.", "");
      return;
    } else if (
      this.addData.TERITORY_ID == 0 ||
      this.addData.TERITORY_ID == undefined ||
      this.addData.TERITORY_ID == null
    ) {
      this.message.error("Please select Territory.", "");
      return;
    } else {
      this.btnLoading = true;
      // Find the selected territory name
      // const selectedTerritory = this.territoryData.find(
      //   (territory) => territory.ID !== this.addData.TERITORY_ID
      // )?.NAME;

      // Map the selected territory to their names and IDs
      const selectedTerritory = this.addData.TERITORY_ID.map((territoryId) => {
        const territory = this.territoryData.find(
          (ter) => ter.ID === territoryId
        );
        return {
          TERITORY_NAME: territory?.NAME,
          TERITORY_ID: territoryId,
        };
      });

      console.log("selectedTerritory", selectedTerritory);

      // console.log('territoryData',this.territoryData);
      // console.log('selectedTerritory',selectedTerritory);
      // console.log('TERITORY_ID',this.addData.TERITORY_ID);

      const selectedCountry = this.countryData.find(
        (data) => data.ID === this.addData.COUNTRY_ID
      )?.NAME;

      // Add entries for each selected Territory to the table
      console.log("selectedTerritory", selectedTerritory);

      // Create the entry
      // const entry = {
      //   COUNTRY_ID: this.addData.COUNTRY_ID,
      //   COUNTRY_NAME: selectedCountry,
      //   TERITORY_ID: this.addData.TERITORY_ID,
      //   TERITORY_NAME: selectedTerritory,
      //   IS_ACTIVE: true,
      // };

      // Prevent duplicate entries
      // const exists = this.dataList.some(
      //   (item) =>
      //     item.TERITORY_ID === entry.TERITORY_ID &&
      //     item.COUNTRY_ID === entry.COUNTRY_ID
      // );

      // if (!exists) {
      //   this.dataList.push(entry);
      // }

      // Update data list reference
      // this.dataList = [...this.dataList];

      // console.log("this.dataList", this.dataList);

      selectedTerritory.forEach((territory) => {
        const entry = {
          COUNTRY_NAME: selectedCountry,
          COUNTRY_ID: this.addData.COUNTRY_ID,
          ...territory,
          IS_ACTIVE: true, // Default status
        };
        console.log("entry", entry);

        // Prevent duplicate entries
        const exists = this.dataList.some(
          (item) =>
            item.COUNTRY_ID === entry.COUNTRY_ID &&
            item.TERITORY_ID === entry.TERITORY_ID
        );
        console.log("exists", exists);

        if (!exists) {
          this.dataList.push(entry);
        }
        // console.log('entry',entry);
        this.dataList = [...[], ...this.dataList];
      });

      console.log("this.dataList", this.dataList);

      // Reset the inputs
      this.addData.TERITORY_ID = null;
      this.addData.COUNTRY_ID = null;

      // Notify success
      this.message.success("Territory added successfully.", "");
      this.btnLoading = false;
      this.territoryData = [];
      this.reset(TerritoryMappingForm);
    }
  }
  Cancel() {}

  reset(TerritoryMappingForm: any) {
    this.addData.COUNTRY_ID = null;
    this.addData.TERITORY_ID = [];

    TerritoryMappingForm.form.markAsPristine();
    TerritoryMappingForm.form.markAsUntouched();
  }

  // Save Function
  save() {
    this.isSpinning = true;

    // Proceed with saving data if all entries are valid
    console.log("this.dataList", this.dataList);

    const dataToSave = this.dataList.map((data) => ({
      TERITORY_ID: data.TERITORY_ID,
      IS_ACTIVE: data.IS_ACTIVE,
    }));
    console.log("dataToSave", dataToSave);

    // Call the API to save the task mapping data
    this.api
      .mapBackofficeTerritoryMapping(this.data.ID, 1, dataToSave)
      .subscribe(
        (successCode) => {
          if (successCode["code"] === 200) {
            this.message.success(
              "Territory Successfully Mapped to the Back Office.",
              ""
            );
            this.isSpinning = false;
            this.drawerClose();
          } else {
            this.message.error("Failed to Map Task to the Back Office", "");
          }
          this.isSpinning = false;
        },
        () => {
          this.isSpinning = false;
          this.message.error("Something Went Wrong.", "");
        }
      );
  }

  close() {
    this.drawerClose();
  }

  sort(params: NzTableQueryParams) {
    this.loadingRecords = true;
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
    this.getMappedData();
  }
}
