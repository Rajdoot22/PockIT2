import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TerritoryMaster } from 'src/app/Pages/Models/TerritoryMaster';
import { ApiServiceService } from 'src/app/Service/api-service.service'; 

@Component({
  selector: 'app-territory-master',
  templateUrl: './territory-master.component.html',
  styleUrls: ['./territory-master.component.css']
})
export class TerritoryMasterComponent {
  drawerVisible: boolean = false;
  drawerData: TerritoryMaster = new TerritoryMaster();
  searchText: string = '';
  formTitle = 'Manage Territories';
  pageIndex = 1;
  pageSize = 10;
  sortValue: string = 'desc';
  sortKey: string = 'NAME';
  chapters: any = [];
  isLoading = true;
  columns: string[][] = [
    ['NAME', 'NAME'],
    ['BRANCH_NAME', 'BRANCH_NAME'],
    ['COUNTRY_NAME', 'COUNTRY_NAME'],
    ['IS_EXPRESS_SERVICE_AVAILABLE', 'IS_EXPRESS_SERVICE_AVAILABLE'],
    
    ['SEQ_NO', 'SEQ_NO'],
  ];
  loadingRecords = false;
  totalRecords = 1;
  dataList: any = [];
  drawerTitle!: string;

  name:string='';
  namevisible=false;
  selectedBranches: number[] = [];
  branchVisible=false;
  seqno: string = '';
  seqvisible = false;
  countryVisible: boolean = false;
  selectedCountries: number[] = [];
  statusFilter: string | undefined = undefined;
  listOfFilter: any[] = [
    { text: 'Active', value: '1' },
    { text: 'Inactive', value: '0' }
  ];
  ExpressServiceFilter: string | undefined = undefined;
  ExpressServicelistOfFilter: any[] = [
    { text: 'Yes', value: '1' },
    { text: 'No', value: '0' }
  ];



  isfilterapply: boolean = false;
  filterClass: string = 'filter-invisible';
  filterQuery: string = '';
  visible = false;
  columns1: { label: string; value: string }[] = [
    { label: 'Name', value: 'NAME' },
    { label: 'Branch Name', value: 'BRANCH_ID' },
    { label: 'Country Name', value: 'COUNTRY_ID' },
    { label: 'Sequence No.', value: 'SEQ_NO' },
    { label: 'Is Express Service Available', value: 'IS_EXPRESS_SERVICE_AVAILABLE' },
    { label: 'Status', value: 'IS_ACTIVE' },
  ];


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
  ngOnInit(){
    this.getCountyData();
    this.getBranchData();
  }

  branchData: any = [];
  getBranchData() {
    this.api.getAllBranch(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.branchData = data["data"];
        } else {
          this.branchData = [];
          this.message.error("Failed To Get Branch Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
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

  onBranchChange(): void {
    this.search();
  }
  onCountryChange(): void {
    this.search();
  }
  onStatusFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.search(true);
  }
  onExpressServiceChange(selectedExpressService: string) {
    this.ExpressServiceFilter = selectedExpressService;
    this.search(true);
  }
  reset(): void {
    this.searchText = '';
    this.name = ''
    this.seqno='';
    this.search();
  }
  search(reset: boolean = false) {
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
    let globalSearchQuery='';
    // if (this.searchText != '') {
    //   likeQuery = ' AND';
    //   this.columns.forEach((column) => {
    //     likeQuery += ' ' + column[0] + " like '%" + this.searchText + "%' OR";
    //   });
    //   likeQuery = likeQuery.substring(0, likeQuery.length - 2);
    // }

    if (this.searchText !== '') {
      globalSearchQuery = ' AND (' + this.columns.map((column) => {
        return `${column[0]} like '%${this.searchText}%'`;
      }).join(' OR ') + ')';
    }
  this.loadingRecords = true;


    // CURRENCY_NAME Filter
    if (this.name !== '') {
      likeQuery += (likeQuery ? ' AND ' : '') + `NAME LIKE '%${this.name.trim()}%'`;
    }

       // Country Filter
       if (this.selectedCountries.length > 0) {
        if (likeQuery !== '') {
          likeQuery += ' AND ';
        }
        likeQuery += `COUNTRY_ID IN (${this.selectedCountries.join(',')})`; // Update with actual field name in the DB
      }
         // branch Filter
    if (this.selectedBranches.length > 0) {
      if (likeQuery !== '') {
        likeQuery += ' AND ';
      }
      likeQuery += `BRANCH_ID IN (${this.selectedBranches.join(',')})`; // Update with actual field name in the DB
    }
       // Express Servive Filter
       if (this.ExpressServiceFilter) {
        if (likeQuery !== '') {
          likeQuery += ' AND ';
        }
        likeQuery += `IS_EXPRESS_SERVICE_AVAILABLE = ${this.ExpressServiceFilter}`;
      }
      // SEQ_NO Filter
     if (this.seqno !== '') {
      likeQuery += (likeQuery ? ' AND ' : '') + `SEQ_NO LIKE '%${this.seqno.trim()}%'`;
    }
        // Status Filter
        if (this.statusFilter) {
          if (likeQuery !== '') {
            likeQuery += ' AND ';
          }
          likeQuery += `IS_ACTIVE = ${this.statusFilter}`;
        }
    likeQuery = globalSearchQuery + (likeQuery ? ' AND ' + likeQuery : '');
    this.api.getTeritory(
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
          } else {
            this.loadingRecords = false;
            this.dataList = [];
            this.message.error('Something Went Wrong ...', '');
          }
        },
        (err: HttpErrorResponse) => {
          this.loadingRecords = false;
          if (err.status === 0) {
            this.message.error(
              'Network error: Please check your internet connection.',
              ''
            );
          } else {
            this.message.error('Something Went Wrong.', '');
          }
        }
      );
  }


