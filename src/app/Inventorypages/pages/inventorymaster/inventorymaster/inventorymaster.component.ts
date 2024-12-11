import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { CookieService } from "ngx-cookie-service";
// import { invetoryAdjustments } from "src/app/Pages/Models/inventoryAdjustment";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { CommonFunctionService } from "src/app/Service/CommonFunctionService"; 
import { DatePipe } from "@angular/common";
import { InventoryMaster } from "src/app/Inventorypages/inventorymodal/inventoryMaster";
import { invetoryAdjustments } from "src/app/Inventorypages/inventorymodal/inventoryAdjustment";

@Component({
  selector: "app-inventorymaster",
  templateUrl: "./inventorymaster.component.html",
  styleUrls: ["./inventorymaster.component.css"],
})
export class InventorymasterComponent {
  formTitle = "Manage Inventories";
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
  qtyvisible: boolean = false;
  purchasepricevisible: boolean = false;
  sellingpricevisible: boolean = false;
  locationvisible: boolean = false;
  warehousevisible: boolean = false;
  dateofentryvisible: boolean = false;
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  columns: string[][] = [
    ["ITEM_NAME", "Item Name"],
    ["INVENTORY_CATEGORY", "Inventory Category"],
    ["INVENTRY_SUB_CATEGORY", "Inventory Sub Category"],
    ["UNIT", "Unit"],
    ["QUANTITY", "Quantity"],
    ["PURCHASE_PRICE", "Purchase Price"],
    ["SELLING_PRICE", "Selling Price"],
    ["LOCATION", "Location"],
    ["DATE_OF_ENTRY", "Date of Entry"],
    ["REMARKS", "Remarks"],
    ["STATUS", "Status"],
  ];

  // columns1: string[][] = [["NAME", "Branch Name"], ["COUNTRY_NAME", "Country"], ["STATE_NAME", "State"], ["CITY_NAME", "City"]];
  time = new Date();
  drawerVisible: boolean;
  drawerTitle: string;
  drawerTitle1: string;
  drawerData: InventoryMaster = new InventoryMaster();
  isfilterapply: boolean = false;
  filterClass: string = "filter-invisible";
  itemNametext: string = "";
  unitNametext: string = "";
  locationtext: string = "";
  quantitytext: string = "";
  purchasepricetext: string = "";
  sellingpricetext: string = "";
  // locationtext : string = ""
  remarkstext: string = "";
  selectedSubcategories: any = [];
  subCategoryData: any = [];
  selectedcategories: any = [];
  categoryData: any = [];

  wareHouselocationList: any = [];
  selectedwarehouseLocations: any = [];
  selectedUnits: any = [];
  unitLists: any = [];
  selectedWarehouses: any = [];
  warehousesList: any = [];
  selectedDate: any;
  columns1: { label: string; value: string }[] = [
    { label: "Item Name", value: "ITEM_NAME" },
    { label: "Inventory Category", value: "INVENTORY_CATEGORY_ID" },
    { label: "Inventory Sub-Category", value: "INVENTRY_SUB_CATEGORY_ID" },
    { label: "Unit", value: "UNIT_ID" },
    { label: "Quantity", value: "QUANTITY" },
    { label: "Purchase Price", value: "PURCHASE_PRICE" },
    { label: "Selling Price", value: "SELLING_PRICE" },
    { label: "Location", value: "LOCATION_ID" },
    { label: "Warehouse", value: "WAREHOUSE_ID" },
    { label: "Date of Entry", value: "DATE_OF_ENTRY" },
    { label: "Remarks", value: "REMARKS" },
    { label: "Status", value: "STATUS" },
  ];

