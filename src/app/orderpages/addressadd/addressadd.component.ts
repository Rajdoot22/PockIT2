import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { Address } from 'src/app/Pages/Models/Address';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addressadd',
  templateUrl: './addressadd.component.html',
  styleUrls: ['./addressadd.component.css']
})
export class AddressaddComponent {
  @Input() drawerVisibleAddress: boolean = false;
  @Input() drawerAddressClose: Function;
  @Input() data: Address = new Address();
  @Input() dataList
  Branch: any = []
  City1: any = []
  isSpinning: boolean = false
  constructor(private api: ApiServiceService, private cookie: CookieService, private datePipe: DatePipe, private message: NzNotificationService) {
  }
  custaddress: any = []
  ngOnInit() {
    this.getCountry()

    this.api.getAllStateMaster(0, 0, '', '', '').subscribe(
      (forms) => {
        this.state = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );

    this.api.getAllCityMaster(0, 0, '', '', '').subscribe(
      (forms) => {
        this.City1 = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
    this.api.getAllPincode(0, 0, '', '', '').subscribe(
      (forms) => {
        this.pincode = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
    this.api.getAllCustomer(0, 0, '', '', ' AND ID =' + this.ID).subscribe(data => {
      this.custaddress = data['data'];
    })
  }
  getCityyy1(event: any) {
    this.data.CITY_ID = 0;
    var filter = ' AND IS_ACTIVE = 1 AND STATE_ID = ' + event;

    this.api.getAllCityMaster(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.City1 = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  state: any = []
  country: any = []
  pincode: any = []
  getstate(event: any) {
    this.data.STATE_ID = 0;
    var filter = ' AND IS_ACTIVE = 1 AND COUNTRY_ID = ' + event;

    this.api.getAllStateMaster(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.state = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  getCountry() {

    this.api.getAllCountryMaster(0, 0, '', '', '').subscribe(
      (forms) => {
        this.country = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  getpincode(event: any) {
    this.data.PINCODE_ID = 0;
    var filter = ' AND IS_ACTIVE = 1 AND CITY_ID = ' + event;

    this.api.getAllPincode(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.pincode = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }

  close(accountMasterPage: NgForm) {
    this.drawerAddressClose();
    this.resetDrawer(accountMasterPage);
  }
  resetDrawer(accountMasterPage: NgForm) {
    this.data = new Address();
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();

  }

  @Input() ID
  isOk: boolean = true
  save(accountMasterPage: NgForm): void {

    if (this.data.TYPE == undefined && this.data.ADDRESS_LINE_1 == undefined && this.data.COUNTRY_ID == undefined
      && this.data.STATE_ID == undefined && this.data.CITY_ID == undefined && this.data.PINCODE_ID == undefined
    ) {
      this.isOk = false
      this.message.error('Please fill all required details', '')
    }
    else if (this.data.TYPE == undefined || this.data.TYPE == '') {
      this.isOk = false

      this.message.error('Please Select Address Type', '')
    }
    else if (this.data.ADDRESS_LINE_1 == undefined || this.data.ADDRESS_LINE_1 == '') {
      this.isOk = false

      this.message.error('Please Enter Address Line 1', '')
    }
    else if (this.data.COUNTRY_ID == undefined || this.data.COUNTRY_ID == '') {
      this.isOk = false

      this.message.error('Please Select Country', '')
    }
    else if (this.data.STATE_ID == undefined || this.data.STATE_ID == '') {
      this.isOk = false

      this.message.error('Please Select State', '')
    }
    else if (this.data.CITY_ID == undefined || this.data.CITY_ID == '') {
      this.isOk = false

      this.message.error('Please Select City', '')
    }
    else if (this.data.PINCODE_ID == undefined || this.data.PINCODE_ID == '') {
      this.isOk = false

      this.message.error('Please Select Pincode', '')
    }
    else if (this.data.IS_DEFAULT == true)
      this.api.getAllCustomerAddress(0, 0, '', '', ' AND IS_DEFAULT= 1 AND CUSTOMER_ID= ' + this.ID).subscribe(data => {
        if (data['data'].length != 0) {

          this.message.error('you have already set default address', '')
          this.data.IS_DEFAULT = false
        }
      })
    this.data.CUSTOMER_ID = this.ID

    this.isSpinning = true
    setTimeout(() => {
      if (this.isOk) {

        this.isSpinning = true;
        if (this.custaddress && this.custaddress.length > 0) {
          const { ID, ...otherFields } = this.custaddress[0]; // Exclude ID using destructuring
          this.data = {
            ...this.data,  // Keep existing data fields
            ...otherFields // Merge only the other fields
          };
        }


        this.api
          .createCustomerAddress(this.data)
          .subscribe((successCode: any) => {
            if (successCode.code == "200") {
              this.message.success("Customer Address Information Saved Successfully", "");
              this.close(accountMasterPage);
              this.isSpinning = false;
            } else {
              this.message.error("Cannot save Customer Address Information", "");
              this.isSpinning = false;
            }
          });


      }
    }, 2000);
 
  }
}