  add(): void {
    this.drawerTitle = 'Create New Territory ';
    this.drawerData = new TerritoryMaster();
    this.api.getTeritory(1, 1, 'SEQ_NO', 'desc', '').subscribe(
      (data) => {
        if (data['code'] == 200) {
          if (data['count'] == 0) {
            this.drawerData.SEQ_NO = 1;
          } else {
            this.drawerData.SEQ_NO = data['data'][0]['SEQ_NO'] + 1;
          }
        } else {
          this.message.error('Server Not Found', '');
        }
      },
      (err: HttpErrorResponse) => {
        this.loadingRecords = false;
        if (err.status === 0) {
          this.message.error(
            'Network error: Please check your internet connection.',
            ''
          );
        } else {
          this.message.error('Something Went Wrong.', '');
        }
      }
    );
    this.drawerVisible = true;
  }

  sort(params: NzTableQueryParams) {
    this.loadingRecords = true;
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
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
    this.search();
  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  edit(data: TerritoryMaster): void {
    this.drawerTitle = 'Update Territory';
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true;
  }


  // mapping
  drawerPicodeVisible = false;
  drawerPicodeMappingClose(): void {
    this.search();
    this.drawerPicodeVisible = false;
  }
  get closePincodeMappingCallback() {
    return this.drawerPicodeMappingClose.bind(this);
  }

  PincodeMapping(data: any): void {
    this.drawerTitle = ` Map Pincodes to the ${data.NAME} Territory`;
    this.drawerData = Object.assign({}, data);
    this.drawerPicodeVisible = true;

  }
  drawerserviceVisible = false;
  ServiceMapping(data: any): void {
    this.drawerTitle = ` Map Service Non Availability to the ${data.NAME} Territory`;
    this.drawerData = Object.assign({}, data);
    this.drawerserviceVisible = true;

  }
  // Main Filter
  showMainFilter() {
    if (this.filterClass === 'filter-visible') {
      this.filterClass = 'filter-invisible';
    }
    else { this.filterClass = 'filter-visible'; }
  }

 
   // Main Filter code
   hide: boolean = true
   filterQuery1: any = '';
   INSERT_NAME: any
   comparisonOptions: string[] = ['=',
     '!=',
     '<',
     '>',
     '<=',
     '>=',
     'Contains',
     'Does not Contain',
     'Start With',
     'End With',];
  getComparisonOptions(selectedColumn: string): string[] {
    if (selectedColumn === 'COUNTRY_ID' ||
      selectedColumn === 'BRANCH_ID' ||
       selectedColumn === 'IS_ACTIVE' ||
       selectedColumn === 'IS_EXPRESS_SERVICE_AVAILABLE') {
      return ['=', '!='];
    }
    return [
      '=',
      '!=',
      '<',
      '>',
      '<=',
      '>=',
      'Contains',
      'Does not Contain',
      'Start With',
      'End With',
    ];
  }
 
   columns2: string[][] = [
     ['AND'],
     ['OR'],
   ];
 
   showFilter = false;
   toggleFilter() {
     this.showFilter = !this.showFilter;
   }

   showSortFilter =false;
   toggleSortFilter(){
    this.showSortFilter = !this.showSortFilter
   }
 
 
   SELECTCOLOUM_NAME: any;
   TABLE_VALUE: any;
   COMPARISION_VALUE: any;
 
   conditions: any[] = [];
 
   InsertNewCondition() {
     this.conditions.push({
       SELECTCOLOUM_NAME: '',
       COMPARISION_VALUE: '',
       TABLE_VALUE: ''
     });
   }
 
   deleteCondition(index: number) {
     this.conditions.splice(index, 1);
   }
 
   operators: string[] = ['AND', 'OR'];
   // QUERY_NAME: string = '';
   showQueriesArray = [];
 
   filterBox = [
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
 
   addCondition() {
     this.filterBox.push({
       CONDITION: '',
       FILTER: [
         {
           CONDITION: '',
           SELECTION1: '',
           SELECTION2: '',
           SELECTION3: '',
         },
       ],
     });
   }
 
   removeCondition(index: number) {
     this.filterBox.splice(index, 1);
   }
 
   insertSubCondition(conditionIndex: number, subConditionIndex: number) {
 
     const lastFilterIndex = this.filterBox.length - 1;
     const lastSubFilterIndex = this.filterBox[lastFilterIndex]['FILTER'].length - 1;
 
     const selection1 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION1'];
     const selection2 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION2'];
     const selection3 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION3'];
 
     if (!selection1) {
       this.message.error("Please select a column",'');
     } else if (!selection2) {
       this.message.error("Please select a comparison",'');
     } else if (!selection3 || selection3.length < 1) {
       this.message.error("Please enter a valid value with at least 1 characters",'');
     } else {
 
       console.log(conditionIndex, subConditionIndex);
       this.hide = false
       this.filterBox[conditionIndex].FILTER.splice(subConditionIndex + 1, 0, {
         CONDITION: '',
         SELECTION1: '',
         SELECTION2: '',
         SELECTION3: '',
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
     var j = this.filterBox[i]['FILTER'].length - 1;
     if (
       this.filterBox[i]['FILTER'][j]['SELECTION1'] == undefined || this.filterBox[i]['FILTER'][j]['SELECTION1'] == ''
       ||
       this.filterBox[i]['FILTER'][j][
       'SELECTION2'
       ] == undefined ||
       this.filterBox[i]['FILTER'][j][
       'SELECTION2'
       ] == '' ||
       this.filterBox[i]['FILTER'][j][
       'SELECTION3'
       ] == undefined ||
       this.filterBox[i]['FILTER'][j][
       'SELECTION3'
       ] == '' ||
       this.filterBox[i]['FILTER'][j][
       'CONDITION'
       ] == undefined ||
       this.filterBox[i]['FILTER'][j][
       'CONDITION'
       ] == null
     ) {
       isOk = false;
       this.message.error('Please check some fields are empty', '');
     } else if (
       i != 0 &&
       (this.filterBox[i]['CONDITION'] == undefined ||
         this.filterBox[i]['CONDITION'] == null ||
         this.filterBox[i]['CONDITION'] == '')
     ) {
       isOk = false;
       this.message.error('Please select operator.', '');
     }
     console.log(this.filterBox, 'filterBox1');
 
     if (isOk) {
       this.filterBox.push({
         CONDITION: '',
         FILTER: [
           {
             CONDITION: '',
             SELECTION1: '',
             SELECTION2: '',
             SELECTION3: '',
           },
         ],
       });
       console.log(this.filterBox, 'filterBox2');
     }
   }
 
 
   /*******  Create filter query***********/
   query = '';
   query2 = '';
   showquery: any
   isSpinner: boolean = false;
   createFilterQuery(): void {
     console.log(this.filterBox, 'filterdat');

     const lastFilterIndex = this.filterBox.length - 1; 1
     const lastSubFilterIndex = this.filterBox[lastFilterIndex]['FILTER'].length - 1;
 
     const selection1 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION1'];
     const selection2 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION2'];
     const selection3 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION3'];
     const selection4 = this.filterBox[lastFilterIndex]['CONDITION'];
     console.log(selection4, 'selection4');

     if (!selection1) {
       this.message.error("Please select a column",'');
     } else if (!selection2) {
       this.message.error("Please select a comparison",'');
     } else if (!selection3 || selection3.length < 1) {
       this.message.error("Please enter a valid value with at least 1 characters",'');
     }
 
     else if (!selection4 && lastFilterIndex > 0) {
       this.message.error("Please Select the Operator",'');
     }
 
     else {
 
       console.log(this.filterBox);
 
       this.isSpinner = true;
 
       for (let i = 0; i < this.filterBox.length; i++) {
         if (i != 0) {
           this.query += ') ' + this.filterBox[i]['CONDITION'] + ' (';
         } else this.query = '(';
 
         this.query2 = '';
         for (let j = 0; j < this.filterBox[i]['FILTER'].length; j++) {
           const filter = this.filterBox[i]['FILTER'][j];
           if (j == 0) {
             //this.query2 += '(';
           } else {
             if (filter['CONDITION'] == 'AND') {
               this.query2 = this.query2 + ' AND ';
             } else {
               this.query2 = this.query2 + ' OR ';
             }
           }
 
           let selection1 = filter['SELECTION1'];
           let selection2 = filter['SELECTION2'];
           let selection3 = filter['SELECTION3'];
 
           if (selection2 == 'Contains') {
             this.query2 += `${selection1} LIKE '%${selection3}%'`;
           } else if (selection2 == 'End With') {
             this.query2 += `${selection1} LIKE '%${selection3}'`;
           } else if (selection2 == 'Start With') {
             this.query2 += `${selection1} LIKE '${selection3}%'`;
           } else {
             this.query2 += `${selection1} ${selection2} '${selection3}'`;
           }
           if (j + 1 == this.filterBox[i]['FILTER'].length) {
             //this.query2 += ') ';
             this.query += this.query2;
           }
         }
 
         if (i + 1 == this.filterBox.length) {
           this.query += ')';
           console.log(this.query, 'backend query');
         }
       }
 
       this.showquery = this.query
       console.log(this.showquery, 'showquery');
 
 
       var newQuery = ' AND ' + this.query
       console.log(newQuery);
 
       this.filterQuery1 = newQuery
 
       console.log(this.filterQuery1, 'this.filterQuerythis.filterQuery');

       let sort = ''; // Assign a default value to sort
       let filterQuery = '';
       this.api.getTeritory(
         this.pageIndex,
         this.pageSize,
         this.sortKey,
         sort,
         newQuery
         // filterQuery
       ).subscribe(
         (data) => {
           if (data['code'] === 200) {
             this.totalRecords = data['count'];
             this.dataList = data['data'];
             this.isSpinner = false;
             this.filterQuery = '';
           } else {
             this.dataList = [];
             this.isSpinner = false;
           }
         },
         (err) => {
           if (err['ok'] === false) this.message.error('Server Not Found', '');
         }
       );
 
       this.QUERY_NAME = '';
 
     }
 
   }
 
 
 
   applyFilter(i, j) {
    console.log(i, j);
    const inputValue = this.filterBox[i].FILTER[j].SELECTION3;
    const lastFilterIndex = this.filterBox.length - 1;
    const lastSubFilterIndex = this.filterBox[lastFilterIndex]['FILTER'].length - 1;

    const selection1 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION1'];
    const selection2 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION2'];
    const selection3 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION3'];

    if (!selection1) {
      this.message.error("Please select a column", '');
    } else if (!selection2) {
      this.message.error("Please select a comparison", '');
    } else if (!selection3 || selection3.length < 1) {
      this.message.error("Please enter a valid value with at least 1 characters", '');
    } else  if (typeof inputValue === 'string' && !this.isValidInput(inputValue)) {
      // Show error message
      this.message.error(
        `Invalid Input: ${inputValue} is not allowed.`,''
      );
    } else 
    {

      console.log(this.query, 'query');
      console.log(this.filterBox, 'filterbox');

      // var DemoData:any = this.filterBox
      let sort: string;
      let filterQuery = '';

      try {
        sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
      } catch (error) {
        sort = '';
      }
      // Define a function to get the comparison value filter

      this.isSpinner = true;
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

      const FILDATA = this.filterBox[i]['FILTER'].map(item => {
        const filterCondition = getComparisonFilter(item.SELECTION2, item.SELECTION3, item.SELECTION1);
        return `AND (${filterCondition})`;
      }).join(' ');

      console.log(FILDATA, 'FILDATA');


      console.log(filterQuery, 'filterQueryfilterQuery');


      this.api
        .getTeritory(
          this.pageIndex,
          this.pageSize,
          this.sortKey,
          sort,
          FILDATA
        )
        .subscribe(
          (data) => {
            if (data['code'] === 200) {
              this.totalRecords = data['count'];
              this.dataList = data['data'];
              this.isSpinner = false;
              this.filterQuery = '';
            } else {
              this.dataList = [];
              this.isSpinner = false;
            }
          },
          (err) => {
            if (err['ok'] === false) this.message.error('Server Not Found', '');
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
     this.visiblesave = !this.visiblesave;
   }

   QUERY_NAME: string = '';
   name1: any
   name2: any
   INSERT_NAMES: any[] = [];
 
   Insertname() {
     if (this.QUERY_NAME.trim()) {
       this.INSERT_NAMES.push({ query: this.showquery, name: this.QUERY_NAME });
 
       console.log(this.INSERT_NAMES);
       this.visiblesave = false;
       this.QUERY_NAME = ''; // Clear input after adding
     } else {
       console.log('Name is empty');
     }
   }
 
  //  toggleLiveDemo(item: any, item1: any) {
 
  //    this.name1 = item
  //    console.log(item, 'items');
 
  //    this.name2 = item1
  //    console.log(item1, 'name');
 
 
  //    this.visible = !this.visible;
  //  }
   toggleLiveDemo(query: string, name: string): void {
    console.log(query)
    this.selectedQuery = query;
    console.log(this.selectedQuery);
     // Assign the query to display
    this.isModalVisible = true; // Show the modal
  }
   deleteItem(item: any) {
     this.INSERT_NAMES = this.INSERT_NAMES.filter(i => i !== item);
   }
 
   handleLiveDemoChange(event: any) {
     this.visible = event;
   }
   toggleLiveDemo1() {
     this.visible = false;
   }

   handleCancelTop(): void {
    this.visiblesave = false;
  }
  handleOkTop(): void {
    // this.createFilterQuery();

    const lastFilterIndex = this.filterBox.length - 1; 1
    const lastSubFilterIndex = this.filterBox[lastFilterIndex]['FILTER'].length - 1;

    const selection1 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION1'];
    const selection2 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION2'];
    const selection3 = this.filterBox[lastFilterIndex]['FILTER'][lastSubFilterIndex]['SELECTION3'];
    const selection4 = this.filterBox[lastFilterIndex]['CONDITION'];
    console.log(selection4, 'selection4');

    if (!selection1) {
      this.message.error("Please select a column", '');
    } else if (!selection2) {
      this.message.error("Please select a comparison", '');
    } else if (!selection3 || selection3.length < 1) {
      this.message.error("Please enter a valid value with at least 1 characters", '');
    }

    else if (!selection4 && lastFilterIndex > 0) {
      this.message.error("Please Select the Operator", '');
    }

    else {

      this.isSpinner = true;

      for (let i = 0; i < this.filterBox.length; i++) {
        if (i != 0) {
          this.query += ') ' + this.filterBox[i]['CONDITION'] + ' (';
        } else this.query = '(';

        this.query2 = '';
        for (let j = 0; j < this.filterBox[i]['FILTER'].length; j++) {
          const filter = this.filterBox[i]['FILTER'][j];
          if (j == 0) {
            //this.query2 += '(';
          } else {
            if (filter['CONDITION'] == 'AND') {
              this.query2 = this.query2 + ' AND ';
            } else {
              this.query2 = this.query2 + ' OR ';
            }
          }

          let selection1 = filter['SELECTION1'];
          let selection2 = filter['SELECTION2'];
          let selection3 = filter['SELECTION3'];

          if (selection2 == 'Contains') {
            this.query2 += `${selection1} LIKE '%${selection3}%'`;
          } else if (selection2 == 'End With') {
            this.query2 += `${selection1} LIKE '%${selection3}'`;
          } else if (selection2 == 'Start With') {
            this.query2 += `${selection1} LIKE '${selection3}%'`;
          } else {
            this.query2 += `${selection1} ${selection2} '${selection3}'`;
          }
          if (j + 1 == this.filterBox[i]['FILTER'].length) {
            //this.query2 += ') ';
            this.query += this.query2;
          }
        }

        if (i + 1 == this.filterBox.length) {
          this.query += ')';
        }
      }

      this.showquery = this.query;

    }

    if(this.QUERY_NAME == '' || this.QUERY_NAME.trim() == ''){
      this.message.error('Please Enter Query Name','')
    }
    else {
      this.INSERT_NAMES.push({ query: this.showquery, name: this.QUERY_NAME });
      console.log(this.INSERT_NAMES);
      this.visiblesave = false;
      this.QUERY_NAME = ''; // Clear input after adding
    } 
    this.visiblesave = false;
  }

  isModalVisible = false; // Controls modal visibility
  selectedQuery: string = ''; // Holds the query to display
  handleCancel(): void {
    this.isModalVisible = false; // Close the modal
    this.selectedQuery = ''; // Clear the selected query
  }

  restrictedKeywords = ["SELECT","INSERT","UPDATE","DELETE","DROP","TRUNCATE","ALTER","CREATE","RENAME","GRANT","REVOKE","EXECUTE","UNION","HAVING","WHERE","ORDER BY","GROUP BY","ROLLBACK","COMMIT", "--", ";", "/*", "*/"
  ];
 
 isValidInput(input: string): boolean {
   return !this.restrictedKeywords.some((keyword) =>
     input.toUpperCase().includes(keyword)
   );
 }
}
