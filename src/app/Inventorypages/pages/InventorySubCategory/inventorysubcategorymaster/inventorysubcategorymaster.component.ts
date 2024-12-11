import { Component } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { CookieService } from "ngx-cookie-service";
import { InventorySubCategory } from "src/app/Inventorypages/inventorymodal/inventorysubCategory";
import { ApiServiceService } from "src/app/Service/api-service.service";

@Component({
  selector: "app-inventorysubcategorymaster",
  templateUrl: "./inventorysubcategorymaster.component.html",
  styleUrls: ["./inventorysubcategorymaster.component.css"],
})
export class InventorysubcategorymasterComponent {
  formTitle = "Manage Inventory Sub Categories";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList: any = [];
  listOfFilter: any[] = [
    { text: "Active", value: "1" },
    { text: "Inactive", value: "0" },
  ];

  itemNameVisible: boolean = false;
  inventorycategoryvisible: boolean = false;
  unitsvisible: boolean = false;
  qtyvisible: boolean = false;
  subcategorynametext = "";
  subcategorynamevisible: boolean = false;
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  columns: string[][] = [
    ["CATEGORY_NAME", "Inventory Category"],
    ["NAME", "Name"],
    ["DESCRIPTION", "Description"],
    ["IS_ACTIVE", "Is Active"],
  ];
  // columns1: string[][] = [["NAME", "Branch Name"], ["COUNTRY_NAME", "Country"], ["STATE_NAME", "State"], ["CITY_NAME", "City"]];
  time = new Date();
  drawerVisible: boolean;
  drawerTitle: string;
  drawerTitle1: string;
  drawerData: InventorySubCategory = new InventorySubCategory();
  isfilterapply: boolean = false;
  filterClass: string = "filter-invisible";
  itemNametext: string = "";
  locationtext: string = "";
  quantitytext: string = "";

  // locationtext : string = ""
  selectedcategories: any = [];
  categoryData: any = [];
  selectedDate: any;
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  columns1: { label: string; value: string }[] = [
    { label: "Inventory Category", value: "INVENTRY_CATEGORY_ID" },
    // { label: "Item", value: "Item" },
    { label: "Sub Category Name", value: "NAME" },
    { label: "Description", value: "DESCRIPTION" },
    { label: "Sequence No", value: "SEQ_NO" },
    { label: "Is Active", value: "IS_ACTIVE" },
  ];

  showcolumn = [
    { label: "Inventory Category", key: "CATEGORY_NAME", visible: true },
    // { label: "Item", key: "ITEM", visible: true },
    { label: "Sub Category Name", key: "NAME", visible: true },
    { label: "Description", key: "DESCRIPTION", visible: true },
    { label: "Sequence No", key: "SEQ_NO", visible: true },
    { label: "Is Active", key: "IS_ACTIVE", visible: true },
  ];

  checkColumnselect(a: any) {
    // console.log(a);
  }
  constructor(
    private api: ApiServiceService,
    private cookie: CookieService,
    private message: NzNotificationService
  ) {}