  data: invetoryAdjustments = new invetoryAdjustments();
  storageLocationlist: any;

  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  showcolumn = [
    // { label: "Item ID", key: "ITEM_ID", visible: true },
    { label: "Item Name", key: "ITEM_NAME", visible: true },
    { label: "Inventory Category", key: "INVENTORY_CATEGORY", visible: true },
    {
      label: "Inventory Sub-Category",
      key: "INVENTRY_SUB_CATEGORY",
      visible: true,
    },
    { label: "Unit", key: "UNIT", visible: true },
    { label: "Quantity", key: "QUANTITY", visible: true },
    { label: "Purchase Price", key: "PURCHASE_PRICE", visible: true },
    { label: "Selling Price", key: "SELLING_PRICE", visible: true },
    { label: "Warehouse", key: "WAREHOUSE", visible: true },
    { label: "Location", key: "LOCATION", visible: true },
    { label: "Date of Entry", key: "DATE_OF_ENTRY", visible: true },
    { label: "Remarks", key: "REMARKS", visible: true },
    { label: "Status", key: "STATUS", visible: true },
  ];
  UnitList: any;
  status: any;
  checkColumnselect(a: any) {
    // console.log(a);
  }
  public commonFunction = new CommonFunctionService();
  constructor(
    private api: ApiServiceService,
    private cookie: CookieService,
    private message: NzNotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.search();
    this.getUnits();
    this.getInventoryCategory();
    this.getSubCategory();
    this.getWarehouselocations();
    this.getWarehouses();
  }
  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find((col) => col.key === key);
    return column ? column.visible : true;
  }
  // onCountryChange() {}
  getInventoryCategory() {
    this.api
      .getInventoryCategory(0, 0, "id", "desc", " AND IS_ACTIVE=1")
      .subscribe((data) => {
        if (data["code"] == 200) {
          this.categoryData = data["data"];
        } else {
          this.categoryData = [];
        }
      });
  }
  getSubCategory() {
    this.api
      .getInventorySubCategory(0, 0, "id", "desc", " AND IS_ACTIVE=1")
      .subscribe((categorysuccess) => {
        if (categorysuccess.code == 200) {
          this.subCategoryData = categorysuccess["data"];
        } else {
          this.subCategoryData = [];
        }
      });
  }
  getWarehouses() {
    this.api
      .getWarehouses(0, 0, "id", "desc", " AND STATUS='A'")
      .subscribe((data) => {
        if (data["code"] == 200) {
          this.warehousesList = data["data"];
        } else {
          this.warehousesList = [];
        }
      });
  }
  getWarehouselocations() {
    this.api
      .getWarehousesLocation(0, 0, "id", "desc", " AND IS_ACTIVE=1")
      .subscribe((categorysuccess) => {
        if (categorysuccess.code == 200) {
          this.storageLocationlist = categorysuccess["data"];
        } else {
          this.storageLocationlist = [];
        }
      });
  }
  // getUnits(){
  //   this.api.getUnitData(0,0,'id','desc',' AND IS_ACTIVE=1').subscribe(unitdata=>{
  //     if(unitdata.code==200){
  //       this.UnitList=unitdata['data']
  //     }
  //     else{
  //       this.UnitList=[]
  //     }
  //   })
  // }
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
    this.loadingRecords = true;

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

    if (this.itemNametext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `ITEM_NAME LIKE '%${this.itemNametext.trim()}%'`;
    }

    if (this.locationtext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `LOCATION LIKE '%${this.locationtext.trim()}%'`;
    }

    if (this.quantitytext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `QUANTITY LIKE '%${this.quantitytext.trim()}%'`;
    }

    if (this.purchasepricetext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `PURCHASE_PRICE LIKE '%${this.purchasepricetext.trim()}%'`;
    }

    if (this.sellingpricetext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `SELLING_PRICE LIKE '%${this.sellingpricetext.trim()}%'`;
    }

    // if (this.remarkstext !== "") {
    //   likeQuery +=
    //     (likeQuery ? " AND " : "") +
    //     `REMARKS LIKE '%${this.remarkstext.trim()}%'`;
    // }

    // Inventory Category
    // Selected Categories
    if (this.selectedcategories?.length) {
      const categories = this.selectedcategories.join(",");
      likeQuery +=
        (likeQuery ? " AND " : "") + `INVENTORY_CATEGORY_ID IN (${categories})`;
    }

    // Selected Sub-Categories
    if (this.selectedSubcategories?.length) {
      const subCategories = this.selectedSubcategories.join(",");
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `INVENTRY_SUB_CATEGORY_ID IN (${subCategories})`;
    }

    // Selected Units
    if (this.selectedUnits?.length) {
      const units = this.selectedUnits.join(",");
      likeQuery += (likeQuery ? " AND " : "") + `UNIT_ID IN (${units})`;
    }

    // Selected Warehouse Locations
    if (this.selectedwarehouseLocations?.length) {
      const warehouseLocations = this.selectedwarehouseLocations.join(",");
      likeQuery +=
        (likeQuery ? " AND " : "") + `LOCATION_ID IN (${warehouseLocations})`;
    }

    // Selected Warehouses
    if (this.selectedWarehouses?.length) {
      const warehouses = this.selectedWarehouses.join(",");
      likeQuery +=
        (likeQuery ? " AND " : "") + `WAREHOUSE_ID IN (${warehouses})`;
    }

    // Entry Date (if a range is required, modify accordingly)
    if (this.selectedDate) {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `DATE_OF_ENTRY = '${this.datePipe.transform(
          this.selectedDate,
          "yyyy-MM-dd"
        )}'`;
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
      .getInventory(
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
            this.message.error("Failed to get Inventory Records", "");
          }
        },
        (err) => {
          this.loadingRecords = false;

          this.dataList = [];
          this.message.error("Failed To Get Inventory Records", "");
          console.log(err);
        }
      );
  }
  // public commonFunction = new CommonFunctionService();
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
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = "Create New Inventory";
    this.drawerData = new InventoryMaster();

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
  edit(data: InventoryMaster): void {
    this.drawerTitle = "Update Inventory Details";
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
  isAdjustmentvisible = false;
  isAdjustmentTitle = "Adjust Quantity";
  isAdjustmentSpinning = true;
  unitselect1: any;
  unitselect2: any;
  unitselect3: any;
  changeQuantity(quantity: number) {
    if (this.data.OLD_QTY && quantity) {
      this.data.NEW_QTY = Number(this.data.OLD_QTY) + Number(quantity);
    } else {
      this.data.NEW_QTY = 0;
    }
  }
  openAdjustment(data) {
    if (data) {
      // console.log(data);
      this.isAdjustmentTitle = "Inventory " + data["ITEM_NAME"] + " Adjustment";
      this.isAdjustmentvisible = true;
      this.isAdjustmentSpinning = false;
      this.data = new invetoryAdjustments();
      this.data.OLD_QTY = data["QUANTITY"];
      this.unitselect1 = data["UNIT_ID"];
      this.unitselect2 = data["UNIT_ID"];
      this.unitselect3 = data["UNIT_ID"];
      this.data.ITEM_ID = data["ID"];
      this.data.ITEM_NAME = data["ITEM_NAME"];
    }
  }

  closeAdjustment() {
    this.isAdjustmentvisible = false;
    this.isAdjustmentSpinning = false;
    this.data = new invetoryAdjustments();
    this.unitselect1 = null;
    this.unitselect2 = null;
    this.unitselect3 = null;
    // this.resetDrawer(adjustmentForm)
  }
  resetDrawer(adjustmentForm: NgForm) {
    adjustmentForm.form.markAsPristine();
    adjustmentForm.form.markAsUntouched();
    // this.add();
  }
  isOk2 = true;
  saveAdjustment(addNew: boolean = false, adjustmentForm: NgForm) {
    this.isAdjustmentSpinning = true;
    if (
      !this.data.OLD_QTY &&
      !this.data.ADJUSTMENT_QUANTITY &&
      !this.data.NEW_QTY &&
      !this.data.LOCATION &&
      !this.data.ADJUSTMENT_REASON
    ) {
      this.message.error("All fields are required.", "");
      this.isAdjustmentSpinning = false;
      this.isOk2 = false;
    } else if (!this.data.OLD_QTY || this.data.OLD_QTY == 0) {
      this.message.error("Please enter Old Quantity", "");
      this.isAdjustmentSpinning = false;
      this.isOk2 = false;
    } else if (
      !this.data.ADJUSTMENT_QUANTITY ||
      this.data.ADJUSTMENT_QUANTITY == 0
    ) {
      this.message.error("Please enter Adjustment Quantity", "");
      this.isAdjustmentSpinning = false;
      this.isOk2 = false;
    } else if (!this.data.NEW_QTY || this.data.NEW_QTY == 0) {
      this.message.error("Please enter New Quantity", "");
      this.isAdjustmentSpinning = false;
      this.isOk2 = false;
    } else if (!this.data.LOCATION) {
      this.message.error("Please select Location", "");
      this.isAdjustmentSpinning = false;
      this.isOk2 = false;
    } else if (!this.data.ADJUSTMENT_REASON) {
      this.message.error("Please enter Adjustment Reason", "");
      this.isAdjustmentSpinning = false;

      this.isOk2 = false;
    }
    if (this.isOk2) {
      // console.log(this.isOk2);

      let userId = sessionStorage.getItem("userId");
      if (userId) {
        this.data.ADJUSTED_BY = Number(this.commonFunction.decryptdata(userId));
        this.api.createInventoryAdjustment(this.data).subscribe(
          (data) => {
            if (data["code"] == 200) {
              this.message.success("Adjustment Added Successfully", "");
              this.isAdjustmentSpinning = false;
            } else {
              this.message.error("Failed To Add Adjustment", "");
              this.isAdjustmentSpinning = false;
            }
          },
          (err) => {
            this.message.error("Server error", "");
            this.isAdjustmentSpinning = false;
          }
        );
      } else {
        // Handle the null case
        console.error("User ID is null");
        // You can also assign a default value or take other necessary actions
        this.data.ADJUSTED_BY = null; // or some default value
      }
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
  getComparisonOptions(selectedColumn: string): string[] {
    if (
      selectedColumn === "INVENTORY_CATEGORY_ID" ||
      selectedColumn === "INVENTRY_SUB_CATEGORY_ID" ||
      selectedColumn === "DATE_OF_ENTRY" ||
      selectedColumn === "UNIT_ID" ||
      selectedColumn === "LOCATION_ID" ||
      selectedColumn === "WAREHOUSE_ID" ||
      selectedColumn === "STATUS"
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
          if (selection1 === "DATE_OF_ENTRY") {
            selection3 = selection3
              ? this.datePipe
                  .transform(filter["SELECTION3"], "yyyy-MM-dd")
                  ?.toString() || ""
              : "";
          }
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
        .getInventory(
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

  restrictedKeywords = [
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "TRUNCATE",
    "ALTER",
    "CREATE",
    "RENAME",
    "GRANT",
    "REVOKE",
    "EXECUTE",
    "UNION",
    "HAVING",
    "WHERE",
    "ORDER BY",
    "GROUP BY",
    "ROLLBACK",
    "COMMIT",
    "--",
    ";",
    "/*",
    "*/",
  ];

  isValidInput(input: string): boolean {
    return !this.restrictedKeywords.some((keyword) =>
      input.toUpperCase().includes(keyword)
    );
  }
  applyFilter(i: number, j: number) {
    const currentFilter = this.filterBox[i]["FILTER"][j];

    const selection1 = currentFilter.SELECTION1;
    if (selection1 === "DATE_OF_ENTRY") {
      currentFilter.SELECTION3 = currentFilter.SELECTION3
        ? this.datePipe
            .transform(currentFilter.SELECTION3, "yyyy-MM-dd")
            ?.toString() || ""
        : "";
    }
    const selection2 = currentFilter.SELECTION2;
    const selection3 = currentFilter.SELECTION3;

    if (!selection1) {
      this.message.error("Please select a column", "");
    } else if (!selection2) {
      this.message.error("Please select a comparison", "");
    } else if (!selection3 || selection3.length < 1) {
      this.message.error(
        "Please enter a valid value with at least 1 character",
        ""
      );
    } else if (
      typeof selection3 === "string" &&
      !this.isValidInput(selection3)
    ) {
      this.message.error(`Invalid Input: ${selection3} is not allowed.`, "");
    } else {
      const sort = this.sortValue?.startsWith("a") ? "asc" : "desc";

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

      const filterCondition = getComparisonFilter(
        selection2,
        selection3,
        selection1
      );
      const FILDATA = `AND (${filterCondition})`;

      // console.log(FILDATA, "Filter Data");

      this.isSpinner = true;

      this.api
        .getInventory(
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
              this.dataList = data["data"];
            } else {
              this.dataList = [];
            }
            this.isSpinner = false;
          },
          (err) => {
            if (err["ok"] === false) {
              this.message.error("Server Not Found", "");
            }
            this.isSpinner = false;
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
