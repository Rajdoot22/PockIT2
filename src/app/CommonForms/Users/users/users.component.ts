import { Component, OnInit } from '@angular/core';
import { UserMaster } from 'src/app/CommonModels/user-master';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  formTitle = 'Manage Users';
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList: any = [];
  loadingRecords = true;
  sortValue: string = 'desc';
  sortKey: string = 'id';
  searchText: string = '';
  filterQuery: string = '';
  isFilterApplied: string = 'default';
  columns: string[][] = [
    ['ROLE_NAME', 'Role'],
    ['NAME', 'Name'],
    ['EMAIL_ID', 'Email'],
    ['MOBILE_NUMBER', 'Mobile'],
    ["DESIGNATION_NAME", "Designation"],
    ["ROOM_NO", "Room No"],
  ];
  drawerVisible: boolean = false;
  drawerTitle: string = '';
  drawerData: any = new UserMaster();

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length === 0) {
      this.dataList = [];
      this.search();
    }
  }
  ngOnInit() {
    this.search();
  }
  sort(params: NzTableQueryParams) {
    this.loadingRecords = true;
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || '';
    const sortOrder = (currentSort && currentSort.value) || 'desc';
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
    this.search(false);
  }
  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    this.loadingRecords = true;
    var sort: string;

    try {
      sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
    } catch (error) {
      sort = '';
    }

    var likeQuery = '';

    if (this.searchText != '') {
      likeQuery = ' AND (';

      this.columns.forEach((column) => {
        likeQuery += ' ' + column[0] + " like '%" + this.searchText + "%' OR";
      });

      likeQuery = likeQuery.substring(0, likeQuery.length - 2);
      likeQuery += ')';
    }

    this.api
      .getAllUsers(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery)
      .subscribe(
        (data) => {
          this.loadingRecords = false;
          this.totalRecords = data['count'];
          this.dataList = data['data'];
        },
        () => {
          this.loadingRecords = false;
          this.message.error('Something Went Wrong ...', '');
        }
      );
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = 'Create New User';
    this.drawerData = new UserMaster();
    this.drawerData.IS_ACTIVE = true;
    this.drawerVisible = true;
  }

  edit(data: any): void {
    this.drawerTitle = 'Update User Details';
    this.drawerData = Object.assign({}, data);
    if (
      this.drawerData.ROLE_IDS != null &&
      this.drawerData.ROLE_IDS != undefined &&
      this.drawerData.ROLE_IDS != ''
    ) {
      this.drawerData.ROLE_DATA = data['ROLE_IDS'].split(',');
      for (var i = 0; i < this.drawerData.ROLE_DATA.length; i++) {
        this.drawerData.ROLE_DATA[i] = Number(this.drawerData.ROLE_DATA[i]);
      }
    } else {
    }

    this.drawerVisible = true;
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
}