  ngOnInit() {
    // this.search();
    // this.getUnits()
    this.getInventoryCategory()
  }
  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find((col) => col.key === key);
    return column ? column.visible : true;
  }
  getInventoryCategory(){
    this.api.getInventoryCategory(0,0,'id','desc',' AND IS_ACTIVE=1').subscribe(data=>{
      if(data['code']==200){
        this.categoryData=data['data']
      }
      else{
        this.categoryData=[]
      }
    })
  }

  // onCountryChange() {}
  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || "id";
    const sortOrder = (currentSort && currentSort.value) || "desc";
    // console.log(currentSort);
    // console.log("sortOrder :" + sortOrder);
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

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
      this.sortKey = "id";
      this.sortValue = "desc";
    }
    // temporary false change when api connected
    this.loadingRecords = false;

    let sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    } catch (error) {
      sort = "";
    }

    let likeQuery = "";
    let globalSearchQuery = "";

    // Global Search (using searchText)
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

    // if (this.itemNametext?.trim()) {
    //   likeQuery +=
    //     (likeQuery ? " AND " : "") +
    //     `ITEM_NAME LIKE '%${this.itemNametext.trim()}%'`;
    // }

    if (this.subcategorynametext?.trim()) {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `NAME LIKE '%${this.subcategorynametext.trim()}%'`;
    }

    if (this.selectedcategories?.length) {
      const categories = this.selectedcategories.join(",");
      likeQuery +=
        (likeQuery ? " AND " : "") + `INVENTRY_CATEGORY_ID IN (${categories})`;
    }

    // State Filter

    // Status Filter
    // if (this.statusFilter) {
    //   if (likeQuery !== "") {
    //     likeQuery += " AND ";
    //   }
    //   likeQuery += `IS_ACTIVE = ${this.statusFilter}`;
    // }

    // Combine global search query and column-specific search query
    likeQuery = globalSearchQuery + (likeQuery ? " AND " + likeQuery : "");

    // Call API with updated search query
    this.api
      .getInventorySubCategory(
        this.pageIndex,
        this.pageSize,
        this.sortKey,
        sort,
        likeQuery + ""
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.loadingRecords = false;
            this.totalRecords = data["count"];
            this.dataList = data["data"];
          } else {
            this.dataList = [];
            this.loadingRecords = false;
            this.message.error(
              "Failed to get Inventory Sub category Records",
              ""
            );
          }
        },
        (err) => {
          this.dataList = [];
          this.loadingRecords = false;

          this.message.error(
            "Failed to get Inventory Sub category Records",
            ""
          );
          console.log(err);
        }
      );
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = "Create New Inventory Sub Category";
    this.drawerData = new InventorySubCategory();

    // this.drawerData.IS_ACTIVE = true;

    this.api.getInventorySubCategory(1, 1, "SEQ_NO", "desc", "" + "").subscribe(
      (data) => {
        if (data["count"] == 0) {
          this.drawerData.SEQ_NO = 1;
        } else {
          this.drawerData.SEQ_NO = data["data"][0]["SEQ_NO"] + 1;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.drawerVisible = true;
  }

  // STATE_HAS_LWF = false;
  edit(data: InventorySubCategory): void {
    this.drawerTitle = "Update Inventory Sub Category";
    this.drawerData = Object.assign({}, data);
    // this.STATE_HAS_LWF = false;

    this.drawerVisible = true;
  }
  getComparisonOptions(selectedColumn: string): string[] {
    if (
      selectedColumn === "INVENTRY_CATEGORY_ID" ||
      selectedColumn === "IS_ACTIVE"
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
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length === 0) {
      this.dataList = [];
      this.search();
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
      // console.log(conditionIndex, subConditionIndex);
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
    // console.log(this.filterBox, "filterBox1");

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
      // console.log(this.filterBox, "filterBox2");
    }
  }

  /*******  Create filter query***********/
  query = "";
  query2 = "";
  showquery: any;
  isSpinner: boolean = false;
  createFilterQuery(): void {
    // console.log(this.filterBox, "filterdat");

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
    // console.log(selection4, "selection4");

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
      // console.log(this.filterBox);

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
          // console.log(this.query, "backend query");
        }
      }

      this.showquery = this.query;
      // console.log(this.showquery, "showquery");

      var newQuery = " AND " + this.query;
      // console.log(newQuery);

      this.filterQuery1 = newQuery;

      // console.log(this.filterQuery1, "this.filterQuerythis.filterQuery");

      let sort = ""; // Assign a default value to sort
      let filterQuery = "";
      this.api
        .getInventorySubCategory(
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
              this.dataList = data["data"];
              this.isSpinner = false;
              this.filterQuery = "";
            } else {
              this.dataList = [];
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

  restrictedKeywords = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "TRUNCATE", "ALTER", "CREATE", "RENAME", "GRANT", "REVOKE", "EXECUTE", "UNION", "HAVING", "WHERE", "ORDER BY", "GROUP BY", "ROLLBACK", "COMMIT", "--", ";", "/*", "*/"
  ];

  isValidInput(input: string): boolean {
    return !this.restrictedKeywords.some((keyword) =>
      input.toUpperCase().includes(keyword)
    );
  }
  applyFilter(i: number, j: number) {
    const currentFilter = this.filterBox[i]['FILTER'][j];

    const selection1 = currentFilter.SELECTION1;
    const selection2 = currentFilter.SELECTION2;
    const selection3 = currentFilter.SELECTION3;

    if (!selection1) {
      this.message.error("Please select a column", '');
    } else if (!selection2) {
      this.message.error("Please select a comparison", '');
    } else if (!selection3 || selection3.length < 1) {
      this.message.error("Please enter a valid value with at least 1 character", '');
    } else if (typeof selection3 === 'string' && !this.isValidInput(selection3)) {
      this.message.error(`Invalid Input: ${selection3} is not allowed.`, '');
    } else {
      const sort = this.sortValue?.startsWith('a') ? 'asc' : 'desc';

      const getComparisonFilter = (comparisonValue: any, columnName: any, tableValue: any) => {
        switch (comparisonValue) {
          case '=':
          case '!=':
          case '<':
          case '>':
          case '<=':
          case '>=':
            return `${tableValue} ${comparisonValue} '${columnName}'`;
          case 'Contains':
            return `${tableValue} LIKE '%${columnName}%'`;
          case 'Does not Contain':
            return `${tableValue} NOT LIKE '%${columnName}%'`;
          case 'Start With':
            return `${tableValue} LIKE '${columnName}%'`;
          case 'End With':
            return `${tableValue} LIKE '%${columnName}'`;
          default:
            return '';
        }
      };

      const filterCondition = getComparisonFilter(selection2, selection3, selection1);
      const FILDATA = `AND (${filterCondition})`;

      // console.log(FILDATA, 'Filter Data');

      this.isSpinner = true;

      this.api
        .getInventorySubCategory(this.pageIndex, this.pageSize, this.sortKey, sort, FILDATA)
        .subscribe(
          (data) => {
            if (data['code'] === 200) {
              this.totalRecords = data['count'];
              this.dataList = data['data'];
            } else {
              this.dataList = [];
            }
            this.isSpinner = false;
          },
          (err) => {
            if (err['ok'] === false) {
              this.message.error('Server Not Found', '');
            }
            this.isSpinner = false;
          }
        );
    }
  }

  resetValues(): void {
    this.filterBox = [
      {
        CONDITION: '',
        FILTER: [
          {
            CONDITION: '',
            SELECTION1: '',
            SELECTION2: '',
            SELECTION3: '',
          },
        ],
      },
    ];
    this.search();
  }

  public visiblesave = false;

  saveQuery() {
    // this.createFilterQuery();
    this.visiblesave = !this.visiblesave;
  }

  QUERY_NAME: string = "";
  name1: any;
  name2: any;
  INSERT_NAMES: any[] = [];

  Insertname() {
    if (this.QUERY_NAME.trim()) {
      this.INSERT_NAMES.push({ query: this.showquery, name: this.QUERY_NAME });

      // console.log(this.INSERT_NAMES);
      this.visiblesave = false;
      this.QUERY_NAME = ""; // Clear input after adding
    } else {
      // console.log("Name is empty");
    }
  }
  visible: boolean = false;
  toggleLiveDemo(item: any, item1: any) {
    this.name1 = item;
    // console.log(item, "items");

    this.name2 = item1;
    // console.log(item1, "name");

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
  showMainFilter() {
    if (this.filterClass === "filter-visible") {
      this.filterClass = "filter-invisible";
    } else {
      this.filterClass = "filter-visible";
    }
  }

  statusFilter: string | undefined = undefined;
  showcloumnVisible: boolean = false;
  onStatusFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.search(true);
  }
  reset() {}
}
