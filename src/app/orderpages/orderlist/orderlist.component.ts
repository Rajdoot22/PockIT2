import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { orderMasterData } from 'src/app/Pages/Models/orderMasterData';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  date = new Date();
  drawerTitle: string = '';
  drawerVisible = false;
  searchText: string = '';
  pageIndex = 1;
  pageSize = 10;
  sortKey: string = 'ID';
  sortValue: string = 'desc';
  loadingRecords = false;
  dataList: any = [];
  totalRecords = 1;
  columns: string[][] = [['NAME', 'NAME']];
  drawerData: orderMasterData = new orderMasterData();
  drawervisible = false;
  drawersize = '85%';
  ordercreateVisible: boolean = false;
  isfilterapply: boolean = false;
  filterClass: string = 'filter-invisible';

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.search();
  }
  vieworderdata: any;
  isSpinning: boolean = false;
  orderid: any;
  vieworder(data: any): void {
    this.drawerTitle = 'Manege Jobs';
    this.orderid = data.ID;
    this.isSpinning = true;
    // this.api.getCity(1, 1, 'SEQ_NO', 'desc', '' + '').subscribe(data => {
    //   if (data['count'] == 0) {
    //     this.drawerData.SEQ_NO = 1;

    //   } else {
    //     this.drawerData.SEQ_NO = data['data'][0]['SEQ_NO'] + 1;
    //   }

    // }, err => {
    //   console.log(err);
    // })
    this.api.getorderdetails(0, 0, '', '', '', data.ID).subscribe((data) => {
      this.vieworderdata = data;
      this.drawerVisible = true;
      this.isSpinning = false;
    });
  }
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length == 0) {
      this.search();
    }
  }

  search(reset: boolean = false) {
    this.isSpinning = true;
    if (reset) {
      this.pageIndex = 1;
      this.sortKey = 'id';
      this.sortValue = 'desc';
    }

    var sort: string;
    try {
      sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
    } catch (error) {
      sort = '';
    }

    var likeQuery = '';
    // let globalSearchQuery = "";
    // if (this.searchText !== "") {
    //   globalSearchQuery =
    //     " AND (" +
    //     this.columns
    //       .map((column) => {
    //         return `${column[0]} like '%${this.searchText}%'`;
    //       })
    //       .join(" OR ") +
    //     ")";
    // }

    // if (this.AppLanguageText !== "") {
    //   likeQuery +=
    //     (likeQuery ? " AND " : "") +
    //     `NAME LIKE '%${this.AppLanguageText.trim()}%'`;
    // }
    // //Short Code
    // if (this.ShortCodetext !== "") {
    //   likeQuery +=
    //     (likeQuery ? " AND " : "") +
    //     `SHORT_CODE LIKE '%${this.ShortCodetext.trim()}%'`;
    // }
    // if (this.Sequenecetext !== "") {
    //   likeQuery +=
    //     (likeQuery ? " AND " : "") +
    //     `SEQ_NO LIKE '%${this.Sequenecetext.trim()}%'`;
    // }
    // //for application type
    // if (this.AppFilter) {
    //   if (likeQuery !== "") {
    //     likeQuery += " AND ";
    //   }
    //   likeQuery += `APPLICATION_TYPE= ${this.AppFilter}`;
    // }
    // // Status Filter
    // if (this.statusFilter) {
    //   if (likeQuery !== "") {
    //     likeQuery += " AND ";
    //   }
    //   likeQuery += `IS_ACTIVE = ${this.statusFilter}`;
    // }

    // // Combine global search query and column-specific search query
    // likeQuery = globalSearchQuery + (likeQuery ? " AND " + likeQuery : "");

    this.api
      .getOrdersData(
        this.pageIndex,
        this.pageSize,
        this.sortKey,
        sort,
        likeQuery
      )
      .subscribe(
        (data) => {
          if (data['code'] == 200) {
            this.loadingRecords = false;
            this.totalRecords = data['count'];
            this.dataList = data['data'];
            this.isSpinning = false;
          } else {
            this.loadingRecords = false;
            this.dataList = [];
            this.message.error('Something Went Wrong ...', '');
            this.isSpinning = false;
          }
        },
        (err: HttpErrorResponse) => {
          this.loadingRecords = false;
          if (err.status === 0) {
            this.message.error(
              'Unable to connect. Please check your internet or server connection and try again shortly.',
              ''
            );
            this.isSpinning = false;
          } else {
            this.message.error('Something Went Wrong.', '');
            this.isSpinning = false;
          }
        }
      );
  }

  drawerClose(): void {
    this.search();

    this.drawerVisible = false;
  }
  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  drawerCloseorder(): void {
    this.search();
    this.ordercreateVisible = false;
  }

  //Drawer Methods
  get closeCallbackorder() {
    return this.drawerCloseorder.bind(this);
  }

  createneworder() {
    this.ordercreateVisible = true;
  }

  showMainFilter() {
    if (this.filterClass === 'filter-visible') {
      this.filterClass = 'filter-invisible';
    } else {
      this.filterClass = 'filter-visible';
    }
  }
  orderData: any;


}
