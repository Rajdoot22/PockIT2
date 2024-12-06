import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NzTableQueryParams } from 'ng-zorro-antd/table';  
import { smsmaster } from 'src/app/Pages/Models/smsmaster';
import { ApiServiceService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-smses',
  templateUrl: './smses.component.html',
  styleUrls: ['./smses.component.css']
})
export class SmsesComponent {
  isFilterApplied: any = 'default';
  filterClass: string = 'filter-invisible';

  formTitle = 'Manage SMS Templates';
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  loadingRecords = false;
  sortValue: string = 'desc';
  sortKey: string = 'ID';
  searchText: string = '';
  filterQuery: string = '';
  startValue: any;
  endValue: any;
  TYPE = '';

  columns1: string[][] = [['TEMPLATE_NAME', 'Name']];

  //drawer Variables
  drawerVisible: boolean = false;
  drawerTitle: string = '';
  drawerData: smsmaster = new smsmaster();
  loadingForm = false; 
  userId = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem('userName');
  roleId = sessionStorage.getItem('roleId');
  pageSize2 = 10;
  likeQuery: any = '';
  STATUS = '';

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.search()

  }
  // Basic Methods
  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'desc';



    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    if (this.pageSize2 != pageSize) {
      this.pageIndex = 1;
      this.pageSize2 = pageSize;
    }

    if (this.sortKey != sortField) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }

    this.sortKey = sortField;
    this.sortValue = sortOrder;
    // this.search();
  }

  search(reset: boolean = false) {
    this.loadingRecords = true;
    if (reset) {
      this.pageIndex = 1;
    }

    var sort: string;
    try {
      sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
    } catch (error) {
      sort = '';
    }
    var likeQuery = '';
    if (this.TYPE != '' && this.STATUS != '') {
      this.filterQuery = '?category=' + this.TYPE + '&status=' + this.STATUS;
    } else if (this.TYPE != '' && this.STATUS == '') {
      this.filterQuery = '?category=' + this.TYPE;
    } else if (this.TYPE == '' && this.STATUS != '') {
      this.filterQuery = '?status=' + this.STATUS;
    }
    if (this.TYPE == '' && this.STATUS == '' && this.searchText != '') {
      likeQuery = '?name=' + this.searchText;
    } else if (this.searchText != '') {
      likeQuery = '&name=' + this.searchText;
    }

    //  console.log(this.filterQuery,'asd')
    // this.api
    //   .getAllTemplates(
    //     this.pageIndex,
    //     this.pageSize,
    //     this.sortKey,
    //     sort,
    //     this.filterQuery + likeQuery
    //   )
    //   .subscribe(
    //     (data) => {

    //       this.loadingRecords = false;
    //       this.totalRecords = data['count'];
    //       this.dataList = data['data'];
    //     },
    //     (err) => {

    //       if (err['ok'] == false) this.message.error('Server Not Found', '');
    //     }
    //   );
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }
  get closeCallback1() {
    return this.drawerClose1.bind(this);
  }
  add(): void {
    this.drawerTitle = 'Create New SMS Template';
    this.drawerData = new smsmaster();
    //this.loadForms()
    this.drawerVisible = true;
  }
  drawerVisible1:boolean=false
  drawerTitle1
  edit(data: any): void {
    this.drawerTitle = 'Update New SMS Template';
    this.drawerData = Object.assign({}, data);
    this.drawerVisible1 = true;
    this.drawerTitle1 = 'Template Preview';

  }
  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }
  drawerClose1(): void {
 
    this.drawerVisible1 = false;
  }

  
  clearFilter() {
    this.filterClass = 'filter-invisible';

    this.TYPE = '';
    this.STATUS = '';
    this.filterQuery = '';

    this.search();
  }
  applyFilter() {
    this.isFilterApplied = 'primary';
    this.loadingRecords = false;
    var sort: string;
    this.startValue = this.datePipe.transform(this.startValue, 'yyyy-MM-dd');
    this.endValue = this.datePipe.transform(this.endValue, 'yyyy-MM-dd');

    try {
      sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
    } catch (error) {
      sort = '';
    }
    this.filterQuery = '';

    this.search();
    this.filterClass = 'filter-invisible';
  }
  showFilter(): void {
    if (this.filterClass === 'filter-visible')
      this.filterClass = 'filter-invisible';
    else this.filterClass = 'filter-visible';
  }
  disabledDate1 = (endValue: Date): any => {
    if (this.startValue != null) {
      if (!endValue) {
        return false;
      }

      var modulePreviousDate = new Date(this.startValue);
      modulePreviousDate.setDate(modulePreviousDate.getDate() + -1);

      return endValue <= new Date(modulePreviousDate);
    }
  };

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };
  onKeypressEvent(reset: any) {
    const element = window.document.getElementById('button');
    if (element != null) element.focus();
    // this.search(false);
  }
}
