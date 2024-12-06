import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiServiceService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  // Drawer

  drawerChatVisible:boolean =false
  drawerChatTitle!: string;
  drawerData;


 // Form title
 formTitle = 'Chat Module';

  isfilterapply: boolean = false;
  radioValue = 'A';
  pageIndex = 1;
  pageSize = 10;
  sortValue: string = "desc";
  sortKey: string = "NAME";
  searchText: string = "";
  dataList = [
    {
      QUESTION: 'What is Angular?',
      CATEGORY_NAME: 'Framework',
      SUBCATEGORY_NAME: 'Frontend',
      NAME: 'Angular Query',
      DESCRIPTION: 'Discussion about Angular and its features.',
      TICKET_NO: 'TCK12345',
      IS_TAKEN: 'Yes',
      TAKEN_BY: 'John Doe',
      STATUS: 'Closed',
    },
    {
      QUESTION: 'How to use RxJS?',
      CATEGORY_NAME: 'Library',
      SUBCATEGORY_NAME: 'Reactive',
      NAME: 'RxJS Basics',
      DESCRIPTION: 'Introduction to RxJS and its usage.',
      TICKET_NO: 'TCK12346',
      IS_TAKEN: 'No',
      TAKEN_BY: 'Jane Smith',
      STATUS: 'Pending',
    },
  ];
  loadingRecords = false;
  totalRecords = 1;
  columns: string[][] = [
    ["NAME", "NAME"],
    ["DESCRIPTION", "DESCRIPTION"],
    ["SUBCATEGORY_NAME", "SUBCATEGORY_NAME"],
    ["CATEGORY_NAME", "CATEGORY_NAME"],
  ];
  showcloumnVisible: boolean = false;
  servicecattext: string = "";
  sercatnameVisible: boolean = false;

  servicecatdesctext: string = "";
  sercatdescVisible: boolean = false;

  selectedCategories: number[] = [];
  categoryVisible=false;

  selectedSubCategories: number[] = [];
  subcategoryVisible=false;

  statusFilter: string | undefined = undefined;

  showcolumn = [
    { label: 'Category', key: 'CATEGORY_ID', visible: true },
    { label: 'Subcategory', key: 'SUBCATEGORY_ID', visible: true },
    { label: 'Service Name', key: 'NAME', visible: true },
    { label: 'Service Description', key: 'DESCRIPTION', visible: true },
    { label: 'Status', key: 'STATUS', visible: true }
  ];

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}

  ngOnInit(){
    this.getcategoryData();
    this.getsubcategoryData();
  }



  filterClass: string = "filter-invisible";
  showMainFilter() {
    if (this.filterClass === "filter-visible") {
      this.filterClass = "filter-invisible";
    } else {
      this.filterClass = "filter-visible";
    }
  }


  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length === 0) {
      //this.dataList = [];
      this.search();
    } else if (this.searchText.length < 3) {
      //this.message.warning("Please Enter at least Three Characters ...", "");
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
    if (this.searchText != "") {
      likeQuery = " AND";
      this.columns.forEach((column) => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });
      likeQuery = likeQuery.substring(0, likeQuery.length - 2);
    }
    // this.loadingRecords = true;

    var globalSearchQuery = "";
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

    // this.loadingRecords = true;
    if (this.servicecattext !== "") {
      likeQuery +=
        (likeQuery ? " AND " : "") +
        `NAME LIKE '%${this.servicecattext.trim()}%'`;
    }
       // category Filter
       if (this.selectedCategories.length > 0) {
        if (likeQuery !== '') {
          likeQuery += ' AND ';
        }
        likeQuery += `CATEGORY_ID IN (${this.selectedCategories.join(',')})`; // Update with actual field name in the DB
      }

       // subcategory Filter
       if (this.selectedSubCategories.length > 0) {
        if (likeQuery !== '') {
          likeQuery += ' AND ';
        }
        likeQuery += `SUBCATEGORY_ID IN (${this.selectedSubCategories.join(',')})`; // Update with actual field name in the DB
      }


    //Status Filter
    if (this.statusFilter) {
      if (likeQuery !== "") {
        likeQuery += " AND ";
      }
      likeQuery += `AVAILABILITY_STATUS= ${this.statusFilter}`;
    }

    // Combine global search query and column-specific search query
    likeQuery = globalSearchQuery + (likeQuery ? " AND " + likeQuery : "");


  }

  sort(params: NzTableQueryParams) {
    // this.loadingRecords = true;
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


  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find(col => col.key === key);
    return column ? column.visible : true;
  }

  onCategoryChange(): void {
    this.search();
  }
  onSubCategoryChange(): void {
    this.search();
  }

  reset(): void {
    this.searchText = "";
    this.servicecattext = "";
    this.servicecatdesctext = "";
    this.search();
  }

  listOfFilter: any[] = [
    { text: "Active", value: "1" },
    { text: "Inactive", value: "0" },
  ];

  onStatusFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.search(true);
  }

  CategoryData: any = [];
  getcategoryData() {
    this.api.getCategoryData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.CategoryData = data["data"];
        } else {
          this.CategoryData = [];
          this.message.error("Failed To Get Category Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  SubCategoryData: any = [];
  getsubcategoryData() {
    this.api.getSubCategoryData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.SubCategoryData = data["data"];
        } else {
          this.SubCategoryData = [];
          this.message.error("Failed To Get Subategory Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  view(data :any)
  {
    this.drawerChatTitle = ` ${data.TICKET_NO} `;
    this.drawerData = Object.assign({}, data);
    this.drawerChatVisible = true;
  }



  // Drawer
  drawerChatClose(): void {
    this.search();
    this.drawerChatVisible = false;
  }

  get closeCallback() {
    return this.drawerChatClose.bind(this);
  }
}
