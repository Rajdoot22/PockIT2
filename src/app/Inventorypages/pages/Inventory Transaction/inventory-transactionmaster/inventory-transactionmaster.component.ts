import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CookieService } from 'ngx-cookie-service';
import { InventoryTransaction } from 'src/app/Inventorypages/inventorymodal/inventoryTransactions';
import { ApiServiceService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-inventory-transactionmaster',
  templateUrl: './inventory-transactionmaster.component.html',
  styleUrls: ['./inventory-transactionmaster.component.css']
})
export class InventoryTransactionmasterComponent {
  formTitle = "Manage Inventory Transactions";
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
  inventorysubcategoryvisible: boolean = false;
  unitsvisible: boolean = false;
  qtyvisible:boolean =false
  unitcostvisible:boolean =false
  totalcostvisible:boolean =false
  locationvisible:boolean =false
  dateofentryvisible:boolean =false
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  columns: string[][] = [
    ["DATE", "Date"],
    ["TYPE", "Type"],
    ["ITEM", "Item ID"],
    ["QUANTITY", "Quantity"],
    ["UNIT", "Unit ID"],
    ["UNIT_COST", "Unit Cost"],
    ["TOTAL_COST", "Total Cost"],
    ["WAREHOUSE", "Warehouse ID"],
    ["REMARKS", "Remarks"],
    ["STATUS", "Status"],
  ];
  
  // columns1: string[][] = [["NAME", "Branch Name"], ["COUNTRY_NAME", "Country"], ["STATE_NAME", "State"], ["CITY_NAME", "City"]];
  time = new Date();
  drawerVisible: boolean;
  drawerTitle: string;
  drawerTitle1: string;
  drawerData: InventoryTransaction = new InventoryTransaction();
  isfilterapply: boolean = false;
  filterClass: string = "filter-invisible";
  itemNametext: string = "";
  unitNametext: string ="";
  locationtext: string = "";
  quantitytext: string = "";
  unitcosttext : string =""
  totalcosttext : string = ""
  // locationtext : string = ""
  remarkstext: string = ""
  selectedSubcategories:any=[]
  subCategoryData:any=[]
  selectedcategories:any=[]
  categoryData:any=[]
  wareHouseList:any=[]
  selectedUnits:any=[]
  unitLists:any=[]
  selectedWarehouses:any=[]
  warehousesList:any=[]
  selectedDate:any
  selectedItem
  itemlists:any=[]
  columns1: { label: string; value: string }[] = [
    { label: "Date", value: "Date" },
    { label: "Type", value: "Type" },
    { label: "Item", value: "Item" },
    { label: "Quantity", value: "Quantity" },
    { label: "Unit", value: "Unit" },
    { label: "Unit Cost", value: "Unit Cost" },
    { label: "Total Cost", value: "Total Cost" },
    { label: "Warehouse", value: "Warehouse" },
    { label: "Remarks", value: "Remarks" },
  ];
  
