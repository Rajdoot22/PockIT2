import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent {
  @Input() applyCondition: any ;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;
  public commonFunction = new CommonFunctionService();
  PINCODE_ID
  SKILL_ID
  TYPE

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService
  ) {}


  checkOptionsOne = [
    { label: 'Inhouse', value: 'Inhouse', checked: false },
    { label: 'Freelancer', value: 'Freelancer', checked: false },
    { label: 'Vendor Tech', value: 'Vendor Tech', checked: false }
  ];

  checkOptionsTwo = [
    { label: 'Fresher', value: 'Fresher', checked: false },
    { label: 'Junior', value: 'Junior', checked: false },
    { label: 'Mid-Level', value: 'Mid-Level', checked: false },
    { label: 'Senior', value: 'Senior', checked: false },
    { label: 'Lead', value: 'Lead', checked: false },
    { label: 'Expert', value: 'Expert', checked: false },
  ];


ngOnInit(){
  this.getPincodeData();
  this.getSkillData();
  this.getCategoryData();
  this.getSubCategoryData();
  this.getTeritory();
  this.getAllCustomer();
  this.initializeTimeRange();

}
selectedSkills: { [key: number]: boolean } = {};
  skillData: any = [];
  getSkillData() {
    this.api.getSkillData(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.skillData = data['data'];
        } else {
          this.skillData = [];
          this.message.error('Failed To Get Skill Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  pincodeData: any = [];
  getPincodeData() {
    this.api.getAllPincode(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.pincodeData = data['data'];
        } else {
          this.pincodeData = [];
          this.message.error('Failed To Get Pincode Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }



  CATEGORY_ID
  categoryData: any = [];
  categoryLoading =false;

  SUBCATEGORY_ID
  subcategoryData: any = [];
  subCategoryLoading =false;


  TERITORY_ID
  territoryData:any =[];
  territoryLoading =false;


  CUSTOMER_ID
  customerData: any = [];
  customerLoading =false;

  NAME;
  dateFormat = 'dd/MMM/yyyy';
  selectedDate: Date[] = [];




  //Sanjana
  getCategoryData() {
    this.subCategoryLoading =true;
    this.api.getCategoryData(0, 0, '', '', '').subscribe(
      (data) => {
        if (data['code'] == 200) {
          // console.log('Category',this.categoryData);
          this.categoryLoading =false;
          this.categoryData = data['data'];
        } else {
          this.categoryLoading =false;
          this.categoryData = [];
          this.message.error('Failed To Get Category Data', '');
        }
      },
      () => {
        this.categoryLoading =false;
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  getSubCategoryData() {
    this.subCategoryLoading =true;
    this.api.getSubCategoryData(0, 0, '', '', '').subscribe(
      (data) => {
        if (data['code'] == 200) {
          // console.log('SubCategory',this.subcategoryData);

          this.subcategoryData = data['data'];
          this.subCategoryLoading =false;
        } else {
          this.subCategoryLoading =false;
          this.subcategoryData = [];
          this.message.error('Failed To Get Sub Category Data', '');
        }
      },
      () => {
        this.subCategoryLoading =false;
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  getTeritory() {
    this.territoryLoading =true;
    this.api.getTeritory(0, 0, '', '', '').subscribe(
      (data) => {
        if (data['code'] == 200) {
          // console.log('SubCategory',this.subcategoryData);

          this.territoryData = data['data'];
          this.territoryLoading =false;
        } else {
          this.territoryData = [];
          this.territoryLoading =false;
          this.message.error('Failed To Get Sub Territory Data', '');
        }
      },
      () => {
        this.territoryLoading =false;
        this.message.error('Something Went Wrong', '');
      }
    );
  }
// if ((this.selectedDate != null && this.selectedDate.length == 2 )
  // ) {
  //   this.value1 = this.datePipe.transform(this.selectedDate[0], 'yyyy-MM-dd');
  //   this.value2 = this.datePipe.transform(this.selectedDate[1], 'yyyy-MM-dd');
  //   this.filterQuery +=
  //     " AND date(INVITATION_DATE) BETWEEN '" +
  //     this.value1 +
  //     "' AND '" +
  //     this.value2 +
  //     "'";
  //   this.isFilterApplied = 'primary';
  // }

  getAllCustomer() {
    this.customerLoading =true;
    this.api.getAllCustomer(0, 0, '', '', '').subscribe(
      (data) => {
        if (data['code'] == 200) {
          // console.log('Customer',this.customerData);
          this.customerLoading =false;
          this.customerData = data['data'];
        } else {
          this.customerLoading =false;
          this.customerData = [];
          this.message.error('Failed To Get Customer Data', '');
        }
      },
      () => {
        this.customerLoading =false;
        this.message.error('Something Went Wrong', '');
      }
    );
  }








  changeDate(value: any) {
    // this.value1 = this.datePipe.transform(value[0], 'yyyy-MM-dd');
    // this.value2 = this.datePipe.transform(value[1], 'yyyy-MM-dd');
  }


  minTimeRange: number[] = [];
  maxTimeRange: number[] = [];
  MIN_TIME;
  MAX_TIME;
   initializeTimeRange(): void {
    this.minTimeRange = Array.from({ length: 12 }, (_, i) => (i + 1) * 10); // [10, 20, ..., 120]
    this.maxTimeRange = [...this.minTimeRange]; // Initially the same as minTimeRange
  }

  // Handle change in minimum time
  onMinTimeChange(selectedMinTime: number): void {
    if (selectedMinTime) {
      this.maxTimeRange = this.minTimeRange.filter((time) => time > selectedMinTime); // Filter max times
      this.MAX_TIME = undefined; // Clear the previous MAX_TIME selection
    } else {
      this.maxTimeRange = [...this.minTimeRange]; // Reset maxTimeRange if MIN_TIME is cleared
      this.MAX_TIME = undefined; // Clear MAX_TIME
    }
  }

  close() {
    this.drawerClose();
  }
  applyFilter(){}
}
