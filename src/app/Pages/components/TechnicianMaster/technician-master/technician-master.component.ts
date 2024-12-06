import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { TechnicianMasterData } from "src/app/Pages/Models/TechnicianMasterData";
import { ApiServiceService } from "src/app/Service/api-service.service";

@Component({
  selector: "app-technician-master",
  templateUrl: "./technician-master.component.html",
  styleUrls: ["./technician-master.component.css"],
})
export class TechnicianMasterComponent {
  selecteReportingPerson: number[] = [];
  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}

  formTitle = "Manage Technicians";
  searchText: string = "";
  pageIndex = 1;
  pageSize = 10;
  sortKey: string = "NAME";
  sortValue: string = "desc";
  loadingRecords = false;
  totalRecords = 1;
  Technician: any[] = [];
  columns: string[][] = [
    ["NAME", "NAME"],
    ["AADHAR_NUMBER", "AADHAR_NUMBER"],
    ["EMAIL_ID", "EMAIL_ID"],
    ["VEHICLE_NO", "VEHICLE_NO"],
    ["VENDOR_NAME", "VENDOR_NAME"],
    ["ADDRESS_LINE1", "ADDRESS_LINE1"],
    ["CITY_NAME", "CITY_NAME"],
    ["COUNTRY_NAME", "COUNTRY_NAME"],
    ["NAME", "NAME"],
    ["STATE_NAME", "STATE_NAME"],
    ["NAME", "NAME"],
    ["PINCODE", "PINCODE"],
  ];
  drawerTechnicianMappingVisible = false;
  drawerTitle = "Add New Technician";
  drawerData: TechnicianMasterData = new TechnicianMasterData();
  drawervisible = false;
  ReportingPersonVisible: boolean = false;
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length == 0) {
      this.search();
    }
  }
  onStateChange(): void {
    this.search();
  }
  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
      this.sortKey = "id";
      this.sortValue = "desc";
    }

    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    } catch (error) {
      sort = "";
    }

    let likeQuery = "";
    let globalSearchQuery = "";
    // if (this.searchText != "") {
    //   likeQuery = " AND";
    //   this.columns.forEach((column) => {
    //     likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
    //   });
    //   likeQuery = likeQuery.substring(0, likeQuery.length - 2);
    // }
    if (this.searchText !== "") {
      globalSearchQuery =
        " AND (" +
        this.columns
          .map((column) => {
            return `${column[0]} like '%${this.searchText}%'`;
          })
          .join(" OR ") +
        ")";
    }
    this.loadingRecords = true;

    if (this.selecteReportingPerson.length > 0) {
      if (likeQuery !== "") {
        likeQuery += " AND ";
      }
      likeQuery += `STATE_ID IN (${this.selecteReportingPerson.join(",")})`; // Update with actual field name in the DB
    }
    if (this.statusFilter) {
      if (likeQuery !== "") {
        likeQuery += " AND ";
      }
      likeQuery += `IS_ACTIVE = ${this.statusFilter}`;
    }
    likeQuery = globalSearchQuery + (likeQuery ? " AND " + likeQuery : "");
    this.api
      .getTechnicianData(
        this.pageIndex,
        this.pageSize,
        this.sortKey,
        sort,
        likeQuery
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.loadingRecords = false;
            this.totalRecords = data["count"];
            this.Technician = data["data"];
          } else {
            this.loadingRecords = false;
            this.Technician = [];
            this.message.error("Something Went Wrong ...", "");
          }
        },
        (err: HttpErrorResponse) => {
          this.loadingRecords = false;
          if (err.status === 0) {
            this.message.error(
              "Unable to connect. Please check your internet or server connection and try again shortly.",
              ""
            );
          } else {
            this.message.error("Something Went Wrong.", "");
          }
        }
      );
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
    this.search();
  }

  drawerClose(): void {
    this.search();
    this.drawervisible = false;
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  close() {
    this.drawervisible = false;
  }
  drawerChapterMappingClose(): void {
    this.drawerTechnicianMappingVisible = false;
  }

  get closeChapterMappingCallback() {
    return this.drawerChapterMappingClose.bind(this);
  }
  edit(data: TechnicianMasterData): void {
    this.drawerTitle = "Update Technician";
    this.drawerData = Object.assign({}, data);
    this.drawervisible = true;
  }
  add(): void {
    this.drawerTitle = "Create New Technician";
    this.drawerData = new TechnicianMasterData();
    this.drawervisible = true;
    this.api.getTechnicianData(1, 1, "", "desc", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
        } else {
          this.message.error("Server Not Found.", "");
        }
      },
      (err: HttpErrorResponse) => {
        this.loadingRecords = false;
        if (err.status === 0) {
          // Network error
          this.message.error(
            "Unable to connect. Please check your internet or server connection and try again shortly.",
            ""
          );
          // this.dataList = [];
        } else {
          // Other errors
          this.message.error("Something Went Wrong.", "");
        }
      }
    );
  }
  ExperienceData = [
    //   { Id: "F", Name: "Fresher" },
    //   { Id: "J", Name: "Junior" },
    //   { Id: "M", Name: "Mid-Level" },
    //   { Id: "S", Name: "Senior" },
    //   { Id: "L", Name: "Lead" },
    //   { Id: "E", Name: "Expert" },
  ];

  VehicleData = [
    //   { ID: "T", NAME: "Two-Wheeler" },
    //   { ID: "F", NAME: "Four-Wheeler" },
  ];
  Techniciantext: string = "";
  TechnicianVisible = false;
  Emailtext: string = "";
  EmailVisible = false;
  Mobiletext: string = "";
  MobileVisible = false;
  PANtext: string = "";
  PANVisible = false;
  GSTtext: string = "";
  GSTVisible = false;
  Addresstext: string = "";
  AddressVisible = false;
  AadharVisible = false;
  Aadhaartext: any = "";
  VehicleNoVisible = false;
  Vehicletext: any = "";
  DetailsVisible = false;
  Detailstext: any = "";
  CityVisible = false;
  Citytext: any = "";
  StateVisible = false;
  Statetext: any = "";
  PincodeVisible = false;
  Pincodetext: any = "";
  ExperienceVisible = false;
  CountryVisible = false;
  showcloumnVisible: boolean = false;
  VehicleVisible: boolean = false;
  showcolumn = [
    { label: "Type", key: "TYPE", visible: true },
    { label: "Technician Name", key: "NAME", visible: true },
    { label: "Email", key: "EMAIL_ID", visible: true },
    { label: "Mobile No.", key: "MOBILE_NUMBER", visible: true },
    { label: "Gender", key: "GENDER", visible: true },
    { label: "Vendor Name", key: "VENDOR_NAME", visible: true },
    { label: "Aadhaar No.", key: "AADHAR_NUMBER", visible: true },
    { label: "Experience Level", key: "EXPERIENCE_LEVEL", visible: true },
    { label: "Address", key: "ADDRESS_LINE1", visible: true },
    { label: "City", key: "CITY_NAME", visible: true },
    { label: "Country", key: "COUNTRY_NAME", visible: true },
    { label: "State", key: "STATE_NAME", visible: true },
    { label: "Pincode", key: "PINCODE", visible: true },
    {
      label: "Is She Having Own Vehicle?",
      key: "IS_OWN_VEHICLE",
      visible: false,
    },
    { label: "Vehicle Type", key: "VEHICLE_TYPE", visible: true },
    { label: "Vehicle No.", key: "VEHICLE_NO", visible: true },
    { label: "Status", key: "IS_ACTIVE", visible: true },
  ];
  reset(): void {
    this.searchText = "";
    this.Techniciantext = "";

    this.Emailtext = "";
    this.Mobiletext = "";
    this.search();
  }
  //status Filter
  statusFilter: string | undefined = undefined;
  onStatusFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.search(true);
  }
  listOfFilter: any[] = [
    { text: "Active", value: "1" },
    { text: "Inactive", value: "0" },
  ];
  typeFilter: string | undefined = undefined;
  listOfFilter1: any[] = [
    { text: "On Payroll", value: "0" },
    { text: "Vendor Manaed", value: "1" },
    { text: "Freelancer", value: "2" },
  ];

  listOfFilter3: any[] = [
    { text: "Yes", value: "1" },
    { text: "NO", value: "0" },
  ];
  typeV: string | undefined = undefined;
  onvFilterChange(selectedStatus: string) {
    this.typeV = selectedStatus;
    this.search(true);
  }

  ontypeFilterChange(selectedStatus: string) {
    this.typeFilter = selectedStatus;
    this.search(true);
  }
  genderFilter: string | undefined = undefined;
  listOfFilter2: any[] = [
    { text: "Male", value: "M" },
    { text: "Female", value: "F" },
  ];
  onGenderFilterChange1(selectedStatus: string) {
    this.typeFilter = selectedStatus;
    this.search(true);
  }

  // Check if the column is visible
  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find((col) => col.key === key);
    return column ? column.visible : true;
  }

  dataList: any = [];
  visible = false;
  filterQuery: string = "";
  // Main filter
  isfilterapply: boolean = false;
  filterClass: string = "filter-invisible";
  columns1: { label: string; value: string }[] = [
    { label: "Technician Name", value: "NAME" },
    { label: "Email", value: "EMAIL_ID" },
    { label: "Mobile No.", value: "MOBILE_NUMBER" },
    { label: "Aadhaar No.", value: "AADHAR_NUMBER" },
    { label: "Vehicle No.", value: "VEHICLE_NO" },
    { label: "Having own vehicle?", value: "IS_OWN_VEHICLE" },
    { label: "Country Name", value: "COUNTRY_ID" },
    { label: "State Name", value: "STATE_ID" },
    { label: "City Name", value: "CITY_ID" },
    { label: "Pincode", value: "PINCODE_ID" },
    { label: "Gender", value: "GENDER" },
    { label: "Status", value: "IS_ACTIVE" },
  ];

  ngOnInit(): void {
    this.loadingRecords = false;
    this.getCountyData();
    this.CityData();
    this.PincodeData();
    this.StateData();
  }

  countryData: any = [];
  getCountyData() {
    this.api.getAllCountryMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.countryData = data["data"];
        } else {
          this.countryData = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  StateData: any = [];
  getStateData() {
    this.api.getAllStateMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.StateData = data["data"];
        } else {
          this.StateData = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  CityData: any = [];
  getCityData() {
    this.api.getAllCityMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.CityData = data["data"];
        } else {
          this.CityData = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  PincodeData: any = [];
  getPincodeData() {
    this.api.getAllPincodeMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.PincodeData = data["data"];
        } else {
          this.PincodeData = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  // Main Filter
  showMainFilter() {
    if (this.filterClass === "filter-visible") {
      this.filterClass = "filter-invisible";
    } else {
      this.filterClass = "filter-visible";
    }
  }

  // Main Filter code
  hide: boolean = true;
  filterQuery1: any = "";
  INSERT_NAME: any;
  comparisonOptions: string[] = [
    "=",
    "!=",
    "<",
    ">",
    "<=",
    ">=",
    "Contains",
    "Does not Contain",
    "Start With",
    "End With",
  ];

  columns2: string[][] = [["AND"], ["OR"]];

  showFilter = false;
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  showSortFilter = false;
  toggleSortFilter() {
    this.showSortFilter = !this.showSortFilter;
  }

  SELECTCOLOUM_NAME: any;
  TABLE_VALUE: any;
  COMPARISION_VALUE: any;

  conditions: any[] = [];

  InsertNewCondition() {
    this.conditions.push({
      SELECTCOLOUM_NAME: "",
      COMPARISION_VALUE: "",
      TABLE_VALUE: "",
    });
  }

  deleteCondition(index: number) {
    this.conditions.splice(index, 1);
  }

  operators: string[] = ["AND", "OR"];
  // QUERY_NAME: string = '';
  showQueriesArray = [];

  filterBox = [
    {
      CONDITION: "",
      FILTER: [
        {
          CONDITION: "",
          SELECTION1: "",
          SELECTION2: "",
          SELECTION3: "",
        },
      ],
    },
  ];

  addCondition() {
    this.filterBox.push({
      CONDITION: "",
      FILTER: [
        {
          CONDITION: "",
          SELECTION1: "",
          SELECTION2: "",
          SELECTION3: "",
        },
      ],
    });
  }

  removeCondition(index: number) {
    this.filterBox.splice(index, 1);
  }

  insertSubCondition(conditionIndex: number, subConditionIndex: number) {
    const lastFilterIndex = this.filterBox.length - 1;
    const lastSubFilterIndex =
      this.filterBox[lastFilterIndex]["FILTER"].length - 1;

    const selection1 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION1"
      ];
    const selection2 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION2"
      ];
    const selection3 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION3"
      ];

    if (!selection1) {
      this.message.error("Please select a column", "");
    } else if (!selection2) {
      this.message.error("Please select a comparison", "");
    } else if (!selection3 || selection3.length < 1) {
      this.message.error(
        "Please enter a valid value with at least 1 characters",
        ""
      );
    } else {
      console.log(conditionIndex, subConditionIndex);
      this.hide = false;
      this.filterBox[conditionIndex].FILTER.splice(subConditionIndex + 1, 0, {
        CONDITION: "",
        SELECTION1: "",
        SELECTION2: "",
        SELECTION3: "",
      });
    }
  }

  removeSubCondition(conditionIndex: number, subConditionIndex: number) {
    this.hide = true;
    this.filterBox[conditionIndex].FILTER.splice(subConditionIndex, 1);
  }

  getComparisonOptions(selectedColumn: string): string[] {
    if (
      selectedColumn === "COUNTRY_ID" ||
      selectedColumn === "STATE_ID" ||
      selectedColumn === "IS_ACTIVE" ||
      selectedColumn === "CITY_ID" ||
      selectedColumn === "PINCODE_ID"
    ) {
      return ["=", "!="];
    }
    return [
      "=",
      "!=",
      "<",
      ">",
      "<=",
      ">=",
      "Contains",
      "Does not Contain",
      "Start With",
      "End With",
    ];
  }

  generateQuery() {
    var isOk = true;
    var i = this.filterBox.length - 1;
    var j = this.filterBox[i]["FILTER"].length - 1;
    if (
      this.filterBox[i]["FILTER"][j]["SELECTION1"] == undefined ||
      this.filterBox[i]["FILTER"][j]["SELECTION1"] == "" ||
      this.filterBox[i]["FILTER"][j]["SELECTION2"] == undefined ||
      this.filterBox[i]["FILTER"][j]["SELECTION2"] == "" ||
      this.filterBox[i]["FILTER"][j]["SELECTION3"] == undefined ||
      this.filterBox[i]["FILTER"][j]["SELECTION3"] == "" ||
      this.filterBox[i]["FILTER"][j]["CONDITION"] == undefined ||
      this.filterBox[i]["FILTER"][j]["CONDITION"] == null
    ) {
      isOk = false;
      this.message.error("Please check some fields are empty", "");
    } else if (
      i != 0 &&
      (this.filterBox[i]["CONDITION"] == undefined ||
        this.filterBox[i]["CONDITION"] == null ||
        this.filterBox[i]["CONDITION"] == "")
    ) {
      isOk = false;
      this.message.error("Please select operator.", "");
    }
    console.log(this.filterBox, "filterBox1");

    if (isOk) {
      this.filterBox.push({
        CONDITION: "",
        FILTER: [
          {
            CONDITION: "",
            SELECTION1: "",
            SELECTION2: "",
            SELECTION3: "",
          },
        ],
      });
      console.log(this.filterBox, "filterBox2");
    }
  }

  /*******  Create filter query***********/
  query = "";
  query2 = "";
  showquery: any;
  isSpinner: boolean = false;
  createFilterQuery(): void {
    console.log(this.filterBox, "filterdat");

    const lastFilterIndex = this.filterBox.length - 1;
    1;
    const lastSubFilterIndex =
      this.filterBox[lastFilterIndex]["FILTER"].length - 1;

    const selection1 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION1"
      ];
    const selection2 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION2"
      ];
    const selection3 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION3"
      ];
    const selection4 = this.filterBox[lastFilterIndex]["CONDITION"];
    console.log(selection4, "selection4");

    if (!selection1) {
      this.message.error("Please select a column", "");
    } else if (!selection2) {
      this.message.error("Please select a comparison", "");
    } else if (!selection3 || selection3.length < 1) {
      this.message.error(
        "Please enter a valid value with at least 1 characters",
        ""
      );
    } else if (!selection4 && lastFilterIndex > 0) {
      this.message.error("Please Select the Operator", "");
    } else {
      console.log(this.filterBox);

      this.isSpinner = true;

      for (let i = 0; i < this.filterBox.length; i++) {
        if (i != 0) {
          this.query += ") " + this.filterBox[i]["CONDITION"] + " (";
        } else this.query = "(";

        this.query2 = "";
        for (let j = 0; j < this.filterBox[i]["FILTER"].length; j++) {
          const filter = this.filterBox[i]["FILTER"][j];
          if (j == 0) {
            //this.query2 += '(';
          } else {
            if (filter["CONDITION"] == "AND") {
              this.query2 = this.query2 + " AND ";
            } else {
              this.query2 = this.query2 + " OR ";
            }
          }

          let selection1 = filter["SELECTION1"];
          let selection2 = filter["SELECTION2"];
          let selection3 = filter["SELECTION3"];

          if (selection2 == "Contains") {
            this.query2 += `${selection1} LIKE '%${selection3}%'`;
          } else if (selection2 == "End With") {
            this.query2 += `${selection1} LIKE '%${selection3}'`;
          } else if (selection2 == "Start With") {
            this.query2 += `${selection1} LIKE '${selection3}%'`;
          } else {
            this.query2 += `${selection1} ${selection2} '${selection3}'`;
          }
          if (j + 1 == this.filterBox[i]["FILTER"].length) {
            //this.query2 += ') ';
            this.query += this.query2;
          }
        }

        if (i + 1 == this.filterBox.length) {
          this.query += ")";
          console.log(this.query, "backend query");
        }
      }

      this.showquery = this.query;
      console.log(this.showquery, "showquery");

      var newQuery = " AND " + this.query;
      console.log(newQuery);

      this.filterQuery1 = newQuery;

      console.log(this.filterQuery1, "this.filterQuerythis.filterQuery");

      let sort = ""; // Assign a default value to sort
      let filterQuery = "";
      this.api
        .getTechnicianData(
          this.pageIndex,
          this.pageSize,
          this.sortKey,
          sort,
          newQuery
        )
        .subscribe(
          (data) => {
            if (data["code"] === 200) {
              this.totalRecords = data["count"];
              this.Technician = data["data"];
              this.isSpinner = false;
              this.filterQuery = "";
            } else {
              this.Technician = [];
              this.isSpinner = false;
            }
          },
          (err) => {
            if (err["ok"] === false) this.message.error("Server Not Found", "");
          }
        );

      this.QUERY_NAME = "";
    }
  }

  applyFilter(i, j) {
    console.log(i, j);

    const lastFilterIndex = this.filterBox.length - 1;
    const lastSubFilterIndex =
      this.filterBox[lastFilterIndex]["FILTER"].length - 1;

    const selection1 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION1"
      ];
    const selection2 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION2"
      ];
    const selection3 =
      this.filterBox[lastFilterIndex]["FILTER"][lastSubFilterIndex][
        "SELECTION3"
      ];

    if (!selection1) {
      this.message.error("Please select a column", "");
    } else if (!selection2) {
      this.message.error("Please select a comparison", "");
    } else if (!selection3 || selection3.length < 1) {
      this.message.error(
        "Please enter a valid value with at least 1 characters",
        ""
      );
    } else {
      console.log(this.query, "query");
      console.log(this.filterBox, "filterbox");

      // var DemoData:any = this.filterBox
      let sort: string;
      let filterQuery = "";

      try {
        sort = this.sortValue.startsWith("a") ? "asc" : "desc";
      } catch (error) {
        sort = "";
      }
      // Define a function to get the comparison value filter

      this.isSpinner = true;
      const getComparisonFilter = (
        comparisonValue: any,
        columnName: any,
        tableValue: any
      ) => {
        switch (comparisonValue) {
          case "=":
          case "!=":
          case "<":
          case ">":
          case "<=":
          case ">=":
            return `${tableValue} ${comparisonValue} '${columnName}'`;
          case "Contains":
            return `${tableValue} LIKE '%${columnName}%'`;
          case "Does not Contain":
            return `${tableValue} NOT LIKE '%${columnName}%'`;
          case "Start With":
            return `${tableValue} LIKE '${columnName}%'`;
          case "End With":
            return `${tableValue} LIKE '%${columnName}'`;
          default:
            return "";
        }
      };

      const FILDATA = this.filterBox[i]["FILTER"]
        .map((item) => {
          const filterCondition = getComparisonFilter(
            item.SELECTION2,
            item.SELECTION3,
            item.SELECTION1
          );
          return `AND (${filterCondition})`;
        })
        .join(" ");

      console.log(FILDATA, "FILDATA");

      console.log(filterQuery, "filterQueryfilterQuery");

      this.api
        .getTechnicianData(
          this.pageIndex,
          this.pageSize,
          this.sortKey,
          sort,
          FILDATA
        )
        .subscribe(
          (data) => {
            if (data["code"] === 200) {
              this.totalRecords = data["count"];
              this.Technician = data["data"];
              this.isSpinner = false;
              this.filterQuery = "";
            } else {
              this.Technician = [];
              this.isSpinner = false;
            }
          },
          (err) => {
            if (err["ok"] === false) this.message.error("Server Not Found", "");
          }
        );
    }
  }

  resetValues(): void {
    this.filterBox = [
      {
        CONDITION: "",
        FILTER: [
          {
            CONDITION: "",
            SELECTION1: "",
            SELECTION2: "",
            SELECTION3: "",
          },
        ],
      },
    ];
    this.search();
  }

  public visiblesave = false;

  saveQuery() {
    this.visiblesave = !this.visiblesave;
  }

  QUERY_NAME: string = "";
  name1: any;
  name2: any;
  INSERT_NAMES: any[] = [];

  Insertname() {
    if (this.QUERY_NAME.trim()) {
      this.INSERT_NAMES.push({ query: this.showquery, name: this.QUERY_NAME });

      console.log(this.INSERT_NAMES);
      this.visiblesave = false;
      this.QUERY_NAME = ""; // Clear input after adding
    } else {
      console.log("Name is empty");
    }
  }

  toggleLiveDemo(item: any, item1: any) {
    this.name1 = item;
    console.log(item, "items");

    this.name2 = item1;
    console.log(item1, "name");

    this.visible = !this.visible;
  }

  deleteItem(item: any) {
    this.INSERT_NAMES = this.INSERT_NAMES.filter((i) => i !== item);
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  toggleLiveDemo1() {
    this.visible = false;
  }
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ReportingVisible = false;
  selectedServices: number[] = [];
  onServiceChange(): void {
    this.search();
  }
  venderdata: any[] = [];
}