  showcolumn = [
    { label: "Date", key: "DATE", visible: true },
    { label: "Type", key: "TYPE", visible: true },
    { label: "Item", key: "ITEM", visible: true },
    { label: "Quantity", key: "QUANTITY", visible: true },
    { label: "Unit", key: "UNIT", visible: true },
    { label: "Unit Cost", key: "UNIT_COST", visible: true },
    { label: "Total Cost", key: "TOTAL_COST", visible: true },
    { label: "Warehouse", key: "WAREHOUSE", visible: true },
    { label: "Remarks", key: "REMARKS", visible: true },
  ];
  
dateVisible: boolean;
typeVisible: boolean;
  
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  UnitList: any;
  status:any
  selectedType
  typeList:any=[]
  typefiltertext=""
  checkColumnselect(a:any){
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
  }
  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find((col) => col.key === key);
    return column ? column.visible : true;
  }
  // onCountryChange() {}
  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || "id";
    const sortOrder = (currentSort && currentSort.value) || "desc";
    console.log(currentSort);
    console.log("sortOrder :" + sortOrder);
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
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

    if (this.selectedItem && this.selectedItem.length > 0) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `ITEM IN (${this.selectedItem.map(item => `'${item}'`).join(", ")})`;
    }
    
    if (this.selectedType && this.selectedType.length > 0) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `TYPE IN (${this.selectedType.map(type => `'${type}'`).join(", ")})`;
    }
    
    if (this.selectedWarehouses && this.selectedWarehouses.length > 0) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `WAREHOUSE IN (${this.selectedWarehouses.map(warehouse => `'${warehouse}'`).join(", ")})`;
    }
    
    if (this.quantitytext) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `QUANTITY LIKE '%${this.quantitytext.trim()}%'`;
    }
    
    if (this.unitcosttext) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `UNIT_COST LIKE '%${this.unitcosttext.trim()}%'`;
    }
    
    if (this.totalcosttext) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `TOTAL_COST LIKE '%${this.totalcosttext.trim()}%'`;
    }
    
    if (this.remarkstext) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `REMARKS LIKE '%${this.remarkstext.trim()}%'`;
    }
    
    if (this.selectedDate) {
      likeQuery += 
        (likeQuery ? " AND " : "") +
        `DATE = '${this.formatDate(this.selectedDate)}'`; // Use a date formatting function if needed
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
    // this.api
    //   .getAllBranch(
    //     this.pageIndex,
    //     this.pageSize,
    //     this.sortKey,
    //     sort,
    //     likeQuery + ""
    //   )
    //   .subscribe(
    //     (data) => {
    //       this.loadingRecords = false;
    //       this.totalRecords = data["count"];
    //       this.dataList = data["data"];
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
  getUnits(){
    this.api.getUnitData(0,0,'id','desc',' AND IS_ACTIVE=1').subscribe(unitdata=>{
      if(unitdata.code==200){
        this.UnitList=unitdata['data']
      }
      else{
        this.UnitList=[]
      }
    })
  }
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = "Create New Inventory Transaction";
    this.drawerData = new InventoryTransaction();

    // this.drawerData.IS_ACTIVE = true;

    // this.api.getAllBranch(1, 1, "SEQ_NO", "desc", "" + "").subscribe(
    //   (data) => {
    //     if (data["count"] == 0) {
    //       this.drawerData.SEQ_NO = 1;
    //     } else {
    //       this.drawerData.SEQ_NO = data["data"][0]["SEQ_NO"] + 1;
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.drawerVisible = true;
  }

  // STATE_HAS_LWF = false;
  edit(data: InventoryTransaction): void {
    this.drawerTitle = "Update Inventory Transaction";
    this.drawerData = Object.assign({}, data);
    // this.STATE_HAS_LWF = false;

    this.drawerVisible = true;
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
      // this.api
      //   .getCity(
      //     this.pageIndex,
      //     this.pageSize,
      //     this.sortKey,
      //     sort,
      //     newQuery
      //     // filterQuery
      //   )
      //   .subscribe(
      //     (data) => {
      //       if (data["code"] === 200) {
      //         this.totalRecords = data["count"];
      //         this.dataList = data["data"];
      //         this.isSpinner = false;
      //         this.filterQuery = "";
      //       } else {
      //         this.dataList = [];
      //         this.isSpinner = false;
      //       }
      //     },
      //     (err) => {
      //       if (err["ok"] === false) this.message.error("Server Not Found", "");
      //     }
      //   );

      this.QUERY_NAME = "";
    }
  }

  applyFilter(i, j) {
    // console.log(i, j);

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

      // this.api
      //   .getCity(this.pageIndex, this.pageSize, this.sortKey, sort, FILDATA)
      //   .subscribe(
      //     (data) => {
      //       if (data["code"] === 200) {
      //         this.totalRecords = data["count"];
      //         this.dataList = data["data"];
      //         this.isSpinner = false;
      //         this.filterQuery = "";
      //       } else {
      //         this.dataList = [];
      //         this.isSpinner = false;
      //       }
      //     },
      //     (err) => {
      //       if (err["ok"] === false) this.message.error("Server Not Found", "");
      //     }
      //   );
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
  visible: boolean = false;
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
