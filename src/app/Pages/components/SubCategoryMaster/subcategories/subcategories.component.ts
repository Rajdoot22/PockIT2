import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';   
import { NzTableQueryParams } from 'ng-zorro-antd/table'; 
import { category } from 'src/app/Pages/Models/category';
import { subcategory } from 'src/app/Pages/Models/subcategory';
import { ApiServiceService } from 'src/app/Service/api-service.service';
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent {
  formTitle = "Manage Subcategories";
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
  columns: string[][] = [["PARENT_CATEGORY_NAME", "Parent Category"], ["CATEGORY_NAME", "Category Name"] ]
  time = new Date()
  features = [];
  visible = false;
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: subcategory = new subcategory();
  drawerVisible1: boolean;
  drawerTitle1: string; 
  ROLES = [];
  isSpinning = false
  parentcategoryvisible:boolean=false
  categoryvisible:boolean=false
  listOfFilter: any[] = [
    { text: 'Active', value: '1' },
    { text: 'Inactive', value: '0' }
  ];
  columns1: { label: string; value: string }[] = [
    { label: 'Parent Category Name', value: 'PARENT_CATEGORY_NAME' },

    { label: 'Category Name', value: 'CATEGORY_NAME' },
   
  ]
  constructor(private api: ApiServiceService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();
  }
  showcolumn = [
    { label: 'Prarent category Name ', key: 'PARENT_CATEGORY_NAME' , visible: true },  

    { label: 'Category ', key: 'CATEGORY_NAME' , visible: true },  
    { label: 'Status ', key: 'IS_ACTIVE' , visible: true },  

  ];
  parentData:any=[]
  categoryName=''
  selectedCountries:any=[]
  prentcategoryname=''
  onCountryChange(){}
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
  statusFilter: string | undefined = undefined;
  showcloumnVisible: boolean = false;
  onStatusFilterChange(selectedStatus: string) {
   this.statusFilter = selectedStatus;
   this.search(true);
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

    this.api.getAllsubCategory(this.pageIndex, this.pageSize, this.sortKey, sort, likeQuery).subscribe(data => {
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
    this.drawerTitle = "Create New Subcategory";
    this.drawerData = new subcategory();
    this.drawerVisible = true;
  }

 

  edit(data: subcategory): void {
    this.drawerTitle = "Update Subcategory";
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
  keyup() {
    if (this.searchText.length >= 3) {
      this.search();
    } else if (this.searchText.length === 0) {
      this.dataList = [];
      this.search();
    }
  }
  filterClass: string = 'filter-invisible';

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
         this.api.getCurrency(
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
           .getCurrency(
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
     isColumnVisible(key: any): boolean {
      const column = this.showcolumn.find(col => col.key === key);
      return column ? column.visible : true;
    }
    reset(){}
}
