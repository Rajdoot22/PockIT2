import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';   
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { pincode } from 'src/app/Pages/Models/pincode';
import { ApiServiceService } from 'src/app/Service/api-service.service';
@Component({
  selector: 'app-pincodes',
  templateUrl: './pincodes.component.html',
  styleUrls: ['./pincodes.component.css']
})
export class PincodesComponent {
  formTitle = "Manage Pincodes";
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  dataList:any = [];
  loadingRecords = true;
  sortValue: string = "desc"; 
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  selectedCountries:any=[]
  columns: string[][] = [ ["COUNTRY_NAME", "Country"], ["STATE_NAME", "State"], ["PINCODE", "Pincode"], ]
  time = new Date()
  features = [];
  visible = false;
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: pincode = new pincode();
  drawerVisible1: boolean;
  drawerTitle1: string; 
  ROLES = [];
  isSpinning = false
  filterClass: string = 'filter-invisible';
  constructor(private api: ApiServiceService, private message: NzNotificationService) { }
  columns1: { label: string; value: string }[] = [ 
    { label: 'Country', value: 'Country' },
    { label: 'State', value: 'State' }, 
    { label: 'Pincode', value: 'Pincode' },
  
  ];
  ngOnInit() {
    this.search();
  }

  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'desc';
    console.log(currentSort);
    console.log('sortOrder :' + sortOrder);
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
    }

    this.loadingRecords = true;
    var sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";

    } catch (error) {
      sort = "";
    }
    var likeQuery=''
    if (this.searchText != "") {
        likeQuery = " AND";
      this.columns.forEach(column => {
        likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
      });

      likeQuery = likeQuery.substring(0, likeQuery.length - 2)
    }

    this.api.getAllPincode(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];

    }, err => {
      console.log(err);
    });
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {
    this.drawerTitle = "Create New Pincode";
    this.drawerData = new pincode();
    this.drawerVisible = true;
  }
 

  edit(data: pincode): void {
    this.drawerTitle = "Update Pincode Details";
    this.drawerData = Object.assign({}, data);
    this.drawerVisible = true; 
  }

  

  close(): void {
    this.visible = false;
  }

  close1(accountMasterPage: NgForm) {
    this.drawerVisible1 = false;
    this.resetDrawer(accountMasterPage);
  }

  resetDrawer(accountMasterPage: NgForm) {
    accountMasterPage.form.reset();
  }

   

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
  }

  drawerClose1(): void {
    this.drawerVisible1 = false;
  }
  showMainFilter() {
    if (this.filterClass === 'filter-visible') {
      this.filterClass = 'filter-invisible';
    }
    else { this.filterClass = 'filter-visible'; }
  }
  nametext: string = ''; 
  emailtext: string = '';  
  statusFilter: string | undefined = undefined;
  showcloumnVisible: boolean = false;
  countryVisible: boolean = false;
  stateVisible: boolean = false;
  PINCODEVisible: boolean = false;

  listOfFilter: any[] = [
    { text: 'Active', value: '1' },
    { text: 'Inactive', value: '0' }
  ];
  onSortClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent sort from firing when clicking the header
  }
  showcolumn = [
    { label: 'Country Name', key: 'COUNTRY_NAME', visible: true },
    { label: 'State Name', key: 'STATE_NAME', visible: true }, 
    { label: 'Pincode', key: 'PINCODE', visible: true },
    { label: 'Status', key: 'IS_ACTIVE', visible: true }

  ];

  // Check if the column is visible
  isColumnVisible(key: any): boolean {
    const column = this.showcolumn.find(col => col.key === key);
    return column ? column.visible : true;
  }
  onStatusFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.search(true);
  }
 

  onStateChange(): void {
    this.search();
  }

  
  reset(): void {
    this.searchText = '';
    this.nametext = ''
    this.search();
  }
  reset1(): void {
    this.searchText = '';
    this.emailtext = ''
    this.search();
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
       this.api.getCity(
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
 
   isfilterapply: boolean = false;
 
   applyFilter(i, j) {
 
     console.log(i, j);
 
 
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
         .getCity(
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
 
   toggleLiveDemo(item: any, item1: any) {
 
     this.name1 = item
     console.log(item, 'items');
 
     this.name2 = item1
     console.log(item1, 'name');
 
 
     this.visible = !this.visible;
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
   onCountryChange(){}
   countryData:any=[]  
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
   pincodeData: any = [];
   getPincodeData() {
     this.api.getAllCountryMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
       (data) => {
         if (data["code"] == 200) {
           this.pincodeData = data["data"];
         } else {
           this.pincodeData = [];
           this.message.error("Failed To Get Country Data", "");
         }
       },
       () => {
         this.message.error("Something Went Wrong", "");
       }
     );
   }
   cityData: any = [];
   getCityData() {
     this.api.getAllCityMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
       (data) => {
         if (data["code"] == 200) {
           this.cityData = data["data"];
         } else {
           this.cityData = [];
           this.message.error("Failed To Get Country Data", "");
         }
       },
       () => {
         this.message.error("Something Went Wrong", "");
       }
     );
   }
 
   stateData: any = [];
   getStateData() {
     this.api.getState(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
       (data) => {
         if (data["code"] == 200) {
           this.stateData = data["data"];
         } else {
           this.stateData = [];
           this.message.error("Failed To Get State Data", "");
         }
       },
       () => {
         this.message.error("Something Went Wrong", "");
       }
     );
   }
}
