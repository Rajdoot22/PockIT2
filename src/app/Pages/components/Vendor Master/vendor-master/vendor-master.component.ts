import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { VendorMasterData } from "src/app/Pages/Models/vendorMaterData";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService";
// import { VendorMasterData } from "../../Models/vendorMaterData";

@Component({
  selector: "app-vendor-master",
  templateUrl: "./vendor-master.component.html",
  styleUrls: ["./vendor-master.component.css"],
})
export class VendorMasterComponent {
  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}
  formTitle = "Manage Vendors";
  searchText: string = "";
  pageIndex = 1;
  pageSize = 10;
  sortKey: string = "NAME";
  sortValue: string = "desc";
  loadingRecords = false;
  totalRecords = 1;
  Vendor: any[] = [];
  columns: string[][] = [
    ["NAME", "NAME"],
    ["COUNTRY_NAME", "COUNTRY_NAME"],
    ["STATE_NAME", "STATE_NAME"],
    ["CITY_NAME", "CITY_NAME"],
  ];
  public commonFunction = new CommonFunctionService();
  drawerVendorMappingVisible = false;
  drawerTitle = "Add New Vendor";
  drawerData: any;
  drawervisible = false;
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length == 0) {
      this.search();
    }
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

    var likeQuery = "";
    let globalSearchQuery = "";
    // if (this.searchText != "") {
    //   likeQuery = " AND";
    //   this.columns.forEach((column) => {
    //     likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
    //   });
    //   likeQuery = likeQuery.substring(0, likeQuery.length - 2);
    // }
    // this.loadingRecords = true;
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
    // Country Filter
    if (this.Businesstext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `BUSINESS_NAME LIKE '%${this.Businesstext.trim()}%'`;
    }
    //Short Code
    if (this.Contacttext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") + `NAME LIKE '%${this.Contacttext.trim()}%'`;
    }
    if (this.Emailtext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `EMAIL_ID LIKE '%${this.Emailtext.trim()}%'`;
    }
    if (this.Mobiletext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `MOBILE_NUMBER LIKE '%${this.Mobiletext.trim()}%'`;
    }
    if (this.GSTtext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") + `GST_NO LIKE '%${this.GSTtext.trim()}%'`;
    }
    if (this.PANtext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") + `PAN LIKE '%${this.PANtext.trim()}%'`;
    }
    if (this.Addresstext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `ADDRESS1 LIKE '%${this.Addresstext.trim()}%'`;
    }

    // Status Filter
    if (this.statusFilter) {
      if (likeQuery !== "") {
        likeQuery += " AND ";
      }
      likeQuery += `IS_ACTIVE = ${this.statusFilter}`;
    }
    this.loadingRecords = true;
    // Combine global search query and column-specific search query
    likeQuery = globalSearchQuery + (likeQuery ? " AND " + likeQuery : "");

    this.api
      .getVendorData(
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
            this.Vendor = data["data"];
          } else {
            this.loadingRecords = false;
            this.Vendor = [];
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
  drawerVendorMappingClose(): void {
    this.drawerVendorMappingVisible = false;
  }

  get closeChapterMappingCallback() {
    return this.drawerVendorMappingClose.bind(this);
  }
  edit(data): void {
    this.drawerTitle = "Update Vendor";
    this.drawerData = Object.assign({}, data);
    this.drawervisible = true;
    console.log(this.drawerData);
  }
  add(): void {
    this.drawerTitle = "Create New Vendor";
    this.drawerData = new VendorMasterData();
    this.drawervisible = true;

    this.api.getVendorData(1, 1, "", "desc", "").subscribe(
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
  //For Input
  Businesstext: string = "";
  Businessvisible = false;
  Contacttext: string = "";
  ContactPersonvisible = false;
  Emailtext: string = "";
  Emailvisible = false;
  Mobiletext: string = "";
  MobileVisible = false;
  PANtext: string = "";
  PANVisible = false;
  GSTtext: string = "";
  GSTVisible = false;
  Addresstext: string = "";
  AddressVisible = false;

  reset(): void {
    this.searchText = "";
    this.Businesstext = "";
    this.Contacttext = "";
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

  showcloumnVisible: boolean = false;
  showcolumn = [
    { label: "Business Name", key: "BUSINESS_NAME", visible: true },
    { label: "Contact Person Name", key: "NAME", visible: true },
    { label: "Email", key: "EMAIL_ID", visible: true },
    { label: "Mobile No.", key: "MOBILE_NUMBER", visible: true },
    { label: "PAN", key: "PAN", visible: true },
    { label: "GST No.", key: "GST_NO", visible: true },
    { label: "Status", key: "IS_ACTIVE", visible: true },
  ];
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
    { label: "Business Name", value: "BUSINESS_NAME" },
    { label: "Contact Person Name", value: "NAME" },
    { label: "Email Id", value: "EMAIL_ID" },
    { label: "Mobile No.", value: "MOBILE_NUMBER" },
    { label: "GST No.", value: "GST_NO" },
    { label: "PAN No.", value: "PAN" },
  ];
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
        .getVendorData(
          this.pageIndex,
          this.pageSize,
          this.sortKey,
          sort,
          newQuery
          // filterQuery
        )
        .subscribe(
          (data) => {
            if (data["code"] === 200) {
              this.totalRecords = data["count"];
              this.Vendor = data["data"];
              this.isSpinner = false;
              this.filterQuery = "";
            } else {
              this.Vendor = [];
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
        .getVendorData(
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
              this.Vendor = data["data"];
              this.isSpinner = false;
              this.filterQuery = "";
            } else {
              this.Vendor = [];
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
}
