import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { customer } from 'src/app/Pages/Models/customer';
import { Address } from 'src/app/Pages/Models/Address';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  customercategories: any = []
  @Input() drawerClose: Function;
  @Input() data: customer = new customer();
  @Input() drawerVisible: boolean;
  Parentcategories: any = []
  orgId = this.cookie.get('orgId');
  loadingRecords = true;
  isSpinning = false;
  isOk = true;
  namepatt = /[a-zA-Z][a-zA-Z ]+/;
  mobpattern = /^[6-9]\d{9}$/
  onlynum = /^[0-9]*$/
  onlychar = /^[a-zA-Z ]*$/
  activeTabIndex: number = 0; // Default to the first tab
  imgUrl
  tabs = [
    {
      name: 'Personal Details',
      disabled: false,
    },
    {
      name: 'Address Details',
      disabled: true,
    },

  ];

  constructor(private api: ApiServiceService, private cookie: CookieService, private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.getCustomerCategoryData()
    this.data.SALUTATION = 'Mr'

  }

  getCustomerCategoryData() {
    this.api.getCustomerCategeroyData(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.customercategories = data["data"];
        } else {
          this.customercategories = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  omit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }

  close(accountMasterPage: NgForm) {
    this.drawerClose();
    this.resetDrawer(accountMasterPage);
  }

  resetDrawer(accountMasterPage: NgForm) {
    this.data = new customer();
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();

  }

  dataList: any = []
  // save(addNew: boolean, accountMasterPage: NgForm): void {
  //   this.isOk = true;
  //   if (this.data.NAME == undefined && this.data.EMAIL == undefined
  //     && this.data.MOBILE_NO== undefined && this.data.DOB == undefined && this.data.GENDER == undefined
  //     && this.data.CUSTOMER_CATEGORY_ID== undefined && this.data.REGISTRATION_DATE == undefined
  //     && this.data.ALTERNATE_MOBILE_NO== undefined && this.data.COMPANY_NAME == undefined ) {
  //    this.isOk = false
  //    this.message.error('Please fill all required details', '')
  //  }
  // else if(this.data.NAME == undefined || this.data.NAME==''){
  //   this.isOk=false
  //   this.message.error('Please Enter Customer Name', '')
  // }
  // else if(this.data.EMAIL == undefined || this.data.EMAIL==''){
  //   this.isOk=false
  //   this.message.error('Please Enter  E-mail ID', '')
  // }
  // else if(this.data.MOBILE_NO == undefined || this.data.MOBILE_NO==''){
  //   this.isOk=false
  //   this.message.error('Please Enter Mobile Number', '')
  // }
  // else if(this.data.GENDER == undefined || this.data.GENDER==''){
  //   this.isOk=false
  //   this.message.error('Please select Gender', '')
  // }
  // else if(this.data.DOB == undefined || this.data.DOB==''){
  //   this.isOk=false
  //   this.message.error('Please Select Date of Birth', '')
  // }
  // else if(this.data.CUSTOMER_CATEGORY_ID == undefined || this.data.CUSTOMER_CATEGORY_ID==''){
  //   this.isOk=false
  //   this.message.error('Please Select Customer Category', '')
  // }
  // else if(this.data.REGISTRATION_DATE == undefined || this.data.REGISTRATION_DATE==''){
  //   this.isOk=false
  //   this.message.error('Please Select Registration Date', '')
  // }
  // else if(this.data.COMPANY_NAME == undefined || this.data.COMPANY_NAME==''){
  //   this.isOk=false
  //   this.message.error('Please Enter Company Name', '')
  // }



  //   if (this.isOk) {
  //     this.isSpinning = true;
  //     this.orgId = this.cookie.get('orgId');

  //     if (this.data.ID) {

  //       this.api.updateCustomer(this.data).subscribe(successCode => {
  //         if (successCode['code'] == 200) {
  //           this.message.success("Category Information Updated Successfully", "");

  //           if (!addNew)
  //             this.drawerClose();

  //           this.isSpinning = false;
  //           this.resetDrawer(accountMasterPage);

  //         } else {
  //           this.message.error("Category Inforamtion Updation Failed", "");
  //           this.isSpinning = false;
  //         }
  //       });



  //     } else {

  //       this.api.createCustomer(this.data).subscribe(successCode => {
  //         if (successCode['code'] == 200) {
  //           this.isSpinning = false;
  //           this.message.success("Category Information saved  Successfully", "");

  //           if (!addNew) {
  //             this.drawerClose();
  //             this.resetDrawer(accountMasterPage);

  //           } else {
  //             this.data = new customer();
  //             this.resetDrawer(accountMasterPage);
  //           }

  //         } else {
  //           this.message.error("Cannot save Category Information", "");
  //           this.isSpinning = false;
  //         }
  //       });

  //     }
  //   }
  // }
  ID: any
  save(addNew: boolean, accountMasterPage: NgForm): void {

    if (this.data.CUSTOMER_TYPE == undefined && this.data.CUSTOMER_CATEGORY_ID == undefined && this.data.NAME == undefined
      && this.data.EMAIL == undefined && this.data.MOBILE_NO == undefined
    ) {
      this.isOk=false
      this.message.error('Please fill all required details', '')
    }
    else if (this.data.CUSTOMER_TYPE == undefined || this.data.CUSTOMER_TYPE == '') {
      this.isOk=false

      this.message.error('Please Select Customer Type', '')
    }
    else if (this.data.CUSTOMER_CATEGORY_ID == undefined || this.data.CUSTOMER_CATEGORY_ID == '') {
      this.isOk=false

      this.message.error('Please Select Customer category', '')
    }
    else if ((this.data.CUSTOMER_TYPE == 'B') && (this.data.COMPANY_NAME == undefined || this.data.COMPANY_NAME == '')) {
      this.isOk=false

      this.message.error('Please Enter Company Name', '')
    }
    else if ((this.data.CUSTOMER_TYPE == 'B') && (this.data.NAME == undefined || this.data.NAME == '')) {
      this.isOk=false

      this.message.error('Please Enter Contact Customer Name', '')
    }
    else if ((this.data.CUSTOMER_TYPE == 'I') && (this.data.NAME == undefined || this.data.NAME == '')) {
      this.isOk=false

      this.message.error('Please Enter Customer Name', '')
    }
    else if (this.data.EMAIL == undefined || this.data.EMAIL == '') {
      this.isOk=false

      this.message.error('Please Enter E-mail ID', '')
    }
    else if (this.data.MOBILE_NO == undefined || this.data.MOBILE_NO == '') {
      this.isOk=false

      this.message.error('Please Enter Mobile No.', '')
    }
    else if ((this.data.CUSTOMER_TYPE == 'B') && (this.data.PAN == undefined || this.data.PAN == '')) {
      this.isOk=false

      this.message.error('Please Enter PAN No.', '')
    }
    else if ((this.data.CUSTOMER_TYPE == 'B') && (this.data.GST_NO == undefined || this.data.GST_NO == '')) {
      this.isOk=false

      this.message.error('Please Enter GST No.', '')
    }
    if(this.data.CUSTOMER_TYPE=='B'){
      this.data.NAME=this.data.NAME 
    }
    else{
      this.data.NAME=this.data.NAME 

    }
    console.log('hi')
    if (this.isOk) {
      console.log('hi')
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api
            .updateCustomer(this.data)
            .subscribe((successCode: any) => {
              if (successCode.code == "200") {
                this.message.success("Customer Information Updated Successfully", "");
                // this.resetDrawer(accountMasterPage)
                // if (!addNew) this.drawerClose();
                this.isSpinning = false;
              } else {
                this.message.error("Cannot update Customer Information", "");
                this.isSpinning = false;
              }
            });
        } else {
          console.log(this.data)
          this.api
            .createCustomer(this.data)
            .subscribe((successCode: any) => {
              if (successCode.code == "200") {
                this.message.success("Customer Information Saved Successfully", "");
                this.resetDrawer(accountMasterPage)

                this.ID = successCode.ID
                this.api.getAllCustomer(0, 0, '', '', ' AND ID =' + successCode.ID).subscribe(data => {
                  this.loadingRecords = false;
                  this.dataList = data['data'];
                })
                this.tabs = [
                  {
                    name: 'Personal Details',
                    disabled: false,
                  },
                  {
                    name: 'Address Details',
                    disabled: false,
                  },

                ];
                this.activeTabIndex = 1;
                // if (!addNew) this.drawerClose();
                // else {
                //   this.data = new customer();
                //   this.resetDrawer(CountryDrawer);

                // }
                this.isSpinning = false;
              } else {
                this.message.error("Cannot Save Customer Information", "");
                this.isSpinning = false;
              }
            });
        }
      }
    }
    // this.ngOnInit()
  }
  alphaOnly(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
@Input()custid
  drawerTitle: string
  drawerVisibleAddress: boolean
  drawerDataAddress: any
  loadingFamilyRecords
  dataFamilyList
  addAddress() {
    this.drawerTitle = 'Add Address Details';
    this.drawerVisibleAddress = true;
    this.drawerDataAddress = new Address();
  }
  drawerData: Address = new Address();
  editAddress(data: Address) {
    
    this.drawerTitle = 'Update Address Details';
    this.drawerData = Object.assign({}, data);
    this.drawerVisibleAddress = true; 
console.log(this.drawerData)
  }
  fullAddress:any
addressdata:any=[]
  drawerAddressClose(): void {
    this.api.getAllCustomerAddress(0, 0, '', '', ' AND CUSTOMER_ID= '+this.ID).subscribe(data => { 
      this.addressdata=data['data']
      if (this.addressdata && this.addressdata.length > 0) {
        // Loop through each address and add FULL_ADDRESS key
        this.addressdata = this.addressdata.map(address => {
          this.fullAddress = [
            address.ADDRESS_LINE_1 || '', // Ensure no undefined or null
            address.ADDRESS_LINE_2 || '',
            address.CITY_NAME || '',
            address.STATE_NAME || '',
            address.COUNTRY_NAME || '',
            address.PINCODE || ''
          ]
            .filter(part => part.trim() !== '') // Remove empty parts
            .join(', '); // Combine with commas
    
          return {
            ...address,
            FULL_ADDRESS: this.fullAddress // Add the concatenated address
          };
        });
      }
    })
    this.drawerVisibleAddress = false;
    // this.searchFamily(true); 
  }

  get closeCallbackAddress() {
    return this.drawerAddressClose.bind(this);
  }

  next() {
    this.activeTabIndex = 1
  this.ID=this.custid
  this.api.getAllCustomerAddress(0, 0, '', '', ' AND CUSTOMER_ID= ' + this.ID).subscribe(data => { 
    this.addressdata = data['data']; // Get the address data
    if (this.addressdata && this.addressdata.length > 0) {
      // Loop through each address and add FULL_ADDRESS key
      this.addressdata = this.addressdata.map(address => {
        // Concatenate the full address for each address object
        const fullAddress = [
          address.ADDRESS_LINE_1 || '', // Ensure no undefined or null
          address.ADDRESS_LINE_2 || '',
          address.CITY_NAME || '',
          address.STATE_NAME || '',
          address.COUNTRY_NAME || '',
          address.PINCODE || ''
        ]
          .filter(part => part.trim() !== '') // Remove empty parts
          .join(', '); // Combine with commas
        
        // Return the address object with the FULL_ADDRESS
        return {
          ...address,
          FULL_ADDRESS: fullAddress // Add the concatenated address as FULL_ADDRESS
        };
      });
    }
});

  }
  back(){
    this.activeTabIndex=0
    this.api.getAllCustomer(0, 0, '', '', ' AND ID =' + this.ID).subscribe(data => {
      this.loadingRecords = false;
      this.data = data['data'][0];
    })
  }
}
